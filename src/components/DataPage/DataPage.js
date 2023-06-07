import React from 'react';
import PropTypes from 'prop-types';
import './DataPage.css';
import SideNav from "../SideNav/SideNav";
import Chart from "../Chart/Chart";

const DataPage = () => (
  <div className="DataPage" data-testid="DataPage">
      <div className="sidenav"><SideNav></SideNav></div>
      <div className="chart"><Chart></Chart></div>
      <div className="chart" ><Chart title="active watt last 24 hours"></Chart></div>
  </div>
);

DataPage.propTypes = {};

DataPage.defaultProps = {};

export default DataPage;
