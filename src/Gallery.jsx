import './Gallery.css';

const GalleryItem = ({ image, name, onCartClick }) => {
    return (
        <div className="gallery-item">
          <img src={image} alt={name} />
          <div className="item-content">
            <div className="item-text">
                <p>{name}</p>
            </div>
            <div className="item-icon" onClick={onCartClick}>
                <span className="gg-add-r"></span>
            </div>
          </div>
        </div>
    );
};

const Gallery = ({ galleryData, handleCart}) => {
    
    return (
        <div className="gallery">
          {galleryData.map((item) => (
            <GalleryItem
              key={item.id}
              image={item.image}
              name={item.name}
              onCartClick={() => handleCart(item.id)}
            />
          ))}
        </div>
    );
};

export default Gallery;