import styled from "styled-components";

export const LeftItemWrapper = styled.div`
    .lineWrapper {
        display: flex;
        align-items: center;
        border-radius: 8px; 
        text-decoration: none;
        .icon {
            height: 46px;
            line-height: 46px;
            font-size: 18px;
            text-align: center;
            padding: 0 10px;
            /* color: white; */
        }
    }
    .active {
        border-radius: 8px;
    }

    @media (prefers-color-scheme: dark) {
        .active {
            background: #2b2b2f;
        }
        .lineWrapper {
            .icon {
                color: white;
            }
            span {
                color: white;
            }
        }
        .lineWrapper:hover {
            background: #2b2b2f;
        }
    }

    @media (prefers-color-scheme: light) {
        .active {
            background: #d3d2d3;
        }
        .lineWrapper {
            .icon {
                color: black;
            }
            span {
                color: black;
            }
        }
        .lineWrapper:hover {
            background: #d3d2d3;
        }
    }
`;