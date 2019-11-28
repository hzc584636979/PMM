import React from 'react';
import { connect } from 'dva';
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
	}

	render() {
		const { userByContract } = window.getUserInfo(this.props.app);
		return (
			<SubLayout title="统计室"> 
				<div className={styles.item}>
					<div className={styles.l}>总注入（ETH）</div>
					<div className={styles.r}>{ userByContract['充值总额'] }</div>
				</div>
			</SubLayout>
		);
	}
}

export default connect(({ app, statistics }) => ({ app, statistics }))(Statistics);