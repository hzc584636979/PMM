import React from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import styles from './IndexPage.less';
import { Spin, Drawer, Button, Icon, message, notification, Modal } from 'antd';
import { getUrlOptions } from '../utils/utils';
import myContract from '../utils/myContract';
import copy from 'copy-to-clipboard';
import { langConfig } from '../utils/utils';
import { Scrollbars } from 'react-custom-scrollbars';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      betLoading: false,
      betLoadingText: '同步用户信息中...',
      address: '',
      best: 1000, //测试数据为1000倍，正式改为1
      banlance: 0,
      userByContractArr: ['可用余额','冻结余额','充值总额','提现总额','邀请码','被邀请码','今日导师祝福奖励','状态','总静态收益','总团队收益','总导师祝福收益','总导师收益'],
      userByContract: {},
    };
  }

  componentDidMount() {
    // 实例化web3
    this.myContract = myContract('https://kovan.infura.io/v3/58f018284cce4c9599a447f698df4496');
    this.getUserInfo();
  }

  componentWillUnmount() {

  }

  getUserInfo = () => {
    this.setState({
      betLoadingText: '同步用户信息中...',
      betLoading: true,
    })

    let beInvitedCode='first';
    if(!window.getUserInfo(this.props.app).beInvitedCode){
      beInvitedCode = getUrlOptions().beInvitedCode;
    }else{
      beInvitedCode = window.getUserInfo(this.props.app).beInvitedCode;
    }

    //获取用户信息
    this.myContract.getUserInfo().then(({ address, banlance }) => {
      //获取用户在合约上的信息
      this.myContract.getContractUserInfo(address)
      .then(res => {
        let userByContract = {};
        this.state.userByContractArr.map((v, i) => {
          if(i == 4 || i == 5 || i == 7){
            userByContract[v] = res[i];  
          }else{
            userByContract[v] = this.myContract.fromWei(res[i]);
          }
        })
        this.props.dispatch({
          type: 'app/saveUserInfo',
          payload: {
            address,
            banlance,
            userByContract,
            beInvitedCode,
          }
        })
        this.setState({
          address,
          banlance,
          userByContract,
          betLoading: false,
          betLoadingText: '',
        });
      })
    })
  }

  handleLanguageChange = (v) => {
    this.props.dispatch({
      type: 'app/lang',
      payload: {
        lang: this.props.app.lang == 'cn' ? 'en' : 'cn',
      }
    })
  }

  getDrawBalance = () => {
    this.setState({
        betLoading: true,
        betLoadingText: '提取中...',
    })
    this.myContract.drawBalance(this.state.address)
    .then(res => {
      this.setState({
        betLoadingText: '正在查询提取状态...',
      })
      const transactionHash = res.result;
      //0xb3b78836cce7c4cd00521a82bef47d7157a3522b7b8ed910df4d95d27a5027f4
      return this.myContract.getTransactionReceipt(transactionHash);
    })
    .then(receipt => {
      this.getUserInfo();
      receipt.status ? 
        notification.success({
          message: '提取成功',
          description: '',
        }) 
        : 
        notification.error({
          message: '提取失败',
          description: '',
        })
    })
    .catch(err => {
      this.setState({
        betLoading: false,
      })
      console.log(err)
    })
  }

  showMoveDrawer = () => {
    this.setState({
      moveVisible: true,
    });
  };

  closeMoveDrawer = () => {
    this.setState({
      moveVisible: false,
    });
  };

  showModal = (type) => {
    const { banlance, userByContract } = this.state;
    let other = {};
    if(type == 'ether') {
      other = {
        modalBoxBg: styles.walletModalBg,
        modalTitle: (
          <div>
            钱包
            <div className={styles.btn} onClick={ this.getDrawBalance }>提取</div>
          </div>
        ),
        modalDesc: (
          <div className={styles.walletModal}>
            <div className={styles.ethBox}>
              <ul>
                <li className={styles.icon}></li>
                <li className={styles.num}>{ banlance }</li>
                <li className={styles.txt}>当前拥有的星痕能量（ETH）</li>
              </ul>
            </div>
            <div className={styles.contractInfo}>
              <div className={styles.item} style={{borderLeft: '0.12rem solid #52f8fe'}}>
                冻结中：{ userByContract['冻结余额'] }
              </div>
              <div className={styles.item} style={{borderLeft: '0.12rem solid #9635c8'}}>
                可提现：{ userByContract['可用余额'] }
              </div>
              <div className={styles.item} style={{borderLeft: '0.12rem solid #5ce37c'}}>
                已提现：{ userByContract['提现总额'] }
              </div>
              <div className={styles.item} style={{borderLeft: '0.12rem solid #c8aa35'}}>
                总充值：{ userByContract['充值总额'] }
              </div>
            </div>
            <div className={styles.desc}>
              <p>星痕水晶是一种晶体物质，可以存储和释放能量，由于战舰上资源有限，个人所拥有的的星痕水晶成为了研究新型引擎所需能源的重要来源，单个星痕水晶可以存储的能量大小至今仍未探明。</p>
              <p style={{color: '#f9dd6e'}}>【注:1星痕能量=1ETH】</p>
            </div>
          </div>
        ),
      };
    }else if(type == 'invitation') {
      other = {
        modalBoxBg: styles.walletModalBg,
        modalTitle: "邀请",
        modalDesc: (
          <div className={styles.invitationModal}>
            <div className={styles.topBox}>
              <ul>
                <li className={styles.icon}></li>
                <li className={styles.num}>{ userByContract['邀请码'] }</li>
                <li className={styles.txt}>邀请链接</li>
              </ul>
            </div>
            <div className={styles.desc}>
              <p><span style={{color: '#f9dd6e'}}>士官长</span>以现在星痕水晶所提供的能量，远远
              无法满足您所倾向的引擎的研发需求，不如
              试试发展更多的支持者吧！</p>
              <p style={{color: '#f9dd6e'}}>【注:邀请码包含在链接里】</p>
            </div>
            <div className={styles.copy} onClick={ this.handleClipBoard }></div>
          </div>
        ),
      };
    }else if(type == 'message') {
      other = {
        modalBoxBg: styles.messageModalBg,
        modalTitle: "消息详情",
        modalDesc: (
          <div className={styles.messageModal}>
            <div className={styles.t}>来自副舰长</div>
            <div className={styles.c}>
              <Scrollbars>
                <p>balabalabala....</p>
              </Scrollbars>
            </div>
          </div>
        ),
      };
    }

    this.setState({
      ...other,
      modalVisible: true,
      moveVisible: false,
    });
  };

  hideModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  getModalRender = () => {
    const { modalTitle, modalDesc } = this.state;
    return (
      <div className={styles.modalWrap}>
        <div className={styles.inner}>
          <div className={styles.title}>
            { modalTitle }
          </div>
          <div className={styles.cont}>
            { modalDesc }
          </div>
        </div>
        <div className={styles.close} onClick={ this.hideModal }></div>
      </div>
    );
  }

  getLv = () => {
    const { userByContract, best } = this.state;
    let lockCoin = userByContract["冻结余额"]*best;
    let level = 0;
    if(lockCoin >= 1 && lockCoin <= 5){
      level = 1;
    }else if(lockCoin >= 6 && lockCoin <= 10){
      level = 2;
    }else if(lockCoin >= 11 && lockCoin <= 15){
      level = 3;
    }else if(lockCoin >= 16){
      level = 'MAX';
    }
    return level;
  }

  handleClipBoard = () => {
    if(copy(`http://xx.xx?beInvitedCode=${this.state.userByContract["邀请码"]}`)){
      notification.success({
        message: '复制成功',
        description: '',
      }) 
    }else{
      notification.success({
        message: '复制失败，请重试',
        description: '',
      }) 
    }
  }

  toLink = (url) => {
    this.props.dispatch(routerRedux.push(url))
  }

  render() {
    const Lang = this.props.app.lang;
    const { userByContract, modalBoxBg } = this.state;
    return (
      <Spin size="large" spinning={ this.state.betLoading } tip={ <div style={{fontSize: '0.38rem'}}>{ this.state.betLoadingText }</div> }>
        <div className={styles.wrap}>
          <div className={styles.top}>
            <div className={styles.lang} onClick={ this.handleLanguageChange }>{ Lang == 'cn' ? '中' : 'En' }</div>
            <div className={styles.txt}>无限深空号</div>
            <Icon className={styles.move} type="unordered-list" onClick={this.showMoveDrawer}/>
          </div>
          <div className={styles.info}>
            <div className={styles.level}>LV.{ this.getLv() }</div>
            <div className={styles.box}>
              <dl className={styles.txt}>
                <dt>{ userByContract['充值总额'] }ETH</dt>
                <dd>投入</dd>
              </dl>
              <div className={styles.icon} onClick={ () => { this.toLink('/statistics') }}></div>
              <dl className={styles.txt}>
                <dt>{ userByContract['总静态收益'] }ETH</dt>
                <dd>收益</dd>
              </dl>
            </div>
          </div>
          <div className={styles.initMessage}>
            <div className={styles.man}></div>
            <div className={styles.bg}></div>
            <dl>
              <dt>副舰长：</dt>
              <dd><p>A365列兵</p>你从冬眠中苏醒了啊？了解下战舰的变化吧...
              </dd>
            </dl>
            <a className={styles.move} href="javascript:;" onClick={ () => this.showModal('message') }>详情</a>
          </div>
          <div className={styles.bottom}>
            <div className={styles.timeBox}>
              <div className={styles.t}>重新注入星痕</div>
              <div className={styles.b}>{ userByContract['状态'] == 2 ? '游戏结束' : '游戏中' }</div>
            </div>
            <div className={styles.buttons}>
              <div className={styles.recordIcon}>
                <p className={styles.icon} onClick={ () => { this.toLink('/record') }}></p>
                <p className={styles.txt}>记录</p>
              </div>
              <ul>
                <li className={styles.developIcon} onClick={ () => { this.toLink('/develop') }}></li>
                <li className={styles.etherIcon} onClick={ () => this.showModal('ether') }></li>
              </ul>
              <div className={styles.invitationIcon}>
                <p className={styles.icon} onClick={ () => this.showModal('invitation') }></p>
                <p className={styles.txt}>邀请</p>
              </div>
            </div>
          </div>
        </div>
        <Modal
          visible={this.state.modalVisible}
          footer={null}
          closable={false}
          wrapClassName={`${styles.modalBox} ${modalBoxBg}`}
          onCancel={this.hideModal}
        >
         { this.getModalRender() } 
        </Modal>
        <Drawer
          placement="right"
          closable={false}
          onClose={this.closeMoveDrawer}
          visible={this.state.moveVisible}
        >
          <ul className={ styles.drawerList }>
            <li>
              <Button type="link" onClick={ () => this.showModal('rule') }>
                <Icon type="file-done" />
                {langConfig[Lang].rule}
              </Button>
            </li>
            <li>
              <Button type="link" onClick={ () => this.showModal('about') }>
                <Icon type="alert" />
                {langConfig[Lang].about}
              </Button>
            </li>
          </ul>
        </Drawer>
      </Spin> 
    )
  }
}

export default connect(({ app, index }) => ({ app, index }))(IndexPage);
