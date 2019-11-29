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
		const { loading } = this.props;
		return (
			<Spin spinning={ loading }>
				<SubLayout title="统计室"> 
					<div className={styles.item}>
						<div className={styles.l}>总注入（ETH）</div>
						<div className={styles.r}>{ userByContract['充值总额'] }</div>
					</div>
				</SubLayout>
			</Spin>
		);
	}
}

export default connect(({ app, statistics, loading }) => ({ app, statistics, loading: loading.models.statistics }))(Statistics);