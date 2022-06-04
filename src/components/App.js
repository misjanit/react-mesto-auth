import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {
  const history = useHistory();

  // создаем стейт переменные
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({ name: '', link: '', about: '' });
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // для того чтобы отобразить иконку и текст в тултиле
  const [email, setEmail] = useState('');
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);

  /* Получаем массив карточек и данные пользователя */
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([res, cards]) => {
          setCurrentUser(res);
          setCards(cards);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  /* Переключатели состояния */
  const handleEditAvatarClick = () => { setIsEditAvatarPopupOpen(true) };
  const handleEditProfileClick = () => { setIsEditProfilePopupOpen(true) };
  const handleAddPlaceClick = () => { setIsAddPlacePopupOpen(true) };
  const handleCardClick = (card) => { setSelectedCard(card) };

  // Закрытие попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoToolTipOpen(false);
  };

  // запрос на обновление информации пользователя
  function handleUpdateUser(inputValues) {
    api.editProfile(inputValues.name, inputValues.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  // запрос на обновление аватара
  function handleUpdateAvatar(avatarLink) {
    console.log(avatarLink)
    api.editAvatar(avatarLink)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  // Поставить лайк
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  // Удаление карточек
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((prevState) => prevState.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => console.log(err))
  }

  // Добавление карточек
  function handleAddPlaceSubmit(card) {
    api.addCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  /* Логика авторизации */

  // Зарегистрироваться
  function handleRegister({ email, password }) {
    auth.registration(email, password)
      .then(() => {
        setIsRegistered(true);
        setIsInfoToolTipOpen(true);
        history.push('/sign-in')
      })
      .catch((err) => {
        setIsRegistered(false);
        setIsInfoToolTipOpen(true);       
        console.log(err);
      })
  };

  const handleLogin = ({ email, password }) => {
    auth.authorization(email, password)
      .then((res) => {
        // Если успешно авторизовался - открываем доступ
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setEmail(email);
        history.push('/')
      })
      // Если неуспешно - попап с ошибкой
      .catch((err) => {
        setIsInfoToolTipOpen(true);
        setIsRegistered(false);
        console.log(err);
      })
  };

  // Проверить токен
  useEffect(() => {
    const tokenCheck = () => {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        auth.checkTokenValidity(jwt)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              setEmail(res.data.email);
              history.push('/');
            }
          })
          .catch((err) => console.log(err))
      }
    };
    tokenCheck();
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser} >

      <div className='page'>

        <Header email={email} onSignOut={handleSignOut} />

        <Switch>

          <ProtectedRoute
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            loggedIn={loggedIn}
            exact
            path="/"
          />

          <Route path="/sign-in">
            <Login onAuthorization={handleLogin} />
          </Route>

          <Route path="/sign-up">
            <Register onRegistered={handleRegister} />
          </Route>

          <PopupWithForm
            popupId="popup-agreement-to-delete"
            containerClass="popup__container_delete"
            title="Вы уверены?"
            buttonText="Да"
          />

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>

        </Switch>

        <InfoToolTip
          isOpen={isInfoToolTipOpen}
          onRegistered={isRegistered}
          onClose={closeAllPopups}
          isRegistered={isRegistered}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />


      </div>

      <Footer />

    </CurrentUserContext.Provider >
  )
}

export default App;