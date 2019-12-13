import React, { Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Spin } from 'antd';
import SubLayout from '../../components/SubLayout';
import styles from './index.less';

class Admin extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	best: 1000,
	  	supClass: '',
	  	supItem: false,
	  	subClass: '',
	  	subItem: false,
	  };
	}

	componentDidMount() {
		if(window.getUserInfo(this.props.app).address == "") {
			this.props.dispatch(routerRedux.push('/indexPage'))
		}
		this.props.dispatch({
			type: 'admin/item'
		})
	}

	getLv = (userByContract) => {
	    const { best } = this.state;
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

	toggleSupItem = () => {
		this.setState({
			supItem: !this.state.supItem,
			supClass: this.state.supItem ? '' : styles.on
		})
	}

	toggleSubItem = (user_next_level) => {
		if(user_next_level.length <= 0) return;
		this.setState({
			subItem: !this.state.subItem,
			subClass: this.state.subItem ? '' : styles.on
		})
	}

	render() {
		const { userByContract } = window.getUserInfo(this.props.app);
		const { admin: { user_next_level, user_self }, loading } = this.props;
		const { supClass, supItem, subClass, subItem } = this.state;
		return (
			<Spin spinning={ loading } size="large">
				<SubLayout title="行政室">
					<div className={styles.level}>LV.{ this.getLv(userByContract) }</div>
					<ul className={styles.list}>
						<li className={styles.li52f8fe}>
							<span className={styles.l}>福利</span>
							<span className={styles.r}>0</span>
						</li>
						<li className={styles.lif7910c}>
							<span className={styles.l}>工资</span>
							<span className={styles.r}>0</span>
						</li>
						<li className={`${styles.li} ${styles.liff5dc4} ${supClass}`} style={{cursor: 'pointer'}} onClick={ this.toggleSupItem }>
							<span className={styles.l}>上级长官</span>
							<span className={styles.r}>1<b className={styles.arrow}></b></span>
						</li>
						{
							supItem && 
							(
								<li className={styles.itemList}>
									<p><span>{ user_self.cover_invitation_code }</span></p>
								</li>
							)
						}
						<li className={`${styles.li} ${styles.li5ce37c} ${subClass}`} style={user_next_level.length > 0 ? {cursor: 'pointer'} : {}} onClick={ () => this.toggleSubItem(user_next_level) }>
							<span className={styles.l}>下级</span>
							<span className={styles.r}>{ user_next_level.length }{user_next_level.length > 0 && <b className={styles.arrow}></b>}</span>
						</li>
						{
							subItem && 
							(
								<li className={styles.itemList}>
									{
										user_next_level.map((v, i) => (
											<p key={i}><span>{ v.invitation_code }</span></p>
										))
									}
								</li>
							)
						}
					</ul>
				</SubLayout>
			</Spin>
		);
	}
}

export default connect(({ app, admin, loading }) => ({ app, admin, loading: loading.models.admin }))(Admin);