import React from "react";
import Style from './style.scss';
import API_ICON from '../../assets/img/Home-API-icon.png';
class Home extends React.Component {
    constructor(props: Object) {
        super(props);
    }
    render():JSX.Element {
        return (
            <div className={Style.homeContent}>
                <img src={API_ICON}/>
                <span>一个简单的接口管理工具</span>
            </div>
        );
    }
}

export default Home;