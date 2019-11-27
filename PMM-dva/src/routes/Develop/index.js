import React from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Spin, Drawer, Button, Icon, message, notification, Modal, Input } from 'antd';
import copy from 'copy-to-clipboard';
import styles from './index.less';

class Develop extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	best: 1000,
	  };
	}

	componentDidMount() {
		/*if(!this.props.index) {
			this.props.dispatch(routerRedux.push('/indexPage'))
		}*/
	}

	getLv = () => {
	    /*const { userByContract, best } = this.state;
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
	    return level;*/
	}

	handleClipBoard = () => {
	    /*if(copy(`http://xx.xx?beInvitedCode=${this.state.userByContract["邀请码"]}`)){
	      notification.success({
	        message: '复制成功',
	        description: '',
	      }) 
	    }else{
	      notification.success({
	        message: '复制失败，请重试',
	        description: '',
	      }) 
	    }*/
	}

	toLink = (url) => {
	    this.props.dispatch(routerRedux.push(url))
	}

	min = () => {
		this.setState({
	        betValue: 2,
	        betState: true,
	    })
	}

	max = () => {
		const { best } = this.state;
		const { index={banlance: 0} } = this.props;
		let max = 24;
	    if(index.banlance*best < 24){
	      max = parseInt(index.banlance*best);
	    }
		this.setState({
	        betValue: max,
	        betState: true,
	    })
	}

	handleKeyup = (e) => {
	    const { best } = this.state;
	    const { index={banlance: 0} } = this.props;
	    const value = Number(e.target.value);
	    if(value && value % 1 == 0 && value > 1 && value < 25 && index.banlance*best >= value){
	      this.setState({
	        betValue: Number(e.target.value),
	        betState: true,
	      })
	    }else{
	      message.error('请输入1~25之间的整数');
	      this.setState({
	        betState: false,
	      })
	    }
	}

	showModal = (type) => {
		const { index={banlance: 0, userByContract: {}} } = this.props;
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
	                <li className={styles.num}>{ index.banlance }</li>
	                <li className={styles.txt}>当前拥有的星痕能量（ETH）</li>
	              </ul>
	            </div>
	            <div className={styles.contractInfo}>
	              <div className={styles.item} style={{borderLeft: '0.12rem solid #52f8fe'}}>
	                冻结中：{ index.userByContract['冻结余额'] }
	              </div>
	              <div className={styles.item} style={{borderLeft: '0.12rem solid #9635c8'}}>
	                可提现：{ index.userByContract['可用余额'] }
	              </div>
	              <div className={styles.item} style={{borderLeft: '0.12rem solid #5ce37c'}}>
	                已提现：{ index.userByContract['提现总额'] }
	              </div>
	              <div className={styles.item} style={{borderLeft: '0.12rem solid #c8aa35'}}>
	                总充值：{ index.userByContract['充值总额'] }
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
	                <li className={styles.num}>{ index.userByContract['邀请码'] }</li>
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

	render() {
		const { index={userByContract: {}, banlance: 0} } = this.props;
		const { betValue, best, modalBoxBg } = this.state;
		return (
			<div>
				<div className={styles.wrap}>
					<div className={styles.top}>
						<Link to="/indexPage"><div className={styles.back}></div></Link>
						<div className={styles.txt}>研发室</div>
						<div className={styles.FAQ}>FAQ</div>
					</div>
					<div className={styles.level}>LV.1</div>
					<div className={styles.selectInfo}>
						<dl>
							<dt>6-15</dt>
							<dd>ETH</dd>
						</dl>
						<dl>
							<dt>2%</dt>
							<dd>日收益</dd>
						</dl>
						<dl>
							<dt>15</dt>
							<dd>天</dd>
						</dl>
					</div>
					<div className={styles.inputBox}>
						<div className={styles.min} onClick={ this.min }>MIN</div>
						<Input className={styles.input} value={ betValue } onKeyUp={ this.handleKeyup } placeholder="1~25" />
						<div className={styles.max} onClick={ this.max }>MAX</div>
					</div>
					<div className={styles.bottom}>
			            <div className={styles.buttons}>
			              <div className={styles.recordIcon}>
			                <p className={styles.icon} onClick={ () => { this.toLink('/record') }}></p>
			                <p className={styles.txt}>军衔</p>
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
	        </div>
		);
	}
}

export default connect(({ index, develop }) => ({ index, develop }))(Develop);