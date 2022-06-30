import React, { memo } from 'react'
import { LeftItemWrapper } from "./style";
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const LeftItem = memo(function ({ title, iconName, link }) {
    return (
        <LeftItemWrapper>
            <NavLink to={link} className="lineWrapper" activeClassName="active">
                <i className={'iconfont icon ' + iconName}></i>
                <span>{title}</span>
            </NavLink>
        </LeftItemWrapper>
    )
});

LeftItem.propTypes = {
    title: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
}

// LeftItem.defaultProps = {
// }

export default LeftItem;
