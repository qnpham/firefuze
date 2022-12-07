import React from 'react';
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.plusHandler = this.plusHandler.bind(this);
    this.minusHandler = this.minusHandler.bind(this);
  }

  plusHandler(e) {
    const container = e.target.closest('.cart-game');
    const id = container.getAttribute('id');
    this.props.incQuantity(id);
  }

  minusHandler(e) {
    const container = e.target.closest('.cart-game');
    const id = container.getAttribute('id');
    this.props.decQuantity(id);
  }

  render() {
    const { cart, on } = this.props;
    let games;
    if (!cart) {
      games = null;
    } else {
      games = cart.map(e => {
        return (
          <div className="cart-game column-full row" key={e.productid} id={e.productid} >
            <div className="cart-game-img-container column-one-third">
              <img src={e.imageurl} alt="" className='cart-game-img' />
            </div>
            <div className='cart-game-text column-one-half'>
              <div className='cart-game-title'>{e.title}</div>
              <div className='quantity-container'>
                <span className='quantity-text'>QTY</span>
                <div className='quantity-buttons'>
                  <button className='button-icon'>
                    <i className="fa-solid fa-plus plus" onClick={this.plusHandler} />
                  </button>
                  <span className='quantity-value'>{e.quantity}</span>
                  <button className='button-icon'>
                    <i className="fa-solid fa-minus minus" onClick={this.minusHandler} />
                  </button>
                </div>
              </div>
            </div>
            <div className='cart-game-price column-one-sixth row'>${e.price}</div>
          </div>
        );
      });
    }
    if (on) {
      return (
        <div>
          <div className='cart-container cart-on container'>
            <div className='cart-text-container'>
              <p className='cart-text'>CART</p>
            </div>
            <div className="cart-game-container">
              {games}
            </div>
            <div className='checkout-container'>
              <div className='subtotal-container row'>
                <span>Subtotal</span>
                <span>${this.props.subtotal}</span>
              </div>
              <div className='checkout-btn-container' onClick={this.props.cartOff}>
                <a href="#checkout" className='checkout-btn'>CHECKOUT</a>
              </div>
            </div>
          </div>
          <div className="black black-on" onClick={this.props.cartOff}/>
        </div>
      );
    } else {
      return (
        <div>
          <div className='cart-container container'>
            <div className='cart-text-container'>
              <p className='cart-text'>CART</p>
            </div>
            <div className="cart-game-container">
              {games}
            </div>
            <div className='checkout-container'>
              <div className='subtotal-container row'>
                <span>Subtotal</span>
                <span>${this.props.subtotal}</span>
              </div>
              <div className='checkout-btn-container' onClick={this.props.cartOff}>
                <a href="#checkout" className='checkout-btn'>CHECKOUT</a>
              </div>
            </div>
          </div>
          <div className="black"/>
        </div>
      );
    }
  }
}

export default Cart;
