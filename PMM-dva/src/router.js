import React from 'react';
import { Route, Switch, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from './layout';

const { ConnectedRouter } = routerRedux;
const routes = [
	{
	  path: '/',
	  name: 'loading',
	  models: () => [],
	  component: () => import('./routes/progress'),
	},
	{
	  path: '/indexPage',
	  name: '首页',
	  models: () => [import('./models/index')],
	  component: () => import('./routes/IndexPage'),
	},
	{
	  path: '/develop',
	  name: '研发室',
	  models: () => [import('./models/develop')],
	  component: () => import('./routes/Develop'),
	},
	{
	  path: '/admin',
	  name: '行政室',
	  models: () => [import('./models/admin')],
	  component: () => import('./routes/Admin'),
	},
	{
	  path: '/statistics',
	  name: '统计室',
	  models: () => [import('./models/statistics')],
	  component: () => import('./routes/Statistics'),
	},
	{
	  path: '/record',
	  name: '财务室',
	  models: () => [import('./models/record')],
	  component: () => import('./routes/Record'),
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
