export const ImageGalleryItem = ({ data, onClick }) => {  
    return (
      <>
        {data.map(image => (
          <li className="ImageGalleryItem" key={image.id}>
            <img
              onClick={onClick}
              className="ImageGalleryItem-image"
              src={image.webformatURL}
              alt={image.user}
              data-full={image.largeImageURL}
            ></img>
          </li>
        ))}
      </>
    );
}
