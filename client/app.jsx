import React from 'react';
import Home from './pages/home';
import Detail from './pages/detail';
import Cart from './components/cart';
import Navbar from './components/navbar';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      route: '',
      param: null,
      cart: null,
      cartShowing: false,
      subtotal: 0
    };
    this.cartOn = this.cartOn.bind(this);
    this.cartOff = this.cartOff.bind(this);
    this.addCartHandler = this.addCartHandler.bind(this);
    this.calcSubtotal = this.calcSubtotal.bind(this);
  }

  calcSubtotal() {
    const { cart } = this.state;
    if (!cart) return;
    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
      subtotal += (cart[i].price * cart[i].quantity);
    }
    this.setState({ subtotal });
  }

  cartOn() {
    this.setState({ cartShowing: true }, this.calcSubtotal);
  }

  cartOff() {
    this.setState({ cartShowing: false });
  }

  componentDidMount() {
    window.addEventListener('hashchange', e => {
      const hash = window.location.hash;
      const newHash = hash[0] === '#' ? hash.replace('#', '') : hash;
      const splitHash = newHash.split('?');
      const [route, param] = splitHash;
      this.setState({ route, param });
    });
    this.fetchCart();

  }

  addCartHandler(id) {
    const { cart } = this.state;
    if (!cart) return;
    let update = false;

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].productid === Number(id)) {
        update = true;
      }
    }

    if (update) {
      fetch(`/api/game/add/${id}`, {
        method: 'put',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => this.fetchCart(true))
        .catch(err => console.error(err));

    } else {
      fetch('/api/cart/add', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token')
        },
        body: JSON.stringify({
          productId: id,
          quantity: 1
        })
      })
        .then(() => {
          this.fetchCart(true);
        })
        .catch(err => console.error(err));
    }
  }

  fetchCart(show) {
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
          if (show) {
            this.setState({ cart }, this.cartOn);
          } else {
            this.setState({ cart });
          }
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    const { route, param, cartShowing, cart, subtotal } = this.state;
    let page;
    if (route === '') {
      page = <Home />;
    } else if (route === 'id') {
      page = <Detail id={param} cartOn={this.cartOn} addCartHandler={this.addCartHandler}/>;

    }
    return (
      <div>
        <Cart on={cartShowing} cartOff={this.cartOff} cart={cart} subtotal={subtotal}/>
        <header>
          <Navbar cartOn={this.cartOn}/>
        </header>
        <main>
          {page}
        </main>
      </div>
    );
  }
}
