function ImagePopup(props) {
  return (
  <div className={`popup popup_image ${props.card && 'popup_active'}`}>
      <div className="popup__image-container">
        <button className="popup__close-button button" onClick={props.onClose}></button>
        <img className="popup__image-photo" src={props.card && props.card.link}  alt='изображение'/>
        <p className="popup__image-description">{props.card && props.card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;