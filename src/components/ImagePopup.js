const ImagePopup = (props) => {
    return (
        <div
            className={`popup ${props.card && 'popup_opened'}`} id="popup-modal">
            <div className="popup__modal">
                <div
                    className="popup__container popup__container_modal">
                    <img
                        src={props.card ? props.card.link : ''}
                        className="popup__image"
                        alt={props.card ? props.card.name : ''}
                    />
                    <h3 className="popup__description">{props.card ? props.card.name : ''}</h3>
                </div>
                <button
                    className="popup__close-button"
                    id="close-window-popup"
                    type="button"
                    onClick={props.onClose}
                />
            </div>
        </div>
    )
}

export default ImagePopup;