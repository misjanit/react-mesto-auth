import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {

  // Хук useRef
  const refAvatar = useRef('')

  useEffect(() => { refAvatar.current.value = '' }, [props.isOpen]);

  // Отправка формы
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(
      refAvatar.current.value
    )
  };

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      popupId="popup-change-avatar"
      formId="popup-change-avatar-form"
      containerClass="popup__container_change-avatar"
      title="Обновить аватар"
      buttonText='Сохранить'
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatarLink"
        className="popup__input"
        type="url"
        placeholder="Ссылка на картинку"
        name="avatarLink"
        ref={refAvatar}
        required
        defaultValue=""
      />
      <span id="error-avatarLink" className="popup__input-error" />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;