import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

const Main = (props) => {

    /* Подписываемся на контекст */
    const currentUser = React.useContext(CurrentUserContext);
    const { name, about, avatar } = currentUser;

    return (
        <main className="content" style={{ minHeight: "100vh" }} >
            <section className="profile">
                <div className="profile__info">
                    <button
                        className="profile__avatar-container"
                        title="Изменить Аватар"
                        type="button"
                        onClick={props.onEditAvatar}>
                        <img
                            src={avatar}
                            className="profile__avatar"
                            alt={name}
                        />
                    </button>
                    <div className="profile__card">
                        <div className="profile__rename">
                            <h1 className="profile__name">{name}</h1>
                            <button
                                className="profile__edit-button"
                                type="button"
                                onClick={props.onEditProfile} />
                        </div>
                        <p className="profile__description">{about}</p>
                    </div>
                    <button className="profile__add-button" type="button" onClick={props.onAddPlace} />
                </div>
            </section>
            <section className="elements">
                {props.cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}

                        link={card.link}
                        name={card.name}

                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                ))}
            </section>
        </main>
    )
}

export default Main;