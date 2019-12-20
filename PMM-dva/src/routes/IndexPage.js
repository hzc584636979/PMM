import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import styles from './IndexPage.less';
import { Spin, Drawer, Button, Icon, message, notification, Modal } from 'antd';
import { getUrlOptions } from '../utils/utils';
import myContract from '../utils/myContract';
import copy from 'copy-to-clipboard';
import { formatDuring } from '../utils/utils';
import { Scrollbars } from 'react-custom-scrollbars';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      betLoading: false,
      betLoadingText: window.langConfig[window.Lang]['同步用户信息中...'],
      address: '',
      best: 1000, //测试数据为1000倍，正式改为1
      banlance: 0,
      userByContractArr: ['可用余额','冻结余额','充值总额','提现总额','邀请码','被邀请码','今日导师祝福奖励','状态','总静态收益','总团队收益','总导师祝福收益','总导师收益'],
      userByContract: {},
    };
  }

  componentDidMount() {
    // 实例化web3
    this.myContract = myContract('https://kovan.infura.io');

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
    this.timer && clearInterval(this.timer);
  }

  getUserInfo = () => {
    this.setState({
      betLoadingText: window.langConfig[window.Lang]['同步用户信息中...'],
      betLoading: true,
    })
    let beInvitedCode = getUrlOptions(this.props.location.search).beInvitedCode || 'first';
    console.log(beInvitedCode)
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
        console.log(beInvitedCode)
        if(userByContract['今日导师祝福奖励'] > 0) {
          this.clearDrawTutorBless()
        }
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
        betLoadingText: window.langConfig[window.Lang]['提取中...'],
        spinZindex: 1001,
    })
    this.myContract.drawBalance(this.state.address)
    .then(transactionHash => {
      this.setState({
        betLoadingText: window.langConfig[window.Lang]['正在查询提取状态...'],
      })
      return this.myContract.getTransactionReceipt(transactionHash);
    })
    .then(receipt => {
      this.getUserInfo();
      receipt.status ? 
        notification.success({
          message: window.langConfig[window.Lang]['提取成功'],
          description: '',
        }) 
        : 
        notification.error({
          message: window.langConfig[window.Lang]['提取失败'],
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

  getDrawTutorBless = () => {
    this.setState({
        betLoading: true,
        betLoadingText: window.langConfig[window.Lang]['领取中...'],
        spinZindex: 1001,
    })
    this.myContract.drawTutorBless(this.state.address)
    .then(transactionHash => {
      this.setState({
        betLoadingText: window.langConfig[window.Lang]['正在查询领取状态...'],
      })
      return this.myContract.getTransactionReceipt(transactionHash);
    })
    .then(receipt => {
      this.getUserInfo();
      if(receipt.status){
        clearInterval(this.timer);
        notification.success({
          message: window.langConfig[window.Lang]['领取成功'],
          description: '',
        }) 
      }else{
        notification.error({
          message: window.langConfig[window.Lang]['领取失败'],
          description: '',
        })
      } 
    })
    .catch(err => {
      this.setState({
        betLoading: false,
      })
      console.log(err)
    })
  }

  clearDrawTutorBless = () => {
    const nowStart = new Date(new Date().toLocaleDateString()).getTime();//当天0点的时间戳
    const nowStart10 = nowStart + 10 * 60 * 60 * 1000;//当天10点的时间戳
    const netStart = nowStart + 24 * 60 * 60 * 1000;//下一天0点的时间戳
    const netStart10 = netStart + 10 * 60 * 60 * 1000;//下一天10点的时间戳
    this.timer = setInterval(() => {
      const initTime = new Date().getTime();//当前时间
      let startTime = initTime >= nowStart10 ? netStart10 : nowStart10;
      if(startTime - initTime <= 0){
        clearInterval(this.timer);
        this.getUserInfo();
      }else {
        this.setState({
          drawTutorBlessTime: formatDuring(startTime - initTime, [':',':',''])
        })
      }
    }, 1000);
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
            { window.langConfig[window.Lang]['钱包'] }
            {userByContract['可用余额'] > 0 && <div className={styles.btn} onClick={ this.getDrawBalance }>{ window.langConfig[window.Lang]['提取'] }</div>}
          </div>
        ),
        modalDesc: (
          <div className={styles.walletModal}>
            <div className={styles.ethBox}>
              <ul>
                <li className={styles.icon}></li>
                <li className={styles.num}>{ banlance }</li>
                <li className={styles.txt}>{ window.langConfig[window.Lang]['当前拥有的星痕能量'] }（ETH）</li>
              </ul>
            </div>
            <div className={styles.contractInfo}>
              <div className={styles.item} style={{borderLeft: '0.12rem solid #52f8fe'}}>
                { window.langConfig[window.Lang]['冻结中'] }：{ userByContract['冻结余额'] }
              </div>
              <div className={styles.item} style={{borderLeft: '0.12rem solid #9635c8'}}>
                { window.langConfig[window.Lang]['可提现'] }：{ userByContract['可用余额'] }
              </div>
              <div className={styles.item} style={{borderLeft: '0.12rem solid #5ce37c'}}>
                { window.langConfig[window.Lang]['已提现'] }：{ userByContract['提现总额'] }
              </div>
              <div className={styles.item} style={{borderLeft: '0.12rem solid #c8aa35'}}>
                { window.langConfig[window.Lang]['总充值'] }：{ userByContract['充值总额'] }
              </div>
            </div>
            <div className={styles.desc}>
              <p className={styles.lineClamp}>{ window.langConfig[window.Lang]['星痕水晶是一种晶体物质，可以存储和释放能量，由于战舰上资源有限，个人所拥有的的星痕水晶成为了研究新型引擎所需能源的重要来源，单个星痕水晶可以存储的能量大小至今仍未探明。'] }</p>
              <p style={{color: '#f9dd6e'}}>{ window.langConfig[window.Lang]['【注:1星痕能量=1ETH】'] }</p>
            </div>
          </div>
        ),
      };
    }else if(modalType == 'invitation') {
      other = {
        modalTitle: window.langConfig[window.Lang]['邀请'],
        modalDesc: (
          <div className={styles.invitationModal}>
            <div className={styles.topBox}>
              <ul>
                <li className={styles.icon}></li>
                { 
                  userByContract['邀请码'] ?
                  <Fragment>
                    <li className={styles.num}>{ userByContract['邀请码'] }</li>
                    <li className={styles.txt}>{ window.langConfig[window.Lang]['邀请链接'] }</li>
                  </Fragment>
                  :
                  <li className={styles.none}>{ window.langConfig[window.Lang]['请先注入能量获取邀请码'] }</li>
                }
              </ul>
            </div>
            <div className={styles.desc}>
              <p><span style={{color: '#f9dd6e'}}>{ window.langConfig[window.Lang]['士官长'] }</span>{ window.langConfig[window.Lang]['以现在星痕水晶所提供的能量，远远无法满足您所倾向的引擎的研发需求，不如试试发展更多的支持者吧！'] }</p>
              <p style={{color: '#f9dd6e'}}>{ window.langConfig[window.Lang]['【注:邀请码包含在链接里】'] }</p>
            </div>
            {
              userByContract['邀请码'] ?
              <div className={styles.copy} onClick={ this.handleClipBoard }><span className={styles.gradientText}>{ window.langConfig[window.Lang]['复制并分享'] }</span></div>
              :
              <div className={`${styles.copy} ${styles.gray}`}><span className={styles.gradientText}>{ window.langConfig[window.Lang]['复制并分享'] }</span></div>
            }
          </div>
        ),
      };
    }else if(modalType == 'message') {
      other = {
        modalTitle: window.langConfig[window.Lang]['消息详情'],
        modalDesc: (
          <div className={styles.messageModal}>
            <div className={styles.t}>{ window.langConfig[window.Lang]['来自副舰长'] }</div>
            <div className={styles.c}>
              <Scrollbars>
                { window.langConfig[window.Lang]['首页消息详情正文'] }
              </Scrollbars>
            </div>
          </div>
        ),
      };
    }else if(modalType == 'noWallet') {
      other = {
        modalTitle: window.langConfig[window.Lang]['错误'],
        modalDesc: (
          <div className={styles.messageModal}>
            <div className={styles.t}>{ window.langConfig[window.Lang]['来自副舰长'] }</div>
            <div className={styles.c}>
              { window.langConfig[window.Lang]['没有钱包环境无法运行此项目'] }
            </div>
          </div>
        ),
      };
    }else if(modalType == 'rule') {
      other = {
        modalTitle: window.langConfig[window.Lang]['平台规则'],
        modalDesc: (
          <div className={styles.messageModal}>
            <div className={styles.t}>{ window.langConfig[window.Lang]['来自副舰长'] }</div>
            <div className={styles.c}>
              <Scrollbars>
                { window.langConfig[window.Lang]['首页平台规则正文'] }
              </Scrollbars>
            </div>
          </div>
        ),
      };
    }
    else if(modalType == 'about') {
      other = {
        modalTitle: window.langConfig[window.Lang]['关于我们'],
        modalDesc: (
          <div className={styles.messageModal}>
            <div className={styles.t}>{ window.langConfig[window.Lang]['来自副舰长'] }</div>
            <div className={styles.c}>
              <Scrollbars>
                { window.langConfig[window.Lang]['首页关于我们正文'] }
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
    if(copy(`https://www.boq.hk/#/?beInvitedCode=${this.state.userByContract["邀请码"]}`)){
      notification.success({
        message: window.langConfig[window.Lang]['复制成功'],
        description: '',
      }) 
    }else{
      notification.success({
        message: window.langConfig[window.Lang]['复制失败，请重试'],
        description: '',
      }) 
    }
  }

  toLink = (url) => {
    this.props.dispatch(routerRedux.push(url))
  }

  render() {
    const { userByContract, modalBoxBg, address, drawTutorBlessTime } = this.state;
    return (
      <Spin wrapperClassName={`spinZindex ${this.state.betLoading ? `on` : ``}`} size="large" spinning={ this.state.betLoading } tip={ <div style={{fontSize: '0.38rem'}}>{ this.state.betLoadingText }</div> }>
        <div className={styles.wrap}>
          <div className={styles.top}>
            <div className={styles.lang} onClick={ this.handleLanguageChange }>{ window.Lang == 'cn' ? '中' : 'En' }</div>
            <div className={styles.txt}>{ window.langConfig[window.Lang]['无限深空号'] }</div>
            <Icon className={styles.move} type="unordered-list" onClick={this.showMoveDrawer}/>
          </div>
          <div className={styles.info}>
            <div className={styles.level}>LV.{ this.getLv() }</div>
            <div className={styles.box}>
              <dl className={styles.txt}>
                <dt>{ userByContract['充值总额'] }ETH</dt>
                <dd>{ window.langConfig[window.Lang]['投入'] }</dd>
              </dl>
              <div className={styles.icon} onClick={ () => { this.toLink('/statistics') }}></div>
              <dl className={styles.txt}>
                <dt>{ userByContract['总静态收益'] }ETH</dt>
                <dd>{ window.langConfig[window.Lang]['收益'] }</dd>
              </dl>
            </div>
          </div>
          <div className={styles.initMessage}>
            <div className={styles.man}></div>
            <div className={styles.bg}></div>
            <dl>
              <dt>{ window.langConfig[window.Lang]['副舰长'] }：</dt>
              <dd>
                { userByContract['今日导师祝福奖励'] > 0 ? 
                  <p>{ window.langConfig[window.Lang]['可领取福利'] }：<span style={{color: '#ece05c'}}>{ userByContract['今日导师祝福奖励'] }</span><br/>{ window.langConfig[window.Lang]['清空倒计时'] }：{ drawTutorBlessTime }</p>
                  :
                  <Fragment>
                    <p style={{color: '#ece05c'}}>{ address.slice(address.length-4,address.length) }{ window.langConfig[window.Lang]['列兵'] }</p>
                    <p className={styles.desc}>{ window.langConfig[window.Lang]['你从冬眠中苏醒了啊？了解下战舰的变化吧...'] }</p>
                  </Fragment>
                }
              </dd>
            </dl>
            { userByContract['今日导师祝福奖励'] > 0 ? 
              <a className={styles.move} onClick={ this.getDrawTutorBless }>{ window.langConfig[window.Lang]['领取'] }</a>
              :
              <a className={styles.move} onClick={ () => this.showModal('message') }>{ window.langConfig[window.Lang]['详情'] }</a>
            } 
          </div>
          <div className={styles.bottom}>
            <div className={styles.timeBox}>
              <div className={styles.t}>{ window.langConfig[window.Lang]['重新注入星痕'] }</div>
              <div className={styles.b}>{ userByContract['状态'] != 1 ? window.langConfig[window.Lang]['可注入'] : window.langConfig[window.Lang]['已注入'] }</div>
            </div>
            <div className={styles.buttons}>
              <div className={styles.recordIcon}>
                <p className={styles.icon} onClick={ () => { this.toLink('/record') }}></p>
                <p className={styles.txt}>{ window.langConfig[window.Lang]['记录'] }</p>
              </div>
              <ul>
                <li className={styles.developIcon} onClick={ () => { this.toLink('/develop') }}><span className={styles.gradientText}>{ window.langConfig[window.Lang]['研发室'] }</span></li>
                <li className={styles.etherIcon} onClick={ () => this.showModal('ether') }></li>
              </ul>
              <div className={styles.invitationIcon}>
                <p className={styles.icon} onClick={ () => this.showModal('invitation') }></p>
                <p className={styles.txt}>{ window.langConfig[window.Lang]['邀请'] }</p>
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
                { window.langConfig[window.Lang]['平台规则'] }
              </Button>
            </li>
            <li>
              <Button type="link" onClick={ () => this.showModal('about') }>
                <Icon type="alert" />
                { window.langConfig[window.Lang]['关于我们'] }
              </Button>
            </li>
          </ul>
        </Drawer>
      </Spin> 
    )
  }
}

export default connect(({ app, index, loading }) => ({ app, index, loading: loading.models.index }))(IndexPage);
