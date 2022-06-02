import React from "react";

const PopupWithForm = (props) => {
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id={props.popupId} >
            <div className={`popup__container ${props.containerClass}`}>
                <h3 className="popup__title">
                    {props.title}
                </h3>
                <form
                    className="popup__form"
                    id={props.formId}
                    name="form"
                    onSubmit={props.onSubmit}
                >
                    {props.children}
                    <button
                        className="popup__save-button"
                        type="submit"
                    >
                        {props.buttonText}
                    </button>
                </form>
                <button
                    className="popup__close-button"
                    id={props.closeId}
                    onClick={props.onClose}
                    type="button"
                />
            </div>
        </div>
    )
}

export default PopupWithForm;