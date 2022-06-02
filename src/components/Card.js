import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = (props) => {

    // Подписываемся на контекст
    const currentUser = React.useContext(CurrentUserContext);

    // Достаем нужные переменные из пропс
    const { name, link, likes, owner } = props.card;

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = owner._id === currentUser._id;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = likes.some(i => i._id === currentUser._id);

    // Нажатие на карточку
    function handleClick() {
        props.onCardClick(props.card);
    }

    // Нажатие на лайк
    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    // Нажатие на удаление
    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <article className="element">
            <div className="element__container">
                <button className="element__modal" id="open-modal" type="button">
                    <img
                        src={link}
                        className="element__image"
                        alt={name}
                        onClick={handleClick} />
                </button>
                <button
                    className={isOwn ? `element__delete-container` : `element__delete-container_hidden`}
                    type="button"
                    onClick={handleDeleteClick}
                >
                    <div className="element__trash" />
                </button>
            </div>
            <div className="element__description">
                <h2 className="element__title">{name}</h2>
                <div className="element__like-container">
                    <button
                        className={isLiked ? `element__like-active` : `element__like`}
                        type="button"
                        onClick={handleLikeClick}
                    />
                    <span className="element__like-number">{likes.length}</span>
                </div>
            </div>
        </article>
    )
}

export default Card;