import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
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
    //获取用户信息
    this.myContract.getUserInfo().then(({ address, banlance }) => {
      //获取用户在合约上的信息
      this.myContract.getContractUserInfo(address).then(res => {
        let userByContract = {};
        this.state.userByContractArr.map((v, i) => {
          if(i == 4 || i == 5 || i == 7){
            userByContract[v] = res[i];  
          }else{
            userByContract[v] = this.myContract.fromWei(res[i]);
          }
        })
        this.props.dispatch({
          type: 'index/address',
          payload: {
            address
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

  componentWillUnmount() {

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
    const value = Number(e.target.value);
    if(value && value % 1 == 0 && value > 1 && value < 25){
      this.setState({
        betValue: Number(e.target.value/this.state.best),
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
    if(!this.state.betState){
      message.error('请输入1~25之间的整数');
      return;
    }
    const { beInvitedCode='first' } = getUrlOptions();
    const _this = this;
    this.setState({
        betLoading: true,
        betLoadingText: '投注中...',
    })
    this.props.dispatch({
      type: 'index/inviteCode',
      payload: {
        beInvitedCode: beInvitedCode,
        userAddress: this.state.address
      }
    }).then(inviteCode => {
      return this.myContract.bet(this.state.address, this.state.betValue, inviteCode, beInvitedCode);
    }).then(res => {
      this.setState({
        betLoadingText: '正在查询状态...',
      })
      const transactionHash = res.result;
      //0xbf7474f3d84b49124ecb2ce4f6fcafc5160f75d4d7ee9501a393eded5f0bf1a3
      return this.myContract.getTransactionReceipt(transactionHash)
    }).then(receipt => {
      this.setState({
        betLoading: false,
      })
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
            {
              Object.keys(this.state.userByContract).map((k) => (
                <Descriptions.Item key={k} label={ k }>{ k == '状态' ?(this.state.userByContract[k] == 1 ? '游戏中' : '游戏结束') : this.state.userByContract[k] }</Descriptions.Item>
              ))
            }
          </Descriptions>

          <div className={styles.betList}>

          </div>

          <Row className={styles.betInput} type="flex" justify="center">
            <Col span={ 20 }>
              <Input defaultValue={ this.state.betValue } onKeyUp={ this.handleKeyup } placeholder="输入1~25之间的ETH" />
            </Col>
            <Col span={ 4 } style={{ textAlign: 'center' }}>
              {/*<Button type="primary" onClick={ this.getIC } disabled={ !this.state.betState || this.state.userByContract['状态'] == 1 }>投注</Button>*/}
              <Button type="primary" onClick={ this.getIC }>投注</Button>
            </Col>
          </Row>
        </Content>
      </Spin> 
    )
  }
}

export default connect(({ index }) => ({ index }))(IndexPage);
