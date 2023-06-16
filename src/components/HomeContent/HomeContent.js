import React from 'react';
import PropTypes from 'prop-types';
import './HomeContent.css';

const HomeContent = () => {

    const username = localStorage.getItem('username')


    return (
  <div className="HomeContent" data-testid="HomeContent">
      <div className="content">
          <h1>Welcome {username}</h1>
      </div>
  </div>

)};

HomeContent.propTypes = {};

HomeContent.defaultProps = {};

export default HomeContent;
