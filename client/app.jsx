import React from 'react';
import Home from './pages/home';
import Detail from './pages/detail';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      route: '',
      param: null
    };
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
    const { route, param } = this.state;
    if (route === '') {
      return <Home />;
    } else if (route === 'id') {
      return <Detail id={param} />;
    }
  }
}
