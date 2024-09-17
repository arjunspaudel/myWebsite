import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';

// Dynamically import all images from the 'about' folder
const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('../Images/about', false, /\.(png|jpe?g|svg)$/));

const About = () => {
  const [autoplay, setAutoplay] = useState(true);
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    swipe: true,
    touchMove: true,
    arrows: false, // Remove default arrows
    appendDots: dots => (
      <div style={{ position: 'absolute', top: '50px', width: '100%' }}>
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    sliderRef.current.touchStartX = touch.clientX;
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - sliderRef.current.touchStartX;

    if (deltaX > 50) {
      sliderRef.current.slickPrev();
    } else if (deltaX < -50) {
      sliderRef.current.slickNext();
    } else {
      setAutoplay(!autoplay);
    }
  };

  return (
    <div className="p-.1 mt-.1 flex flex-col-reverse lg:flex-row">
      <div className="lg:w-1/3 lg:pr-4 mb-8 lg:mb-0">
        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Slider ref={sliderRef} {...settings}>
            {images.map((image, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden mb-0 lg:mb-0">
                <img src={image} alt={`Slide ${index + 1}`} className="w-full h-100 lg:h-screen object-cover" style={{ objectPosition: 'top' }} />
              </div>
            ))}
          </Slider>
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {/* Step Backward Button */}
            <button
              className="bg-white text-black p-2 rounded-full"
              onClick={() => sliderRef.current.slickPrev()}
            >
              <FaStepBackward size={24} />
            </button>
            {/* Pause/Play Button */}
            <button
              onClick={() => setAutoplay(!autoplay)}
              className="bg-white text-black p-2 rounded-full"
            >
              {autoplay ? <FaPause size={24} /> : <FaPlay size={24} />}
            </button>
            {/* Step Forward Button */}
            <button
              className="bg-white text-black p-2 rounded-full"
              onClick={() => sliderRef.current.slickNext()}
            >
              <FaStepForward size={24} />
            </button>
          </div>
        </div>
      </div>
      <div className="lg:w-2/3 lg:px-16 mb-4 lg:mb-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">About me</h1>
        <div className="bg-lightOrange p-4 rounded-lg mb-4">
          <p className="text-base md:text-lg lg:text-xl text-justify">
            Hi! I'm Arjun, born and raised in the beautiful landscapes of Nepal. At 20, I packed my bags and embarked on a life-changing journey to Finland to pursue a Bachelor's degree in Mechanical Engineering. What started as an academic adventure turned into a deep love for this serene, Nordic country. It was both exciting and challenging, but Finland quickly became my second home.
          </p>
        </div>
        <div className="bg-lightOrange p-4 rounded-lg mb-4">
          <p className="text-base md:text-lg lg:text-xl text-justify">
            When I'm not tinkering with engineering concepts, you'll find me traveling, camping, and hitting the open road during Finland's endless summer days. Whether it's exploring hidden gems or taking long road trips under the midnight sun, the thrill of discovery keeps me moving.
          </p>
        </div>
        <div className="bg-lightOrange p-4 rounded-lg">
          <p className="text-base md:text-lg lg:text-xl text-justify">
            I'm always ready for the next adventure—whether it's solving an engineering problem or planning my next big trip. Thanks for stopping by and getting to know a bit about me!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
