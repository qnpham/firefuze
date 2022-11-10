import React from 'react';
import Navbar from '../components/navbar';

class Home extends React.Component {
  constructor(props) {
    super(props);

    const device = screen.width < 1024 ? 'mobile' : 'desktop';

    this.state = {
      device,
      headers: null,
      carouselIndex: 0,
      intervalId: null
    };
    this.autoscroll = this.autoscroll.bind(this);
  }

  componentDidMount() {

    fetch('http://localhost:3000/api/header/limit/3')
      .then(r => r.json())
      .then(r => {
        this.setState({ headers: r }, this.autoscroll);
      })
      .catch(r => console.error(r));
  }

  autoscroll() {
    const { intervalId, carouselIndex, headers } = this.state;
    let newIndex = carouselIndex;
    if (intervalId) {
      clearInterval(intervalId);
    }
    const newIntervalId = setInterval(() => {
      newIndex++;
      if (newIndex === headers.length) {
        newIndex = 0;
      } else if (newIndex === -1) {
        newIndex = headers.length - 1;
      }

      this.setState({ carouselIndex: newIndex });
    }, 3000);
    this.setState({ intervalId: newIntervalId });
  }

  render() {
    const { headers, carouselIndex, device } = this.state;
    if (!headers) return null;
    const currentHeader = headers[carouselIndex];

    const tabs = headers.map(e => {
      if (e.productid === currentHeader.productid) {
        return <i className="fa-solid fa-circle circle" key={e.productid}/>;
      }
      return <i className="fa-regular fa-circle circle" key={e.productid}/>;
    });

    const games = headers.map(e => {
      const kb = e.supportkbm ? <i className="fa-solid fa-keyboard" /> : null;
      const m = e.supportkbm ? <i className="fa-solid fa-computer-mouse" /> : null;
      const controller = e.supportcontroller ? <i className="fa-solid fa-gamepad" /> : null;
      return (
        <div className="game-container row" key={e.productid} >
          <div className='game-img-container column-one-third row'>
            <img src={e.imageurl} alt="" className='game-img'/>
          </div>
          <div className='game-text-container column-one-half'>
            <h4 className='game-title'>{e.title}</h4>
            <p className='game-features'>{e.features}</p>
            <div className='kbm-container'>
              {kb}
              {m}
              {controller}
            </div>
          </div>
          <div className='price column-one-sixth row'>
            ${e.price}
          </div>
        </div>
      );
    });
    if (device === 'mobile') {
      return (
        <div>
          <header>
            <Navbar />
          </header>
          <main>
            <div className="container">
              <div className="carousel-container row">
                <img src={currentHeader.imageurl} alt="" className='carousel'/>
                <div className="tabs">
                  {tabs}
                </div>
              </div>
              <div className='product-list'>
                <h4 className='best-sellers'>Best Sellers</h4>
                {games}
              </div>
            </div>
          </main>
        </div>
      );
    } else {
      return (
        <div>
          <header>
            <Navbar />
          </header>
          <main>
            <div className="container">
              <div className="carousel-container row">
                <img src={currentHeader.imageurl} alt="" className='carousel'/>
                <div className="tabs">
                  {tabs}
                </div>
                <div className="bg-carousel row">
                  <img src={currentHeader.imageurl} alt="" className='prev-carousel'/>
                  <img src={currentHeader.imageurl} alt="" className='next-carousel'/>
                </div>
              </div>
              <div className='product-list'>
                <h4 className='best-sellers'>Best Sellers</h4>
                {games}
              </div>
            </div>
          </main>
        </div>
      );
    }
  }
}
export default Home;
