import React from 'react';
import PropTypes from 'prop-types';
import './Home.css';
import SideNav from "../SideNav/SideNav.tsx";
import HomeContent from "../HomeContent/HomeContent";
import Prediction from "../Prediction/Prediction";

const Home = () => {


    return (
  <div className="Home" data-testid="Home">
      <div className="sidenav">
          <div className="sidenav-container">
              <SideNav></SideNav>
          </div>
          <div className="content-container">
            <HomeContent></HomeContent>
          </div>
          </div>
  </div>
)};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
