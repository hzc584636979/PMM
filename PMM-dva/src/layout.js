import React from 'react';
import { connect } from 'dva';
import { Link, withRouter } from 'dva/router';
import styles from './routes/IndexPage.css';
import { Select, Button, Row, Col, Icon, Layout, Drawer } from 'antd';
import { langConfig } from './utils/utils';

const { Option } = Select;
const { Header, Footer, Sider, Content } = Layout;
class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      
    };
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {

  }

  handleLanguageChange = (v) => {
    this.props.dispatch({
      type: 'app/lang',
      payload: {
        lang: v,
      }
    })
  }

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
      <Layout>
        <Header className={styles.header} type="flex" justify="space-around" align="middle">
          <Col span={4}>
            <Select defaultValue={ Lang } onChange={ this.handleLanguageChange }>
              <Option value="cn">中文</Option>
              <Option value="en">English</Option>
            </Select>
          </Col>
          <Col className={styles.logo} span={10}>LOGO</Col>
          <Col className={styles.move} span={10}>
            <Icon type="unordered-list" style={{ fontSize: 20, color: '#fff', cursor: 'pointer' }} onClick={this.showMoveDrawer}/>
          </Col>
        </Header>
        <Content>
          {children}
        </Content>
        <Footer className={styles.footer}>
          <Col>官方联系方式</Col>
        </Footer>
        <Drawer
          placement="right"
          closable={false}
          onClose={this.closeMoveDrawer}
          visible={this.state.moveVisible}
        >
          { location.pathname != '/' &&
            <Button type="link" onClick={ this.closeMoveDrawer }><Link to="/">{langConfig[Lang].home}</Link></Button>
          }
          <Button type="link" onClick={ this.closeMoveDrawer }><Link to="/products">{langConfig[Lang].transactionList}</Link></Button>
          <Button type="link" onClick={ this.closeMoveDrawer }><Link to="/">{langConfig[Lang].rule}</Link></Button>
          <Button type="link" onClick={ this.closeMoveDrawer }><Link to="/">{langConfig[Lang].about}</Link></Button>
        </Drawer>
      </Layout>
    )
  }
}

export default withRouter(
  connect(({ app, loading }) => ({
      app,
      loading,
  }))(App)
)