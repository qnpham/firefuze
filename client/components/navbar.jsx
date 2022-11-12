import React from 'react';

function hashRoute() {
  window.location.hash = '#';
}

function Nav(props) {
  return (
    <div className="container">
      <div className="navbar row">
        <div className="left-nav">
          <h1 className='logo' onClick={hashRoute} >FireFuze</h1>
        </div>
        <div className="right-nav">
          <i className="fa-solid fa-cart-shopping shopping-cart" />
        </div>
      </div>
    </div>
  );
}
export default Nav;
