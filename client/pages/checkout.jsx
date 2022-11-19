import React from 'react';
// import Loading from './loading';
class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      null: null
    };
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
    const { cart } = this.props;
    let games;
    if (!cart) {
      games = null;
    } else {
      games = cart.map(e => {
        return (
          <div className="cart-game column-full row checkout-game" key={e.productid} id={e.productid} >
            <div className="cart-game-img-container column-one-third">
              <img src={e.imageurl} alt="" className='cart-game-img' />
            </div>
            <div className='cart-game-text column-one-half'>
              <div className='cart-game-title checkout-game-title'>{e.title}</div>
              <div className='quantity-container'>
                <span className='quantity-text checkout-game-qnty'>QNTY</span>
                <div className='quantity-buttons checkout-qnty-btns'>
                  <i className="fa-solid fa-plus" onClick={this.plusHandler} />
                  <span className='quantity-value'>{e.quantity}</span>
                  <i className="fa-solid fa-minus" onClick={this.minusHandler} />
                </div>
              </div>
            </div>
            <div className='cart-game-price column-one-sixth row checkout-game-price'>${e.price}</div>
          </div>
        );
      });
    }

    return (
      <div className="container">
        <div className="checkout-cart-container">
          <div className="left">
            <div className="checkout-cart-text-container row">
              <span className='checkout-page-text'>CART</span>
            </div>
            <div className="checkout-cart-game-container">
              {games}
            </div>
          </div>
          <div className="right row">
            <div className='checkouts-container'>
              <div className='total-container row'>
                <span className='checkout-total-text'>Total</span>
                <span className='checkout-total-value'>${this.props.subtotal}</span>
              </div>
              <div className="page-checkout-btn-container row">
                <a href="#checkingout" className='page-checkout-btn'>CHECKOUT</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Checkout;
