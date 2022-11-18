import React from 'react';
class CheckingOut extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userEmail: ''
    };
    this.handleContinue = this.handleContinue.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleContinue(e) {
    e.preventDefault();
    window.location.hash = 'checkingout?payment';
    this.props.getEmail(this.state.userEmail);
    this.props.fetchTotal(true);
  }

  handleChange(e) {
    this.setState({ userEmail: e.target.value });
  }

  render() {
    const { userEmail } = this.state;
    const games = this.props.cart.map(e => {
      const quantity = e.quantity > 1 ? 'x' + e.quantity : null;
      return (
        <div key={e.productid} className="receipt-game-container row">
          <span className='receipt-game-title'>{e.title} {quantity}</span>
          <span className='receipt-game-price'> ${e.price}</span>
        </div>
      );
    });

    return (
      <div className="container">
        <div className='user-info'>
          <form action="">
            <div className="checkingout-container">
              <div className="left-checkout">
                <label>
                  FIRST NAME
                  <input type="text" />
                </label>
                <label htmlFor="">
                  LAST NAME
                  <input type="text" />
                </label>
                <label htmlFor="">
                  EMAIL
                  <input type="text" onChange={this.handleChange} value={userEmail} />
                </label>
              </div>

              <div className="right-checkout">
                <div className='receipt'>
                  {games}
                  <div className="form-total-container">
                    <div className="form-total row">
                      <span className='final-checkout-total-text'>TOTAL</span>
                      <span className='final-checkout-total-value'>${this.props.subtotal}</span>
                    </div>
                  </div>
                </div>

                <div className='continue-container row'>
                  <button type="submit" className='continue' onClick={this.handleContinue}>CONTINUE</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default CheckingOut;
