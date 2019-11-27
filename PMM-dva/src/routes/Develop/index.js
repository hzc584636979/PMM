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

	render() {
		const { index={userByContract: {}, banlance: 0} } = this.props;
		const { betValue, best } = this.state;
		return (
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
		);
	}
}

export default connect(({ index, develop }) => ({ index, develop }))(Develop);