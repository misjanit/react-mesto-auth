import React from "react";

const InfoToolTip = (props) => {
    return (
        <>
            <div className={`popup ${props.isOpen && 'popup_opened'}`}>
                <div className="popup__container">
                    <div className={props.isSuccessfulRegistered ? 'popup__successful-registration' : 'popup__unsuccessful-registration'} />
                    <h3 className="popup__title popup__title_registration">{props.isSuccessfulRegistered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h3>
                    <button
                        className="popup__close-button"
                        id={props.closeId}
                        onClick={props.onClose}
                        type="button"
                    />
                </div>
            </div>
        </>
    )
}

export default InfoToolTip;