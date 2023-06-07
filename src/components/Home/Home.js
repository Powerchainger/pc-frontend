import React from 'react';
import PropTypes from 'prop-types';
import './Home.css';
import SideNav from "../SideNav/SideNav";
import HomeContent from "../HomeContent/HomeContent";

const Home = () => (
  <div className="Home" data-testid="Home">
      <SideNav></SideNav>
      <HomeContent></HomeContent>
  </div>
);

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
