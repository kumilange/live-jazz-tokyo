import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { CalendarIcon, UserIcon, svgIconSize, SignoutIcon } from '../../atoms/Icon/Icon';
import './Tooltip.css';

const handleMultiHandlers = (toggleTooltip, logout) => {
  logout();
  toggleTooltip();
};

const Tooltip = ({ userProfile, isTooltipOpen, logout, toggleTooltip }) => (
  <div className={isTooltipOpen ? 'tooltip open' : 'tooltip'}>
    <ul>
      <li className="flex vertCenter">
        <Link to={`/user/${userProfile.id}`} className="tooltip-link" onClick={toggleTooltip}>
          <UserIcon style={svgIconSize} />
          <span>User Profile</span>
        </Link>
      </li>
      <li className="flex vertCenter">
        <Link to={'/addevent'} className="tooltip-link" onClick={toggleTooltip}>
          <CalendarIcon style={svgIconSize} />
          <span>Create Event</span>
        </Link>
      </li>
      <li className="flex vertCenter">
        <Link to={''} className="tooltip-link">
          <span className="signout">{SignoutIcon}</span>
          <span
            role="presentation"
            onClick={() => handleMultiHandlers(toggleTooltip, logout)}
          >Logout
          </span>
        </Link>
      </li>
    </ul>
  </div>
);

Tooltip.propTypes = {
  userProfile: PropTypes.shape().isRequired,
  isTooltipOpen: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  toggleTooltip: PropTypes.func.isRequired,
};

export default Tooltip;
