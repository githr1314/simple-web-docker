import * as React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import Style from './style.scss'
import API_ICON from '../../assets/img/API-icon.png';
import User_Icon1 from '../../assets/img/User-icon1.png';
import Home from '../Home/Home';
import Project from '../Project/Project';
import Interface from '../Interface/Interface';
import { Layout, Menu, Row, Col, Dropdown, Space } from 'antd';
import { HomeOutlined, AppstoreOutlined, ProfileOutlined, DownOutlined, GithubOutlined } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;

class Main extends React.Component {
    constructor(props:Object) {
        super(props)
    }
    render():JSX.Element {
        return (
            <Layout className={Style.layoutMain}>
                <Header style={{ padding: '0 30px' }}>
                    <HeadComponent></HeadComponent>
                </Header>
                <Layout>
                    <Sider>
                        <MenuComponent></MenuComponent>
                    </Sider>
                    <Content style={{ padding: '15px', height: '100%' }}>
                        <Route exact path="/main/home" component={Home}></Route>
                        <Route path="/main/project" component={Project}></Route>
                        <Route path="/main/interface" component={Interface}></Route>
                        <Redirect from="/main/" to="/main/home"></Redirect>
                    </Content>
                </Layout>
                <Footer style={{
                    backgroundColor: 'rgba(0,0,0,1)',
                    color: 'white'
                }}>
                    <FootComponent></FootComponent>
                </Footer>
            </Layout>
        )
    }
}

/**
 * @description 头部组件
 * @param props 
 */
function HeadComponent(props:Object):JSX.Element {

    const logout = (e:any) => {
        sessionStorage.removeItem('LoginStatus');
        window.location.hash = '/login';
    }

    const userMenu = (
        <Menu>
            <Menu.Item key="1">
                <span><HomeOutlined />用户信息</span>
            </Menu.Item>
            <Menu.Item key="2">
                <span><AppstoreOutlined />修改密码</span>
            </Menu.Item>
            <Menu.Item key="3">
                <span onClick={logout}><ProfileOutlined />退出登陆</span>
            </Menu.Item>
        </Menu>
    );
    return (
        <Row style={{ color: 'white' }}>
            <Col span={6}>
                <Space>
                    <img className={Style.apiIcon} src={API_ICON}/>
                    <span>接口系统</span>
                </Space>
            </Col>
            <Col  offset={14}>
                <Dropdown overlay={userMenu}>
                    <Space>
                        <img className={Style.userIcon} src={User_Icon1}/>
                        <a style={{ color: 'white' }}>用户</a>
                        <DownOutlined/>
                    </Space>
                </Dropdown>
            </Col>
            <Col className={Style.gitHubIcon} offset={1}>
                <GithubOutlined onClick={(e:any) => window.location.href = 'https://github.com/githr1314/simple-api-platform'} />
            </Col>
        </Row>
    );
}

/**
 * @description 菜单组件
 * @param props 
 */
function MenuComponent(props:Object):JSX.Element {
    return (
        <Menu style={{ height: '100%' }} defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
                <Link to="/main/home">
                    <HomeOutlined />
                    <span>首页</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/main/project">
                    <AppstoreOutlined />
                    <span>项目</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link to="/main/interface">
                    <ProfileOutlined />
                    <span>接口</span>
                </Link>
            </Menu.Item>
        </Menu>
    );
}

/**
 * @description 底部组件
 * @param props 
 */
function FootComponent(props:Object):JSX.Element {
    const reactIcon = <img style={{width: '14px'}} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"></img>
    const antdIcon =  <img style={{width: '14px'}} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
    return (
        <Row justify="center">
            <Col>Supported by {reactIcon} React & {antdIcon} Antd</Col>
        </Row>
    );
}

export default Main;