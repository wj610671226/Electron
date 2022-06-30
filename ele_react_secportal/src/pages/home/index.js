import React, { memo } from 'react';
import { renderRoutes } from 'react-router-config';
import { HomeWrapper } from "./style";
import { leftMenu } from '../../common/local-data';
import LeftItem from "../../components/leftItem";
import routes from '../../route';
import { Divider, Avatar, Progress } from 'antd';
import { NavLink } from 'react-router-dom';

export default memo(function Home() {    
    return (
        <HomeWrapper>
            <div className="left">
                <div className="left-header">
                    <Avatar className="logo" size={30}/> 阿里云盘
                </div>
                {
                    leftMenu.map((item, index) => {
                        return <LeftItem key={item.title} title={item.title} iconName={item.iconName} link={item.link}/>
                    })
                }
                <Divider/>
                <div className="left-menu-bottom">
                    <LeftItem title="传输列表" iconName="icon-houxutubiao100" link="/transmission"/>
                    <div>
                        <div className="capacity">
                            <span>104GB / 1.08TB</span>
                            <span>免费领容量</span>
                        </div>
                        <Progress percent={10}/>
                    </div>
                </div>
                <Divider className="left-menu-info-line"/>
                <div className="left-menu-info">
                    <div>
                        <Avatar src="https://joeschmoe.io/api/v1/random"/>
                        <span>天天开发</span>
                    </div>
                    <NavLink to="/setting" activeClassName="setting-active" className="setting">
                        <i className={'iconfont icon-icon_shezhi'}></i>
                    </NavLink>
                </div>
            </div>
            <div className="right">
                { renderRoutes(routes) }
            </div>
        </HomeWrapper>
    )
})
