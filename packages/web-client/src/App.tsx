import * as React from 'react';
import { HashRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
// const Home = loadable(() => import('./views/Home')); 异步加载组件
import { Row, Col } from 'antd';
import Main from './views/Main/Main';
import Login from './views/Login/Login'

class App extends React.Component {
    constructor(props:any) {
        super(props);
    }

    // 登陆校验
    componentDidMount() {
        window.addEventListener('hashchange', (event:any) => {
            if(event.newURL.split('#')[1] !== 'login' && sessionStorage.getItem('LoginStatus') !== 'Logined') {
                window.location.hash = '/login';
            }
        });
    }

    render() {
        return (
            <div style={{
                height: '100%'
            }}>
                <Router>
                    <Switch>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/main" component={Main}></Route>
                        <Redirect exact path="/" to="/login"></Redirect>
                    </Switch>
                </Router>
            </div>
        );
    }
}
export default App;