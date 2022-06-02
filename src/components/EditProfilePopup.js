import React, { useState, useEffect } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = (props) => {

    // Объявляем стейт переменные 
    //const [userData, setUserData] = React.useState({ name: '', about: '' });

    // Подписываемся на контекст
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [about, setAbout] = useState('');

    // Подставляем значения
    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, props.isOpen])

    // Изменяем значения стейта
    function handleUserNameChange(evt) {
        evt.preventDefault();
        setName(evt.target.value);
    }

    function handleUserAboutChange(evt) {
        evt.preventDefault();
        setAbout(evt.target.value);
    }

    // Отправка формы
    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateUser({ name, about });
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            popupId="popup-edit-profile"
            formId="popup-profile-form"
            title="Редактировать профиль"
            buttonText="Сохранить"
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <div className="popup__input-container">
                <input id="username"
                    className="popup__input"
                    type="text"
                    placeholder="Имя"
                    name="username"
                    minLength="2"
                    maxLength="40"
                    value={name || ''}
                    onChange={handleUserNameChange}
                    required
                />
                <span id="error-username" className="popup__input-error" />
            </div>
            <input id="description"
                className="popup__input"
                type="text"
                placeholder="Профессиональная деятельность"
                name="about"
                minLength="2"
                maxLength="200"
                value={about || ''}
                onChange={handleUserAboutChange}
                required
            />
            <span id="error-description" className="popup__input-error" />
        </PopupWithForm>
    )
}

export default EditProfilePopup;