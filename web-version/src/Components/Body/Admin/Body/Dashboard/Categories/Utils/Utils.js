import { Carousel } from "react-bootstrap";

export const ImageSliderPreview = ({ images }) => {
  return (
    <div className="slider-container">
      <Carousel className="categories-slider">
        {images.map((image, index) => {
          const imageUrl =
            process.env.REACT_APP_REMOTE_ADDRESS + "/files/" + image.imageUrl;
          return (
            <Carousel.Item key={index}>
              <div style={{ height: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  className="slider-image"
                  src={imageUrl}
                  alt={image.title || "Slider Image"}
                />
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};
