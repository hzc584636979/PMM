import React from 'react';
import { Route, Switch, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from './layout';

const { ConnectedRouter } = routerRedux;
const routes = [
	{
	  path: '/',
	  name: '首页',
	  models: () => [import('./models/index')],
	  component: () => import('./routes/IndexPage'),
	},
	{
	  path: '/products',
	  name: '列表页',
	  models: () => [import('./models/products')],
	  component: () => import('./routes/Products/Products'),
	},
];

function RouterConfig({ history, app }) {
	return (
		<ConnectedRouter history={history}>
			<App>
				<Switch>
					{
						routes.map(({ path, name, ...dynamics }) => (
								<Route 
									path={ path } 
									key={ name }
									exact
									component={ dynamic({ app, ...dynamics}) }
								/>
						))
					}
				</Switch>
			</App>
		</ConnectedRouter>
	);
}

export default RouterConfig;
