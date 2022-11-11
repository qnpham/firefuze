import React from 'react';
import Navbar from '../components/navbar';

class detail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      intervalId: null,
      carouselIndex: 0,
      game: null,
      screenshots: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/game/1')
      .then(r => r.json())
      .then(r => {
        this.setState({ game: r });
      })
      .catch(r => console.error(r));

    fetch('http://localhost:3000/api/screenshots/1')
      .then(r => r.json())
      .then(r => {
        this.setState({ screenshots: r }, this.autoscroll);
      })
      .catch(r => console.error(r));
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
    const { game, screenshots, carouselIndex } = this.state;
    if (!game || !screenshots) return null;
    const currentScreenshot = screenshots[carouselIndex];
    const tabs = screenshots.map(e => {
      if (e.imageid === currentScreenshot.imageid) {
        return <span className='white tab' key={e.imageid}>_</span>;
      }
      return <span className='gray tab' key={e.imageid}>_</span>;
    });
    return (
      <div>
        <header>
          <Navbar/>
        </header>
        <main>
          <div className='container'>
            <div className="carousel-container row">
              <img src={currentScreenshot.imageurl} alt="" className='screenshot-carousel'/>
              <div className="tabs">
                {tabs}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
export default detail;
