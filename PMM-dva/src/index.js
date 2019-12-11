import "babel-polyfill";

import dva from 'dva';
import createLoading from 'dva-loading';
import { createBrowserHistory as createHistory } from 'history';
import './index.less';
import './utils/flexible';

// 1. Initialize

// 使用browser模式
/*const app = dva({
  history: createHistory(),
});*/

// 使用hash模式
const app = dva();

window.g_app = app;

window.g_getLocalStorage = () => {
  return localStorage.getItem('PMM-dva');
};

window.g_setLocalStorage = (params) => {
  return localStorage.setItem('PMM-dva', params);
};

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/app').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
