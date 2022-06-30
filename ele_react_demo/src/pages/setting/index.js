import React, { memo } from 'react'
import { LOGIN_OUT_SUCCESS } from "../../config/ipc-config";
import { Button } from 'antd';
import { SettingWrapper } from './style';
const { ipcRenderer }  = window.require('electron');

export default memo(function Setting() {
    return (
        <SettingWrapper>
            <Button type="primary"
            className="logout"
            onClick={() => {
                ipcRenderer.send(LOGIN_OUT_SUCCESS);
            }}
            >
                退出登录
            </Button>
        </SettingWrapper>
    )
})
