import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import { routerRedux } from 'dva/router';
import SubLayout from '../../components/SubLayout';
import styles from './index.less';

class Statistics extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
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
			<Spin spinning={ loading }>
				<SubLayout title="统计室"> 
					<div className={styles.item}>
						<div className={styles.l}>总注入（ETH）</div>
						<div className={styles.r}></div>
					</div>
					<div className={styles.item}>
						<div className={styles.l}>注入收益（ETH）</div>
						<div className={styles.r}></div>
					</div>
					<div className={styles.item}>
						<div className={styles.l}>团队收益</div>
						<div className={styles.r}></div>
					</div>
					<div className={styles.item}>
						<div className={styles.l}>团队奖励</div>
						<div className={styles.r}></div>
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