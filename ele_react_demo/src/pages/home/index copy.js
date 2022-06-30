import React, { memo } from 'react';
import { LOGIN_OUT_SUCCESS } from "../../config/ipc-config";
import { renderRoutes } from 'react-router-config';
import { NavLink } from 'react-router-dom';
import route from "../../route";
const { ipcRenderer }  = window.require('electron');

export default memo(function Home() {    
    // const {route} = props;
    console.log(route);
    return (
        <div>
            <div>主页</div>
            <div>
                <NavLink to='/recommend'>推荐</NavLink>
                <NavLink to='/mine'>我的</NavLink>
            </div>
            { renderRoutes(route) }
            <button onClick={ () => {
                ipcRenderer.send(LOGIN_OUT_SUCCESS);
            }}>退出登录</button>
        </div>
    )
})
