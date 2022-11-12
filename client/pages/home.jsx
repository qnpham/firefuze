import React from 'react';
import Navbar from '../components/navbar';
import Loading from './loading';

class Home extends React.Component {
  constructor(props) {
    super(props);

    const device = window.innerWidth < 768 ? 'small' : 'regular';

    this.state = {
      device,
      headers: null,
      carouselIndex: 0,
      intervalId: null
    };
    this.autoscroll = this.autoscroll.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.routeChangeCurrent = this.routeChangeCurrent.bind(this);
  }

  componentDidMount() {

    fetch('http://localhost:3000/api/header/limit/6')
      .then(r => r.json())
      .then(r => {
        this.setState({ headers: r }, this.autoscroll);
      })
      .catch(r => console.error(r));

    window.addEventListener('resize', e => {
      const device = window.innerWidth < 768 ? 'small' : 'regular';
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

  routeChange(e) {
    const container = e.target.closest('.game-container');
    const id = container.getAttribute('id');
    window.location.hash = `id?${id}`;
  }

  routeChangeCurrent() {
    const { headers, carouselIndex } = this.state;
    window.location.hash = `id?${headers[carouselIndex].productid}`;
  }

  render() {
    const { headers, carouselIndex, device } = this.state;
    if (!headers) return <Loading />;

    const currentHeader = headers[carouselIndex];
    const nextHeader = headers[this.convertIndex(carouselIndex, 'next')];
    const prevHeader = headers[this.convertIndex(carouselIndex, 'prev')];
    const tabs = headers.map(e => {
      if (e.productid === currentHeader.productid) {
        return <span className='white tab' key={e.productid}>_</span>;
      }
      return <span className='gray tab' key={e.productid}>_</span>;
    });

    const games = headers.map(e => {
      const keyboard = e.supportkbm ? <i className="fa-solid fa-keyboard" /> : null;
      const mouse = e.supportkbm ? <i className="fa-solid fa-computer-mouse" /> : null;
      const controller = e.supportcontroller ? <i className="fa-solid fa-gamepad" /> : null;
      return (
        <div className="game-container row custom-column" key={e.productid} id={e.productid} onClick={this.routeChange} >
          <div className="column-one-third">
            <div className='game-img-container row'>
              <img src={e.imageurl} alt="" className='game-img'/>
            </div>
          </div>
          <div className="column-one-half">
            <div className="game-text ">
              <h4 className='game-title full-width'>{e.title}</h4>
              <p className='game-features full-width'>{e.features}</p>
              <div className='game-support full-width'>
                {keyboard}
                {mouse}
                {controller}
              </div>
            </div>
          </div>
          <div className="column-one-sixth">
            <p className='price'>${e.price}</p>
          </div>
        </div>
      );
    });

    if (device === 'small') {
      return (
        <div>
          <header>
            <Navbar />
          </header>
          <main>
            <div className="container">
              <div className="carousel-container row">
                <img src={currentHeader.imageurl} alt="" className='carousel' onClick={this.routeChangeCurrent}/>
                <div className="tabs">
                  {tabs}
                </div>
              </div>
              <div className='best-sellers-container side-padding'>
                <div className="row">
                  <h4 className='best-sellers column-full'>Best Sellers</h4>
                </div>
              </div>
              <div className='product-list side-padding'>
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
                <img src={currentHeader.imageurl} alt="" className='carousel' onClick={this.routeChangeCurrent} />
                <div className="tabs">
                  {tabs}
                </div>
                <div className="arrows-container">
                  <i className="fa-solid fa-chevron-left left-arrow arrows" onClick={this.handlePrev}/>
                  <i className="fa-solid fa-chevron-right right-arrow arrows" onClick={this.handleNext}/>
                </div>
                <div className="bg-carousel-container row">
                  <img src={prevHeader.imageurl} alt="" className='prev-carousel bg-carousel'/>
                  <img src={nextHeader.imageurl} alt="" className='next-carousel bg-carousel'/>
                </div>
              </div>
              <div className='best-sellers-container side-padding'>
                <div className="row">
                  <h4 className='best-sellers column-full'>Best Sellers</h4>
                </div>
              </div>
              <div className='product-list row side-padding'>
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
