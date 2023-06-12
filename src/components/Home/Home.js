import React from 'react';
import PropTypes from 'prop-types';
import './Home.css';
import SideNav from "../SideNav/SideNav";
import HomeContent from "../HomeContent/HomeContent";
import Prediction from "../Prediction/Prediction";

const Home = () => (
  <div className="Home" data-testid="Home">
      <div className="sidenav">
        <SideNav></SideNav>
      </div>
      <div className="predict">
          <Prediction></Prediction>
      </div>
  </div>
);

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
