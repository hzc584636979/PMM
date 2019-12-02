import React, { Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Spin } from 'antd';
import SubLayout from '../../components/SubLayout';
import styles from './index.less';

class FAQ extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	itemKey: '',
	  	list: [
	  		{
	  			Q: '本金多久返回？1',
				A: 'balabala',
	  		},
	  		{
	  			Q: '本金多久返回？2',
				A: 'balabala',
	  		},
	  		{
	  			Q: '本金多久返回？3',
				A: 'balabala',
	  		},
	  		{
	  			Q: '本金多久返回？4',
				A: 'balabala',
	  		},
	  		{
	  			Q: '本金多久返回？5',
				A: 'balabala',
	  		},
	  	]
	  };
	}

	componentDidMount() {
		if(window.getUserInfo(this.props.app).address == "") {
			this.props.dispatch(routerRedux.push('/indexPage'))
		}
		this.props.dispatch({
			type: 'faq/item'
		})
	}

	toggleItem = itemKey => {
		this.setState({
			itemKey: itemKey === this.state.itemKey ? '' : itemKey,
		})
	}

	render() {
		const { userByContract } = window.getUserInfo(this.props.app);
		const { faq, loading } = this.props;
		const { itemKey, list } = this.state;
		return (
			<Spin spinning={ loading }>
				<SubLayout title="助理室">
					<ul className={styles.list}>
						{ 
							list.map((v, i) => (
								<Fragment>
									<li className={`${i === itemKey ? styles.on : ''}`} onClick={ () => this.toggleItem(i) }>
										<span className={styles.l}>{ v.Q }</span>
										<span className={styles.r}><b className={styles.arrow}></b></span>
									</li>
									{
										i === itemKey && <p className={styles.A}>{ v.A }</p>
									}
								</Fragment>
							))
						}
					</ul>
				</SubLayout>
			</Spin>
		);
	}
}

export default connect(({ app, faq, loading }) => ({ app, faq, loading: loading.models.faq }))(FAQ);