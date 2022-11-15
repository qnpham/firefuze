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
      cartShowing: false
    };
    this.cartOn = this.cartOn.bind(this);
    this.cartOff = this.cartOff.bind(this);
  }

  cartOn() {
    this.setState({ cartShowing: true });
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
  }

  render() {
    const { route, param, cartShowing } = this.state;
    if (route === '') {
      return (
        <div>
          <Cart on={cartShowing} cartOff={this.cartOff}/>
          <header>
            <Navbar cartOn={this.cartOn}/>
          </header>
          <main>
            <Home/>
          </main>
        </div>
      );
    } else if (route === 'id') {
      return (

        <div>
          <Cart on={cartShowing} cartOff={this.cartOff} />

          <header>
            <Navbar cartOn={this.cartOn}/>
          </header>
          <main>
            <Detail id={param} />
          </main>
        </div>
      );
    }
  }
}
