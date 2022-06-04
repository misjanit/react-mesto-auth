import React from "react";

const InfoToolTip = ({isOpen, onClose, isRegistered}) => {
    return (
        <>
            <div className={`popup ${isOpen && 'popup_opened'}`}>
                <div className="popup__container">
                    <div className={isRegistered ? 'popup__successful-registration' : 'popup__unsuccessful-registration'} />
                    <h3 className="popup__title popup__title_registration">{isRegistered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h3>
                    <button
                        className="popup__close-button"
                        onClick={onClose}
                        type="button"
                    />
                </div>
            </div>
        </>
    )
}

export default InfoToolTip;