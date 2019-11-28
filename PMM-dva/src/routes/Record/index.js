import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import SubLayout from '../../components/SubLayout';
import { routerRedux } from 'dva/router';
import styles from './index.less';

class Record extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	tabKey: 'in',
	  };
	}

	componentDidMount() {
		if(window.getUserInfo(this.props.app).address == "") {
			this.props.dispatch(routerRedux.push('/indexPage'))
		}
        this.props.dispatch({
			type: 'record/getMy'
		})
    }

	handleTab = (tabKey) => {
		this.setState({
			tabKey,
		})
		this.props.dispatch({
			type: 'record/getMy'
		})
	}

	render() {
		const { tabKey } = this.state;
		return (
			<Spin spinning={ false }>
				<SubLayout title="财务室">
					<div className={styles.tabBox}>
						<div className={ tabKey == 'in' ? styles.tabOn : styles.tab } style={{textAlign: 'left'}} onClick={ () => this.handleTab('in') }>我的注入</div>
						<div className={ tabKey == 'out' ? styles.tabOn : styles.tab } style={{textAlign: 'right'}} onClick={ () => this.handleTab('out') }>我的收益</div>
					</div>
					{
						tabKey == 'in' ?
							<div className={styles.inTable}>
								<div className={styles.item}>
									<div className={styles.l}>
										<div className={styles.tag1}>进行中</div>
										<div className={styles.img}></div>
									</div>
									<div className={styles.r}>
										<p>您当前已经向<span className={styles.f9dd6e}>曲率驱动引擎</span>项目注入了</p>
										<p><span className={styles.bigNum}>2.0375</span>星痕</p>
										<p>
											项目研发周期为<span className={styles.f9dd6e}>15天</span><br/>
											剩余<span className={styles.f9dd6e}>12天12:25:47</span>
										</p>
										<p>
											每日收益为<span className={styles.f9dd6e}>2%</span><br/>
											当前收益为<span className={styles.f9dd6e}>0.003</span>星痕
										</p>
									</div>
								</div>
								<div className={styles.item}>
									<div className={styles.l}>
										<div className={styles.tag2}>2019.11.15</div>
										<div className={styles.img}></div>
									</div>
									<div className={styles.r}>
										<p>您向<span className={styles.f9dd6e}>曲率驱动引擎</span>项目注入了</p>
										<p><span className={styles.bigNum}>2.0375</span>星痕</p>
										<p>
											项目研发周期为<span className={styles.f9dd6e}>15天</span><br/>
											于<span className={styles.f9dd6e}>11月23日11:38结束</span>
										</p>
										<p>
											每日收益为<span className={styles.f9dd6e}>2%</span><br/>
											总收益为<span className={styles.f9dd6e}>0.003</span>星痕
										</p>
									</div>
								</div>
							</div>
						:
							<div className={styles.outTable}>
								<div className={styles.item}>
									<div className={styles.tag}>研发收益</div>
									<div className={styles.c}>
										<div className={styles.icon1}></div>
										<div className={styles.num}>总收益<span className={styles.bigNum}>28.5073</span>ETH</div>
										<ul className={styles.list}>
											<li className={styles.li52f8fe}>
												<span className={styles.l}>进行中的项目收益</span>
												<span className={styles.r}>1.5037<b className={styles.arrowUp}></b></span>
											</li>
											<li className={styles.lif7910c}>
												<span className={styles.l}>上个项目收益</span>
												<span className={styles.r}>1.5037<b className={styles.arrowUp}></b></span>
											</li>
											<li className={styles.liff5dc4}>
												<span className={styles.l}>上周项目收益</span>
												<span className={styles.r}>1.5037<b className={styles.arrowUp}></b></span>
											</li>
											<li className={styles.li5ce37c}>
												<span className={styles.l}>上月项目收益</span>
												<span className={styles.r}>1.5037<b className={styles.arrowUp}></b></span>
											</li>
										</ul>
									</div>
								</div>
								<div className={styles.item}>
									<div className={styles.tag}>奖励收益</div>
									<div className={styles.c}>
										<div className={styles.icon2}></div>
										<div className={styles.num}>总收益<span className={styles.bigNum}>28.5073</span>ETH</div>
										<ul className={styles.list}>
											<li className={styles.li52f8fe}>
												<span className={styles.l}>军职福利</span>
												<span className={styles.r}>1.5037<b className={styles.arrowUp}></b></span>
											</li>
											<li className={styles.lif7910c}>
												<span className={styles.l}>军职工资</span>
												<span className={styles.r}>1.5037<b className={styles.arrowUp}></b></span>
											</li>
											<li className={styles.liff5dc4}>
												<span className={styles.l}>团队收益</span>
												<span className={styles.r}>1.5037<b className={styles.arrowUp}></b></span>
											</li>
											<li className={styles.li5ce37c}>
												<span className={styles.l}>团队奖励</span>
												<span className={styles.r}>1.5037<b className={styles.arrowUp}></b></span>
											</li>
										</ul>
									</div>
								</div>
							</div>
					}
				</SubLayout>
			</Spin>
		)
	}
};

export default connect(({ app, record, loading }) => ({
	app,
	record,
	loading: loading.models.record
}))(Record);