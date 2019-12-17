import React, { Fragment } from 'react';
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

    if(!window.ethereum){
      this.showModal('noWallet');
      this.setState({
        betLoading: true,
      })
    }else{
      this.getUserInfo();
    }
  }

  componentWillUnmount() {

  }

  getUserInfo = () => {
    this.setState({
      betLoadingText: '同步用户信息中...',
      betLoading: true,
    })
    let beInvitedCode = '';
    if(!window.getUserInfo(this.props.app).beInvitedCode){
      beInvitedCode = getUrlOptions().beInvitedCode || 'first';
    }else{
      beInvitedCode = window.getUserInfo(this.props.app).beInvitedCode;
    }

    //获取用户信息
    this.myContract.getUserInfo().then(({ address, banlance }) => {
      if(!address) return;
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
        console.log('格式化合约信息', userByContract)
        this.props.dispatch({
          type: 'app/saveUserInfo',
          payload: {
            address,
            banlance,
            userByContract,
            beInvitedCode,
          }
        });
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
        spinZindex: 1001,
    })
    this.myContract.drawBalance(this.state.address)
    .then(transactionHash => {
      this.setState({
        betLoadingText: '正在查询提取状态...',
      })
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

  showModal = (modalType) => {
    let modalBoxBg = '';

    if(modalType == 'ether') {
      modalBoxBg = styles.walletModalBg;
    }else if(modalType == 'invitation') {
      modalBoxBg = styles.walletModalBg;
    }else if(modalType == 'message' || modalType == 'rule' || modalType == 'about') {
      modalBoxBg = styles.messageModalBg;
    }else if(modalType == 'noWallet') {
      modalBoxBg = styles.noWalletModalBg;
    }

    this.setState({
      modalBoxBg,
      modalType,
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
    const { banlance, userByContract, modalType } = this.state;
    let other = {};
    if(modalType == 'ether') {
      other = {
        modalTitle: (
          <div>
            钱包
            {userByContract['可用余额'] > 0 && <div className={styles.btn} onClick={ this.getDrawBalance }>提取</div>}
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
    }else if(modalType == 'invitation') {
      other = {
        modalTitle: "邀请",
        modalDesc: (
          <div className={styles.invitationModal}>
            <div className={styles.topBox}>
              <ul>
                <li className={styles.icon}></li>
                { 
                  userByContract['邀请码'] ?
                  <Fragment>
                    <li className={styles.num}>{ userByContract['邀请码'] }</li>
                    <li className={styles.txt}>邀请链接</li>
                  </Fragment>
                  :
                  <li className={styles.none}>请先注入能量获取邀请码</li>
                }
              </ul>
            </div>
            <div className={styles.desc}>
              <p><span style={{color: '#f9dd6e'}}>士官长</span>以现在星痕水晶所提供的能量，远远
              无法满足您所倾向的引擎的研发需求，不如
              试试发展更多的支持者吧！</p>
              <p style={{color: '#f9dd6e'}}>【注:邀请码包含在链接里】</p>
            </div>
            {
              userByContract['邀请码'] ?
              <div className={styles.copy} onClick={ this.handleClipBoard }></div>
              :
              <div className={`${styles.copy} ${styles.gray}`}></div>
            }
          </div>
        ),
      };
    }else if(modalType == 'message') {
      other = {
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
    }else if(modalType == 'noWallet') {
      other = {
        modalTitle: "错误",
        modalDesc: (
          <div className={styles.messageModal}>
            <div className={styles.t}>来自副舰长</div>
            <div className={styles.c}>
              没有钱包环境无法运行此项目
            </div>
          </div>
        ),
      };
    }else if(modalType == 'rule') {
      other = {
        modalTitle: "规则",
        modalDesc: (
          <div className={styles.messageModal}>
            <div className={styles.t}>来自副舰长</div>
            <div className={styles.c}>
              <Scrollbars>
                <p>
                  静态收益：<br/>
                  L1投资1-5个ETH，得到日收益0.6%<br/>
                  L2投资6-10个ETH，得到日收益0.8%<br/>
                  L3投资11-15个ETH，得到日收益1.2%<br/>
                </p>
                <p>
                  动态奖励：<br/>
                  L1拿一级收益的50%，<br/>
                  L2拿一级收益的50%，二级收益的50%三级收益的30%<br/>
                  L3拿一级收益的50%，二级收益的50%三级收益的30%，四级～十级收益的10%<br/>
                  （24小时自动结算，下级满24小时结算收益同时，领导人得到领导奖励）<br/>
                </p>
                <p>
                  导师祝福奖励：<br/>
                  每日10：00可点击领取，直推可以拿到上级领导投资收益的50%<br/>
                </p>
                <p>
                  初级导师：<br/>
                  直推达到5人，团队业绩100ETH，拿新增业绩1%<br/>
                  （这1%领导人拿0.4%，剩下的0.6%平均奖励给伞下有效会员）<br/>
                </p>
                <p>
                  中级导师：<br/>
                  直推达到15人，团队业绩200ETH，拿新增业绩2%<br/>
                  （这2%领导人拿0.8%，剩下的1.2%平均奖励给伞下有效会员）<br/>
                </p>
                <p>
                  高级导师：<br/>
                  直推达到30人，团队业绩500ETH，拿新增业绩3%<br/>
                  （这3%领导人拿1.2%，剩下的1.8%平均奖励给伞下有效会员）<br/>
                </p>
                <p>
                  烧伤：例如A投了1个ETH，B投了5个ETH，那么A只能拿到B1一个ETH的收益<br/>
                  平台每月收取新增业绩3%作为手续费<br/>
                  5天一轮，到时间暂停收益，强制出局，必须重新复投，否则不在计算奖励<br/>
                </p>
              </Scrollbars>
            </div>
          </div>
        ),
      };
    }
    else if(modalType == 'about') {
      other = {
        modalTitle: "关于我们",
        modalDesc: (
          <div className={styles.messageModal}>
            <div className={styles.t}>来自副舰长</div>
            <div className={styles.c}>
              <Scrollbars>
                <p className={styles.indent}>很高兴！我们有共同的爱好和理想，一群集合了智慧和技术的深网极客，我们放弃掉不公平的规则约束。基于智能合约的条件触发性，执行命令，使得所有的捣乱者没有机会作弊，它公平，公开，透明，安全，不可篡改的特性更适合于Ethereum的生态环境。为了助力Ethereum社区共识，EthereumPark诞生了。</p>
                <p className={styles.indent}>现在共识经济处于野蛮混乱的状态，非共识自治是规则不公平的主要原因。使得参与者无法保护自己的权益，大量的参与者因失落，无奈退出了这个行业。因此受到PMM（Perpetual motion machine ）的启发，EthereumPark布局的第一个生态PMC应用由此而生，PMC宗旨就是打造一个生生不息的共识经济dapp。</p>
                <p className={styles.indent}>PMC5天一个周期，反向收益的设计体现了公平共赢，使Ethereum生态做的更具凝聚力！我们要做一件伟大的事情！让智能合约真正为混乱的共识经济提供持续良性发展的动力。</p>
              </Scrollbars>
            </div>
          </div>
        ),
      };
    }

    return (
      <div className={styles.modalWrap}>
        <div className={styles.inner}>
          <div className={styles.title}>
            { other.modalTitle }
          </div>
          <div className={styles.cont}>
            { other.modalDesc }
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
    if(copy(`http://47.75.161.29/#/?beInvitedCode=${this.state.userByContract["邀请码"]}`)){
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
    const { userByContract, modalBoxBg, address } = this.state;
    return (
      <Spin wrapperClassName={`spinZindex ${this.state.betLoading ? `on` : ``}`} size="large" spinning={ this.state.betLoading } tip={ <div style={{fontSize: '0.38rem'}}>{ this.state.betLoadingText }</div> }>
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
              <dd>
                <p style={{color: '#ece05c'}}>{ address.slice(address.length-4,address.length) }列兵</p>
                <p className={styles.desc}>你从冬眠中苏醒了啊？了解下战舰的变化吧你从冬眠中苏醒了啊？了解下战舰的变化吧你从冬眠中苏醒了啊？了解下战舰的变化吧你从冬眠中苏醒了啊？了解下战舰的变化吧你从冬眠中苏醒了啊？了解下战舰的变化吧...</p>
              </dd>
            </dl>
            <a className={styles.move} onClick={ () => this.showModal('message') }>详情</a>
          </div>
          <div className={styles.bottom}>
            <div className={styles.timeBox}>
              <div className={styles.t}>重新注入星痕</div>
              <div className={styles.b}>{ userByContract['状态'] != 1 ? '可注入' : '已注入' }</div>
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

export default connect(({ app, index, loading }) => ({ app, index, loading: loading.models.index }))(IndexPage);
