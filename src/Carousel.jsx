import { Component } from 'react';

class Carousel extends Component {
   state = {
      active: 0,
   };

   static defaultProps = {
      images: ['http://pets-images.dev-apis.com/pets/none.jpg'],
   };

   // arrow functions don't create new scope, so "this" will capture carousel
   // dataset catches anything with 'data-' in front
   handleIndexClick = (e) => {
      // the + turns a string into a number because dom returns strings always
      this.setState({ active: +e.target.dataset.index });
   };

   render() {
      const { active } = this.state;
      const { images } = this.props;

      return (
         <div className="carousel">
            <img src={images[active]} alt="animal" />
            <div className="carousel-smaller">
               {images.map((photo, index) => (
                  // eslint-disable-next-line
                  <img
                     data-index={index}
                     key={photo}
                     onClick={this.handleIndexClick}
                     src={photo}
                     className={index === active ? 'active' : ''}
                     alt="animal thumbnail"
                  />
               ))}
            </div>
         </div>
      );
   }
}

export default Carousel;
