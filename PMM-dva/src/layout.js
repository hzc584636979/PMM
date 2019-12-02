import React from 'react';
import 'react-flexible';
import { connect } from 'dva';
import { Link, withRouter } from 'dva/router';
import { Scrollbars } from 'react-custom-scrollbars';
import { Select, Button, Row, Col, Icon, Layout, Drawer, List, Modal } from 'antd';
import { langConfig } from './utils/utils';
import { routes as routesConfig } from './router';
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
      /*location.pathname != '/' ?
      <Layout>
        <Header className={styles.header} type="flex" justify="space-around" align="middle">
          <Col span={4} style={{ textAlign: 'left' }}>
            <Select defaultValue={ Lang } onChange={ this.handleLanguageChange }>
              <Option value="cn">中文</Option>
              <Option value="en">English</Option>
            </Select>
          </Col>
          <Col className={styles.logo} span={16}>LOGO</Col>
          <Col className={styles.move} span={4}>
            <Icon type="unordered-list" style={{ fontSize: 20, color: '#fff', cursor: 'pointer' }} onClick={this.showMoveDrawer}/>
          </Col>
        </Header>
        <Content>
          {children}
        </Content>
        <Footer className={styles.footer}>
          <Col>官方联系方式</Col>
        </Footer>
        <Modal
          title={ this.state.modalTitle }
          visible={this.state.modalVisible}
          footer={[
            <Button key="hideModal" type="primary" onClick={this.hideModal}>
                朕知道了  
            </Button>
          ]}
          closable={false}
          wrapClassName={styles.rule}
        >
          <Scrollbars autoHeight>
            { this.state.modalDesc }
          </Scrollbars>
        </Modal>
        <Drawer
          placement="right"
          closable={false}
          onClose={this.closeMoveDrawer}
          visible={this.state.moveVisible}
        >
          <ul className={ styles.drawerList }>
            { location.pathname != '/indexPage' &&
              <li>
                <Link to="/indexPage">
                  <Button type="link" onClick={ this.closeMoveDrawer }>
                    <Icon type="pay-circle" />
                    {langConfig[Lang].home}
                  </Button>
                </Link>
              </li>
            }
            <li>
              <Link to="/products">
                <Button type="link" onClick={ this.closeMoveDrawer }>
                  <Icon type="container" />
                  {langConfig[Lang].transactionList}
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/indexPage">
                <Button type="link" onClick={ () => this.showModal('rule') }>
                  <Icon type="file-done" />
                  {langConfig[Lang].rule}
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/indexPage">
                <Button type="link" onClick={ () => this.showModal('about') }>
                  <Icon type="alert" />
                  {langConfig[Lang].about}
                </Button>
              </Link>
            </li>
          </ul>
        </Drawer>
      </Layout>
      :*/
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