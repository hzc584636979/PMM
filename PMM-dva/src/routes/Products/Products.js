import React from 'react';
import { connect } from 'dva';
import { Spin, Tabs } from 'antd';
import ProductList from '../../components/ProductList/ProductList.js';
import { routerRedux } from 'dva/router';

const { TabPane } = Tabs;
class Products extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {

	  };
	}

	componentDidMount() {
        this.props.dispatch({
			type: 'products/getAll'
		})
    }

	callback = (key) => {
		if(key == 1){
			this.props.dispatch({
				type: 'products/getAll'
			})
		}else{
			if(!this.props.index || !this.props.index.address) {
				this.props.dispatch(routerRedux.push('/'));
				return;
			};
			this.props.dispatch({
				type: 'products/getMy'
			})
		}
	}

	render() {
		return (
			<Spin spinning={ this.props.loading }>
				<h2>交易列表</h2>
				<Tabs defaultActiveKey="1" onChange={ this.callback } >
				    <TabPane tab="所有投注" key="1">
				      	<ProductList
							products={ this.props.products }
						/>
				    </TabPane>
				    <TabPane tab="我的投注" key="2">
				    	<ProductList
							products={ this.props.products }
						/>
				    </TabPane>
				</Tabs>
			</Spin>
		)
	}
};

export default connect(({ index, products, loading }) => ({
	index,
	products,
	loading: loading.models.products
}))(Products);