import React from 'react';
import Loading from './loading';

class detail extends React.Component {
  constructor(props) {
    const device = window.innerWidth < 768 ? 'small' : 'regular';
    super(props);
    this.state = {
      intervalId: null,
      carouselIndex: 0,
      game: null,
      screenshots: null,
      device
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    const gameId = this.props.id;

    fetch(`/api/game/${gameId}`)
      .then(r => r.json())
      .then(r => {
        this.setState({ game: r });
      })
      .catch(r => console.error(r));

    fetch(`/api/screenshots/${gameId}`)
      .then(r => r.json())
      .then(r => {
        this.setState({ screenshots: r }, this.autoscroll);
      })
      .catch(r => console.error(r));

    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    clearInterval(this.state.intervalId);
  }

  handleResize() {
    const device = window.innerWidth < 768 ? 'small' : 'regular';
    if (this.state.device !== device) {
      this.setState({ device });
    }
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
    const { screenshots } = this.state;
    if (conversion === 'next') {
      index++;
      if (index === screenshots.length) {
        index = 0;
      }
    } else if (conversion === 'prev') {
      index--;
      if (index === -1) {
        index = screenshots.length - 1;
      }
    }
    return index;
  }

  render() {
    const { game, screenshots, carouselIndex, device } = this.state;
    if (!game || !screenshots) return <Loading />;

    const currentScreenshot = screenshots[carouselIndex];
    const keyboard = game.supportkbm ? <i className="fa-solid fa-keyboard" /> : null;
    const mouse = game.supportkbm ? <i className="fa-solid fa-computer-mouse" /> : null;
    const controller = game.supportcontroller ? <i className="fa-solid fa-gamepad" /> : null;
    const tabs = screenshots.map(e => {
      if (e.imageid === currentScreenshot.imageid) {
        return <span className='white tab' key={e.imageid}>_</span>;
      }
      return <span className='gray tab' key={e.imageid}>_</span>;
    });

    const ss = screenshots.map(e => {
      return <img src={e.imageurl} alt="" className='screenshot' key={e.imageid}/>;

    });

    if (device === 'small') {
      return (
        <div className='container'>
          <div className="carousel-container row">
            <img src={currentScreenshot.imageurl} alt="" className='ss-carousel'/>
            <div className="tabs">
              {tabs}
            </div>
          </div>
          <div className="detail-text-container">
            <h3 className='detail-title'>{game.title}</h3>
            <p className='detail-description'>{game.description}</p>
            <div className="detail-extra">
              <div className="developer">
                <span className='label'>Developed by:</span>
                <span className='value'>{game.developer}</span>
              </div>
              <div className="publisher">
                <span className='label'>Published by:</span>
                <span className='value'>{game.publisher}</span>
              </div>
              <div className="supported">
                <span className='label'>Supported:</span>
                <span className='value supported-icons'>{keyboard} {mouse} {controller}</span>
              </div>
              <div className='detail-price-container'>
                <h3 className='detail-price'>${game.price}</h3>
              </div>
              <div className='add-to-cart-container row'>
                <a href="#" className='add-to-cart' onClick={() => { this.props.addCartHandler(this.props.id); }}> ADD TO CART</a>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='container'>
          <div className="row detail-container">
            <div className="screenshot-container">
              {ss}
            </div>
            <div className="detail-text-container">
              <div className='detail-title-container row'>
                <h3 className='detail-title column-full'>{game.title}</h3>
                <div className="line"/>
              </div>
              <div className='detail-price-container'>
                <h3 className='detail-price'>${game.price}</h3>
              </div>
              <div className='add-to-cart-container row'>
                <a className='add-to-cart' onClick={() => { this.props.addCartHandler(this.props.id); }}> ADD TO CART</a>
              </div>
              <p className='detail-description'>{game.description}</p>
              <div className="detail-extra">
                <div className="developer">
                  <span className='label'>Developed by:</span>
                  <span className='value'>{game.developer}</span>
                </div>
                <div className="publisher">
                  <span className='label'>Published by:</span>
                  <span className='value'>{game.publisher}</span>
                </div>
                <div className="supported">
                  <span className='label'>Supported:</span>
                  <span className='value supported-icons'>{keyboard} {mouse} {controller}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      );
    }
  }
}
export default detail;
