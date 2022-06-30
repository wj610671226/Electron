import styled from "styled-components";

export const HomeWrapper = styled.div`
    display: flex;
    .left {
        display: flex;
        flex-direction: column;
        width: 240px;
        height: 100vh;
        padding: 30px 15px 0 15px;
        .left-header {
            padding: 25px 0;
            .logo {
                margin: 0 10px;
            }
        }
        .left-menu-bottom {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .capacity {
                display: flex;
                justify-content: space-between;
                align-items: center;
                span:nth-child(2) {
                    color: #4369ec;
                    font-size: 12px;
                }
            }
        }
        .left-menu-info-line {
            margin-bottom: 10px;
        }
        .left-menu-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            /* background: red; */
            height: 75px;
            span {
                padding-left: 10px;
            }
            i {
                padding-right: 5px;
            }
            .setting {
                width: 30px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                padding-left: 4px;
            }
        }
    }

    .right {
        padding-top: 30px;
        padding-left: 20px;
        flex: 1;
    }

    // 根据系统模式变化
    @media (prefers-color-scheme: dark) {
        .left { 
            background: #1f1f22;
            color: white;
            .ant-divider {
                border-top: 1px solid #444449;
            }
            .left-menu-bottom {
                .ant-progress-text {
                    color: white;
                }
            }
            .left-menu-info {
                a {
                    text-decoration: none;
                    color: white;
                }
                .setting-active {
                    background: #2b2b2f;
                    border-radius: 5px;
                }
            }
        }
        .right {
            background: #111113;
            color: white;
        }
    }

    @media (prefers-color-scheme: light) {
        .left { 
            background: #e6e5e3;
            color: black;
            .ant-divider {
                border-top: 1px solid #cecece;
            }
            .left-menu-bottom {
                .ant-progress-text {
                    color: black;
                }
            }
            .left-menu-info {
                a {
                    text-decoration: none;
                    color: black;
                }
                .setting-active {
                    background: #cecece;
                    border-radius: 5px;
                }
            }
        }
        .right {
            background: white;
            color: black;
        }
    }
`;