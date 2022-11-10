import React from 'react';
import Navbar from '../components/navbar';

class Home extends React.Component {
  constructor(props) {
    super(props);

    const device = window.innerWidth < 1024 ? 'mobile' : 'desktop';

    this.state = {
      device,
      headers: null,
      carouselIndex: 0,
      intervalId: null
    };
    this.autoscroll = this.autoscroll.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {

    fetch('http://localhost:3000/api/header/limit/4')
      .then(r => r.json())
      .then(r => {
        this.setState({ headers: r }, this.autoscroll);
      })
      .catch(r => console.error(r));

    window.addEventListener('resize', e => {
      const device = window.innerWidth < 1024 ? 'mobile' : 'desktop';
      if (this.state.device !== device) {
        this.setState({ device });
      }
    });
  }

  autoscroll() {
    const { intervalId } = this.state;
    clearInterval(intervalId);

    const newIntervalId = setInterval(() => {
      const currentIndex = this.convertIndex(this.state.carouselIndex, 'next');
      this.setState({ carouselIndex: currentIndex });
    }, 3000);
    this.setState({ intervalId: newIntervalId });
  }

  handlePrev() {
    const { carouselIndex } = this.state;
    const newIndex = this.convertIndex(carouselIndex, 'prev');
    this.setState({ carouselIndex: newIndex });
    this.autoscroll();
  }

  handleNext() {
    const { carouselIndex } = this.state;
    const newIndex = this.convertIndex(carouselIndex, 'next');
    this.setState({ carouselIndex: newIndex });
    this.autoscroll();

  }

  convertIndex(index, conversion) {
    const { headers } = this.state;
    if (conversion === 'next') {
      index++;
      if (index === headers.length) {
        index = 0;
      }
    } else if (conversion === 'prev') {
      index--;
      if (index === -1) {
        index = headers.length - 1;
      }
    }
    return index;
  }

  render() {
    const { headers, carouselIndex, device } = this.state;
    if (!headers) return null;
    const currentHeader = headers[carouselIndex];
    const nextHeader = headers[this.convertIndex(carouselIndex, 'next')];
    const prevHeader = headers[this.convertIndex(carouselIndex, 'prev')];
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
        <div className="game-container row test" key={e.productid} >
          <div className='game-img-container column-one-third row'>
            <img src={e.imageurl} alt="" className='game-img'/>
          </div>
          <div className='game-text-container'>
            <h4 className='game-title game-text'>{e.title}</h4>
            <p className='game-features game-text'>{e.features}</p>
            <div className='kbm-container game-text'>
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
                <div className="arrows-container">
                  <i className="fa-solid fa-chevron-left left-arrow arrows" onClick={this.handlePrev}/>
                  <i className="fa-solid fa-chevron-right right-arrow arrows" onClick={this.handleNext}/>
                </div>
                <div className="bg-carousel row">
                  <img src={prevHeader.imageurl} alt="" className='prev-carousel'/>
                  <img src={nextHeader.imageurl} alt="" className='next-carousel'/>
                </div>
              </div>
              <div className='best-sellers-container'>
                <div className="row">
                  <h4 className='best-sellers column-full'>Best Sellers</h4>
                </div>
                <div className='product-list row'>
                  {games}
                </div>
              </div>
            </div>
          </main>
        </div>
      );
    }
  }
}
export default Home;
