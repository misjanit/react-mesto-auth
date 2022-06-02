import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {

    // Объявляем стейт переменные
    const [name, setName] = useState('')
    const [link, setLink] = useState('')

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    // Изменяем значение стейта названия карточки
    function handleCardNameChange(evt) {
        setName(evt.target.value);
    }

    // Изменяем значение стейта ссылки на картинку карточки
    function handleCardLinkChange(evt) {
        setLink(evt.target.value);
    }

    // Отправка формы
    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddPlace({ name, link });
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            popupId="popup-new-card"
            formId="popup-card-form"
            title="Новое место"
            buttonText="Сохранить"
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <div className="popup__input-container">
                <input id="title"
                    className="popup__input"
                    type="text"
                    placeholder="Название"
                    name="title"
                    minLength="2"
                    maxLength="40"
                    value={name}
                    onChange={handleCardNameChange}
                    required
                />
                <span id="error-title" className="popup__input-error" />
            </div>
            <input id="image"
                className="popup__input"
                type="url"
                placeholder="Ссылка на картинку"
                name="image"
                value={link}
                onChange={handleCardLinkChange}
                required
            />
            <span id="error-image" className="popup__input-error" />
        </PopupWithForm>
    )
}

export default AddPlacePopup;