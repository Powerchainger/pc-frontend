import React from 'react';
import PropTypes from 'prop-types';
import './DevicePage.css';
import SideNav from "../SideNav/SideNav.tsx";
import DeviceList from "../DeviceList/DeviceList";

const DevicePage = () => (
  <div className="DevicePage" data-testid="DevicePage">
      <div className="sidenav">
        <SideNav></SideNav>
      </div>
      <div className="device-list">
        <DeviceList></DeviceList>
      </div>
  </div>
);

DevicePage.propTypes = {};

DevicePage.defaultProps = {};

export default DevicePage;
