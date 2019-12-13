import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import { routerRedux } from 'dva/router';
import SubLayout from '../../components/SubLayout';
import { createWeb3 } from '../../utils/myContract';
import styles from './index.less';

class Statistics extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	componentWillMount() {
		this.web3 = createWeb3('https://kovan.infura.io/v3/58f018284cce4c9599a447f698df4496');
	}

	componentDidMount() {
		if(window.getUserInfo(this.props.app).address == "") {
			this.props.dispatch(routerRedux.push('/indexPage'))
		}
		this.props.dispatch({
			type: 'statistics/getList'
		})
	}

	render() {
		const { userByContract } = window.getUserInfo(this.props.app);
		const { statistics, loading } = this.props;
		return (
			<Spin spinning={ loading } size="large">
				<SubLayout title="统计室"> 
					<div className={styles.item}>
						<div className={styles.l}>总注入（ETH）</div>
						<div className={styles.r}>{ statistics.total_recharge ? this.web3.utils.fromWei(statistics.total_static_profit, 'ether') : 0 }</div>
					</div>
					<div className={styles.item}>
						<div className={styles.l}>注入收益（ETH）</div>
						<div className={styles.r}>{ statistics.total_static_profit ? this.web3.utils.fromWei(statistics.total_static_profit, 'ether') : 0 }</div>
					</div>
					<div className={styles.item}>
						<div className={styles.l}>团队收益</div>
						<div className={styles.r}>{ statistics.total_team_profit ? this.web3.utils.fromWei(statistics.total_team_profit, 'ether') : 0 }</div>
					</div>
					<div className={styles.item}>
						<div className={styles.l}>团队人数</div>
						<div className={styles.r}></div>
					</div>
					<div className={styles.item}>
						<div className={styles.l}>直属人数</div>
						<div className={styles.r}></div>
					</div>
					<div className={styles.item}>
						<div className={styles.l}>军职福利<span className={styles.time}>【01:07:05】</span></div>
						<div className={styles.r}></div>
					</div>
				</SubLayout>
			</Spin>
		);
	}
}

export default connect(({ app, statistics, loading }) => ({ app, statistics, loading: loading.models.statistics }))(Statistics);