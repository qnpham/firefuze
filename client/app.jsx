import React from 'react';
import Home from './pages/home';
import Detail from './pages/detail';
import Cart from './components/cart';
import Navbar from './components/navbar';
import Checkout from './pages/checkout';
import CheckingOut from './pages/checkingout';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Stripe from './components/stripe';
import Confirmation from './pages/confirmation';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      route: '',
      param: null,
      cart: [],
      cartShowing: false,
      subtotal: null,
      clientSecret: null,
      userEmail: null
    };
    this.cartOn = this.cartOn.bind(this);
    this.cartOff = this.cartOff.bind(this);
    this.addCartHandler = this.addCartHandler.bind(this);
    this.calcSubtotal = this.calcSubtotal.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.createOrder = this.createOrder.bind(this);
  }

  componentDidMount() {

    fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(data => this.setState({ clientSecret: data.clientSecret }))
      .catch(err => console.error(err));

    /// /////////////
    this.getUrl();
    window.addEventListener('hashchange', e => {
      this.getUrl();
    });
    this.fetchCart();
  }

  getUrl() {
    const hash = window.location.hash;
    const newHash = hash[0] === '#' ? hash.replace('#', '') : hash;
    const splitHash = newHash.split('?');
    const [route, param] = splitHash;
    this.setState({ route, param });
  }

  calcSubtotal() {
    const { cart } = this.state;
    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
      subtotal += (cart[i].price * cart[i].quantity);
    }
    subtotal = Number(subtotal.toFixed(2));
    this.setState({ subtotal });
  }

  incrementQuantity(id) {
    fetch(`/api/game/add/${id}`, {
      method: 'put',
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(() => this.fetchCart(true))
      .catch(err => console.error(err));
  }

  cartOn() {
    this.setState({ cartShowing: true });
  }

  cartOff() {
    this.setState({ cartShowing: false });
  }

  addCartHandler(id) {
    const { cart } = this.state;
    let update = false;

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].productid === Number(id)) {
        update = true;
      }
    }
    if (update) {
      this.incrementQuantity(id);

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
            this.setState({ cart }, this.showCartHandler);
          } else {
            this.setState({ cart }, this.calcSubtotal);
          }
        })
        .catch(err => console.error(err));
    }

  }

  showCartHandler() {
    this.calcSubtotal();
    this.cartOn();
  }

  createOrder() {
    const { userEmail } = this.state;
    fetch('/api/order/add', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token')
      },
      body: JSON.stringify({
        email: userEmail
      })
    })
      .then(() => {
        localStorage.removeItem('token');
      })
      .catch(err => console.error(err));

  }

  getEmail(email) {
    this.setState({ userEmail: email });
  }

  render() {

    const { route, param, cartShowing, cart, subtotal, clientSecret, userEmail } = this.state;
    const appearance = {
      theme: 'night'
    };
    const options = {
      clientSecret,
      appearance
    };

    let page;
    if (route === '') {
      page = <Home />;
    } else if (route === 'id') {
      page = <Detail id={param} cartOn={this.cartOn} addCartHandler={this.addCartHandler}/>;
    } else if (route === 'checkout') {
      page = <Checkout cart={cart} subtotal={subtotal} />;
    } else if (route === 'checkingout') {
      if (param === 'payment' && userEmail) {
        page = <div>
          {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <Stripe createOrder={this.createOrder} />
          </Elements>
          )}
        </div>;
      } else {
        page = <CheckingOut cart={cart} subtotal={subtotal} getEmail={this.getEmail}/>;
      }
    } else if (route === 'confirmation') {
      page = <Confirmation />;
    }
    return (
      <div>
        <Cart on={cartShowing} cartOff={this.cartOff} cart={cart} subtotal={subtotal} />
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
