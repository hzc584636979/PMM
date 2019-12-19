import React from 'react';
import { connect } from 'dva';
import { Link, withRouter } from 'dva/router';
import { Scrollbars } from 'react-custom-scrollbars';
import { Select, Button, Row, Col, Icon, Layout, Drawer, List, Modal } from 'antd';
import { routes as routesConfig } from './router';
import './utils/utils';
import './local/local';
import './reset.css';
import styles from './layout.less';

const { Option } = Select;
const { Header, Footer, Sider, Content } = Layout;
class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      
    };
  }

  componentDidMount() {
    this.setTitle();
  }

  componentDidUpdate (prevProps,prevState) {
    this.setTitle();
  }

  setTitle = () => {
      let pathName = this.props.location.pathname;
      routesConfig.map((v) => {
          if(pathName == v.path){
            document.title = `${v.name} - 永动机 - Perpetual motion machine`;
          }
      })
  }

  handleLanguageChange = (v) => {
    this.props.dispatch({
      type: 'app/lang',
      payload: {
        lang: v,
      }
    })
  }

  showModal = (type) => {
    let other = {};
    if(type == 'rule') {
      // 测试滚动条组件， 后期可删
      let modalDesc = () => {
        let arr = [];
        for(let i = 0; i < 20; i++){
          arr.push(<p>Bla bla ...</p>);
        }
        return arr;
      }
      other = {
        modalTitle: '平台规则',
        modalDesc: modalDesc(),
      };
    }else{
      other = {
        modalTitle: '公司简介',
        modalDesc: <p>没啥说的，牛逼</p>,
      };
    }
    this.setState({
      ...other,
      modalVisible: true,
      moveVisible: false,
    });
  };

  hideModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  showMoveDrawer = () => {
    this.setState({
      moveVisible: true,
    });
  };

  closeMoveDrawer = () => {
    this.setState({
      moveVisible: false,
    });
  };

  render() {
    let { children, location } = this.props;
    const Lang = this.props.app.lang;
    return (
      children
    )
  }
}

export default withRouter(
  connect(({ app, loading }) => ({
      app,
      loading,
  }))(App)
)