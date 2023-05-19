export const Modal = ({ imageURL, closeModal }) => {
    
    return (
    <div className="Overlay" onClick={closeModal}>
        <div className="Modal">
            <img src={imageURL} alt="full" />
        </div>
    </div>  
      
    );
}
