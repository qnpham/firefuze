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
    this.getEmail = this.getEmail.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.fetchStripe = this.fetchStripe.bind(this);
    this.fetchTotal = this.fetchTotal.bind(this);
    this.incQuantity = this.incQuantity.bind(this);
    this.decQuantity = this.decQuantity.bind(this);
    this.deleteGame = this.deleteGame.bind(this);
  }

  componentDidMount() {
    this.fetchCart();

    this.getUrl();
    window.addEventListener('hashchange', e => {
      this.getUrl();
    });
  }

  incQuantity(id, show) {
    const { cart } = this.state;
    let newQuantity;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].productid === Number(id)) {
        newQuantity = cart[i].quantity + 1;
      }
    }
    fetch('/api/cart/quantity', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token')
      },
      body: JSON.stringify({
        quantity: newQuantity,
        productid: id
      })
    })
      .then(() => {
        if (show) {
          this.fetchCart(true);
        } else {
          this.fetchCart();
        }
      })
      .catch(err => console.error(err));
  }

  decQuantity(id) {
    const { cart } = this.state;
    let newQuantity;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].productid === Number(id)) {
        newQuantity = cart[i].quantity - 1;
      }
    }
    if (newQuantity === 0) {
      this.deleteGame(id);
    }
    fetch('/api/cart/quantity', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token')
      },
      body: JSON.stringify({
        quantity: newQuantity,
        productid: id
      })
    })
      .then(() => this.fetchCart())
      .catch(err => console.error(err));
  }

  deleteGame(id) {
    fetch(`/api/cart/delete/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token')
      }
    }).then(() => this.fetchCart())
      .catch(err => console.error(err));
  }

  fetchTotal(makeOrder) {
    fetch('/api/cart/total', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token')
      }
    })
      .then(r => r.json())
      .then(total => {
        if (makeOrder) {
          this.fetchStripe();
        } else {
          const amount = !total ? 0 : total;
          this.setState({ subtotal: amount });
        }
      })
      .catch(err => console.error(err));
  }

  fetchStripe() {
    fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => this.setState({ clientSecret: data.clientSecret }))
      .catch(err => console.error(err));

  }

  getUrl() {
    const hash = window.location.hash;
    const newHash = hash[0] === '#' ? hash.replace('#', '') : hash;
    const splitHash = newHash.split('?');
    const [route, param] = splitHash;
    this.setState({ route, param });
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
      this.incQuantity(id, true);

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
            this.setState({ cart }, this.fetchTotal);
          }
        })
        .catch(err => console.error(err));
    }

  }

  showCartHandler() {
    this.fetchTotal();
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
        page = <CheckingOut cart={cart} subtotal={subtotal} getEmail={this.getEmail} fetchTotal={this.fetchTotal} />;
      }
    } else if (route === 'confirmation') {
      page = <Confirmation />;
    }
    return (
      <div>
        <Cart on={cartShowing} cartOff={this.cartOff} cart={cart} subtotal={subtotal} incQuantity={this.incQuantity} decQuantity={this.decQuantity} />
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
