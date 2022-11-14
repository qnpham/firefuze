import React from 'react';
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: null
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      fetch('/api/cart/token', {
        method: 'POST'
      })
        .then(r => r.json())
        .then(r => {
          const { token } = r;
          localStorage.setItem('token', token);
        })
        .catch(err => console.error(err))
      ;
    } else {
      fetch('/api/cart/token', {
        method: 'POST',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(r => r.json())
        .then(r => {
          const cart = [...r];
          this.setState({ cart });
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    return <main><h1>hi</h1></main>;
  }
}

export default Cart;
