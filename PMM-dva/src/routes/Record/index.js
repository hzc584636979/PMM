import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import SubLayout from '../../components/SubLayout';
import { routerRedux } from 'dva/router';
import { lessDate, changeTime } from '../../utils/utils';
import { selectDesc } from '../../utils/contractConfig';
import { createWeb3 } from '../../utils/myContract';
import BigNumber from 'bignumber.js'
import styles from './index.less';

class Record extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	tabKey: 'in',
	  	best: 1000,
	  	page: 0,
	  	pageSize: 20,
	  };
	}

	componentWillMount() {
		this.web3 = createWeb3('https://kovan.infura.io/v3/58f018284cce4c9599a447f698df4496');
	}

	componentDidMount() {
		if(window.getUserInfo(this.props.app).address == "") {
			this.props.dispatch(routerRedux.push('/indexPage'))
		}
		window.addEventListener('scroll', this.getMore);
        this.getData(0, true);
    }

    componentWillUnmount() {
    	window.removeEventListener('scroll', this.getMore);
    }

    getMore = e => {
    	const clientHeight = document.documentElement.clientHeight;//可见区域高度
    	const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;//滚动条距离顶部高度
    	const scrollHeight = document.body.scrollHeight;//可滚动高度
    	if(scrollHeight - (scrollTop+clientHeight) < 200 && !this.timeout && !this.state.pageLock){
    		this.timeout = setTimeout(() => {
    			console.log('加载数据');
    			this.getData(this.state.page+1);
    		},300);
    	}
    }

    getData = (page=0, init) => {
    	if(this.state.tabKey != 'in') return;
    	this.props.dispatch({
			type: 'record/getMy',
			payload: {
				pageSize: this.state.pageSize,
				page,
				init,
			}
		}).then(data => {
			this.timeout = null;
			if(data.length >= this.state.pageSize){
				this.setState({
					page,
				})
			}else {
				this.setState({
					pageLock: true,
				})
			}
		})
    }

	handleTab = (tabKey) => {
		this.setState({
			tabKey,
		})
	}

	getSelectDesc = ether => {
		const { best } = this.state;
		let desc = {};

		Object.keys(selectDesc).map(k => {
			if(selectDesc[k].min/best <= ether) {
				desc = {
					...selectDesc[k],
				}
			}
		})

		return desc;
	}

	renderItem = (data) => {
		const { order_status, order_time, order_amount, _id } = data;
		const ether = this.web3.utils.fromWei(order_amount, 'ether');
		const desc = this.getSelectDesc(ether);
		let profit = new BigNumber(Number(ether));
		profit = profit.times(Number(desc.profit.replace('%','')) / 100).toNumber();
		return (
			<div className={styles.item} key={_id}>
				<div className={styles.l}>
					{ 
						order_status == 2 ? 
						<div className={styles.tag2}>{ changeTime(order_time, 'yyyy.MM.dd') }</div>
						: 
						<div className={styles.tag1}>进行中</div>
					}
					<div className={styles.img}></div>
				</div>
				{
					order_status == 2 ?
					<div className={styles.r}>
						<p>您向<span className={styles.f9dd6e}>曲率驱动引擎</span>项目注入了</p>
						<p><span className={styles.bigNum}>{ ether }</span>星痕</p>
						<p>
							项目研发周期为<span className={styles.f9dd6e}>{ desc.day }天</span><br/>
							于<span className={styles.f9dd6e}>{ changeTime(parseInt(order_time)*1000 + parseInt(desc.day)*24*60*60*1000, 'MM月dd日hh:mm') }结束</span>
						</p>
						<p>
							每日收益为<span className={styles.f9dd6e}>{ desc.profit }</span><br/>
							总收益为<span className={styles.f9dd6e}>{ profit }</span>星痕
						</p>
					</div>
					:
					<div className={styles.r}>
						<p>您当前已经向<span className={styles.f9dd6e}>曲率驱动引擎</span>项目注入了</p>
						<p><span className={styles.bigNum}>{ ether }</span>星痕</p>
						<p>
							项目研发周期为<span className={styles.f9dd6e}>{ desc.day }天</span><br/>
							剩余<span className={styles.f9dd6e}>{ lessDate(parseInt(order_time)*1000, parseInt(desc.day)) }</span>
						</p>
						<p>
							每日收益为<span className={styles.f9dd6e}>{ desc.profit }</span>
						</p>
					</div>
				}
			</div>
		);
	}

	render() {
		const { userByContract } = window.getUserInfo(this.props.app);
		const { tabKey } = this.state;
		const { app, record, loading } = this.props;
		return (
			<Spin spinning={ loading } size="large">
				<SubLayout title="财务室">
					<div className={styles.tabBox}>
						<div className={ tabKey == 'in' ? styles.tabOn : styles.tab } style={{textAlign: 'left'}} onClick={ () => this.handleTab('in') }>我的注入</div>
						<div className={ tabKey == 'out' ? styles.tabOn : styles.tab } style={{textAlign: 'right'}} onClick={ () => this.handleTab('out') }>我的收益</div>
					</div>
					{
						tabKey == 'in' ?
							<div className={styles.inTable}>
								{
									record.my.map(v => (
										this.renderItem(v)
									))
								}
							</div>	
						:
							<div className={styles.outTable}>
								<div className={styles.item}>
									{/*<div className={styles.tag}>研发收益</div>*/}
									<div className={styles.c}>
										<div className={styles.icon1}></div>
										<div className={styles.num}>总收益<span className={styles.bigNum}>{ Number(userByContract['总静态收益']) + Number(userByContract["总导师祝福收益"]) + Number(userByContract["总导师收益"]) }</span>ETH</div>
										<ul className={styles.list}>
											<li className={styles.li52f8fe}>
												<span className={styles.l}>项目收益</span>
												<span className={styles.r}>{ userByContract['总静态收益'] }</span>
											</li>
											{/*<li className={styles.lif7910c}>
												<span className={styles.l}>上个项目收益</span>
												<span className={styles.r}>1.5037</span>
											</li>*/}
											<li className={styles.liff5dc4}>
												<span className={styles.l}>军职福利</span>
												<span className={styles.r}>{ userByContract["总导师祝福收益"] }</span>
											</li>
											<li className={styles.li5ce37c}>
												<span className={styles.l}>军职工资</span>
												<span className={styles.r}>{ userByContract["总导师收益"] }</span>
											</li>
										</ul>
									</div>
								</div>
								{/*<div className={styles.item}>
									<div className={styles.tag}>奖励收益</div>
									<div className={styles.c}>
										<div className={styles.icon2}></div>
										<div className={styles.num}>总收益<span className={styles.bigNum}>{ Number(userByContract["总导师祝福收益"]) + Number(userByContract["总导师收益"]) }</span>ETH</div>
										<ul className={styles.list}>
											<li className={styles.li52f8fe}>
												<span className={styles.l}>军职福利</span>
												<span className={styles.r}>{ userByContract["总导师祝福收益"] }<b className={styles.arrowUp}></b></span>
											</li>
											<li className={styles.lif7910c}>
												<span className={styles.l}>军职工资</span>
												<span className={styles.r}>{ userByContract["总导师收益"] }<b className={styles.arrowUp}></b></span>
											</li>
										</ul>
									</div>
								</div>*/}
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