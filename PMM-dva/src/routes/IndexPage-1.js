import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import { Spin, Button, Row, Col, Icon, Tooltip, Input, message, notification, Layout, Descriptions, Drawer } from 'antd';
import { getUrlOptions } from '../utils/utils';
import copy from 'copy-to-clipboard';
import myContract from '../utils/myContract';

const { Content } = Layout;
class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      address: '',
      copyMessage: '复制地址',
      best: 1000,
      banlance: 0,
      betState: false,
      betLoading: true,
      betLoadingText: '同步用户信息中...',
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
          type: 'index/saveUserInfo',
          payload: {
            address,
            banlance,
            userByContract,
          }
        })
        this.setState({
          address,
          banlance,
          userByContract,
          betLoading: false,
          betLoadingText: '',
        });



        //test
        const { beInvitedCode='first' } = getUrlOptions();
        this.props.dispatch({
          type: 'index/inviteCode',
          payload: {
            beInvitedCode: beInvitedCode,
            userAddress: address
          }
        })
        .then(inviteCode => {
          console.log(inviteCode)
        })
      })
    })
  }

  handleClipBoard = () => {
    if(copy(this.state.address)){
      this.setState({
        copyMessage: "复制成功"
      })
    }else{
      this.setState({
        copyMessage: "复制失败，请重试"
      })
    }
  }

  handleCopyEnter = () => {
    this.setState({
      copyMessage: "复制地址"
    })
  }

  handleKeyup = (e) => {
    const { banlance, best } = this.state;
    const value = Number(e.target.value);
    if(value && value % 1 == 0 && value > 1 && value < 25 && banlance >= value/best){
      this.setState({
        betValue: Number(e.target.value/best),
        betState: true,
      })
    }else{
      message.error('请输入1~25之间的整数');
      this.setState({
        betState: false,
      })
    }
  }

  /*
  1.地址栏获取被邀请码
  2.请求后端获取自己的邀请码
  */
  getIC = () => {
    const { betState, betValue, banlance, address } = this.state;
    if(!betState){
      message.error('请输入1~25之间的整数');
      return;
    }
    if(betValue > banlance){
      message.error('投注金额超过账户余额');
      return;
    }
    const { beInvitedCode='first' } = getUrlOptions();
    this.setState({
        betLoading: true,
        betLoadingText: '投注中...',
    })
    this.props.dispatch({
      type: 'index/inviteCode',
      payload: {
        beInvitedCode: beInvitedCode,
        userAddress: address
      }
    })
    .then(inviteCode => {
      return this.myContract.bet(address, betValue, inviteCode, beInvitedCode);
    })
    .then(res => {
      this.setState({
        betLoadingText: '正在查询投注状态...',
      })
      const transactionHash = res.result;
      //0xb3b78836cce7c4cd00521a82bef47d7157a3522b7b8ed910df4d95d27a5027f4
      return this.myContract.getTransactionReceipt(transactionHash);
    })
    .then(receipt => {
      this.getUserInfo();
      receipt.status ? 
        notification.success({
          message: '交易成功',
          description: '',
        }) 
        : 
        notification.error({
          message: '交易失败',
          description: (
            <dl>
              <dt>投注失败的原因：</dt>
              <dd>1：被邀请码不存在。（测试网络的第一个邀请码是first）</dd>
              <dd>2：自己的邀请码不能为空。</dd>
              <dd>3：投注额必须是1～25。（测试网络缩减了1000倍）</dd>
              <dd>4：该账号还在游戏中未结束。（测试网络中以1小时当作了一天）</dd>
              <dd>5：新账号所使用的邀请码已经存在了，需要更换为新的邀请码</dd>
              <dd>6：投注的可用余额不足</dd>
            </dl>
          ),
        })
    }).catch(err => {
      this.setState({
        betLoading: false,
      })
      console.log(err)
    })
  }

  handleAgainBet = () => {
    const { betState, betValue, userByContract, address, best } = this.state;
    if(!betState){
      message.error('请输入1~25之间的整数');
      return;
    }
    if(betValue > userByContract["可用余额"]){
      message.error('再次投注金额超过可用余额');
      return;
    }
    this.setState({
        betLoading: true,
        betLoadingText: '投注中...',
    })
    this.myContract.againBet(address, betValue*best)
    .then(res => {
      this.setState({
        betLoadingText: '正在查询投注状态...',
      })
      const transactionHash = res.result;
      //0xb3b78836cce7c4cd00521a82bef47d7157a3522b7b8ed910df4d95d27a5027f4
      return this.myContract.getTransactionReceipt(transactionHash);
    })
    .then(receipt => {
      this.getUserInfo();
      receipt.status ? 
        notification.success({
          message: '交易成功',
          description: '',
        }) 
        : 
        notification.error({
          message: '交易失败',
          description: '',
        })
    }).catch(err => {
      this.setState({
        betLoading: false,
      })
      console.log(err)
    })
  }

  getDrawTutorBless = () => {
    this.setState({
        betLoading: true,
        betLoadingText: '领取中...',
    })
    this.myContract.drawTutorBless(this.state.address)
    .then(res => {
      this.setState({
        betLoadingText: '正在查询领取状态...',
      })
      const transactionHash = res.result;
      //0xb3b78836cce7c4cd00521a82bef47d7157a3522b7b8ed910df4d95d27a5027f4
      return this.myContract.getTransactionReceipt(transactionHash);
    })
    .then(receipt => {
      this.getUserInfo();
      receipt.status ? 
        notification.success({
          message: '领取成功',
          description: '',
        }) 
        : 
        notification.error({
          message: '领取失败',
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

  userByContractRender = () => {
    const { userByContract, best } = this.state;
    let str = [];
    let lockCoin = userByContract["冻结余额"]*best;
    let level = 0;
    if(lockCoin >= 1 && lockCoin <= 5){
      level = 1;
    }else if(lockCoin >= 6 && lockCoin <= 10){
      level = 2;
    }else if(lockCoin >= 11 && lockCoin <= 15){
      level = 3;
    }else if(lockCoin >= 16 && lockCoin <= 10){
      level = 'MAX';
    }
    str.push(
      <Descriptions.Item key="用户等级" label="用户等级">
        L{ level }
      </Descriptions.Item>
    );
    Object.keys(userByContract).map((k) => {
      if(k == '今日导师祝福奖励' || k == '总导师祝福收益' || k == '总导师收益') return;
      if(k == '状态'){
        str.push(
          <Descriptions.Item key={k} label={ k }>
            { userByContract[k] == 1 ? '游戏中' : '游戏结束' }
          </Descriptions.Item>
        );
      }else if(k == '今日导师祝福奖励'){
        str.push(
          <Descriptions.Item key={k} label={ k }>
            { userByContract[k] }
            { userByContract[k] > 0 && <Button type="primary" onClick={ this.getDrawTutorBless }>领取</Button> }
            {/*<Button type="primary" onClick={ this.getDrawTutorBless }>领取</Button>*/}
          </Descriptions.Item>
        );
      }else if(k == '可用余额'){
        str.push(
          <Descriptions.Item key={k} label={ k }>
            { userByContract[k] }
            { userByContract[k] > 0 && userByContract["状态"] != 1 && <Button type="primary" onClick={ this.getDrawBalance }>提取</Button> }
          </Descriptions.Item>
        );
      }else{
        str.push(
          <Descriptions.Item key={k} label={ k }>
            { userByContract[k] }
          </Descriptions.Item>
        );
      }
    })
    return str;
  }

  render() {
    const smallAddress = this.state.address.slice(0, 6) + '...' + this.state.address.slice(this.state.address.length - 4, this.state.address.length);
    return (
      <Spin spinning={ this.state.betLoading } tip={ this.state.betLoadingText }>
        <Content>
          <Descriptions title="用户钱包信息">
              <Descriptions.Item key={0} label="地址">
                <Tooltip placement="bottom" title={ this.state.copyMessage }>
                  <div onClick={ this.handleClipBoard } onMouseEnter={ this.handleCopyEnter } style={{cursor: 'pointer'}}>
                    <span>{ smallAddress }</span>
                    <Icon type="copy" />
                  </div>
                </Tooltip>
              </Descriptions.Item>
              <Descriptions.Item key={1} label="余额">
                { this.state.banlance }ETH
              </Descriptions.Item>
          </Descriptions>

          <Descriptions title="用户合同信息">
            { this.userByContractRender() }
          </Descriptions>

          <div className={styles.betList}>

          </div>

          <Row className={styles.betInput} type="flex" justify="center">
            <Col span={ 20 }>
              <Input defaultValue={ this.state.betValue } onKeyUp={ this.handleKeyup } placeholder="输入1~25之间的ETH" />
            </Col>
            <Col span={ 4 } style={{ textAlign: 'center' }}>
              {/*<Button type="primary" onClick={ this.state.userByContract['可用余额'] > this.state.betValue ? this.handleAgainBet : this.getIC } disabled={ !this.state.betState || this.state.userByContract['状态'] != 2}>投注</Button>*/}
              <Button type="primary" onClick={ this.handleAgainBet }>投注</Button>
            </Col>
          </Row>
        </Content>
      </Spin> 
    )
  }
}

export default connect(({ index }) => ({ index }))(IndexPage);
