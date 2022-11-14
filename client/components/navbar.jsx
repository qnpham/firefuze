import React from 'react';

function Nav(props) {
  return (
    <div className="container">
      <div className="navbar row">
        <div className="left-nav">
          <h1 className='logo'><a href="#" className='logo-text'>FireFuze</a></h1>        </div>
        <div className="right-nav">
          <i className="fa-solid fa-cart-shopping shopping-cart" />
        </div>
      </div>
    </div>
  );
}
export default Nav;
