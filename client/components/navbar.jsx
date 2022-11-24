import React from 'react';

function routeHome() {
  window.location = window.location.origin + '/#';
}

function Nav(props) {
  return (
    <div className="container">
      <div className="navbar row">
        <div className="left-nav">
          <h1 className='logo'>
            <a onClick={routeHome} className='logo-text'>FireFuze</a>
          </h1>
        </div>
        <div className="right-nav">
          <a className="fa-solid fa-cart-shopping shopping-cart" onClick={props.cartOn} />
        </div>
      </div>
    </div>
  );
}
export default Nav;
