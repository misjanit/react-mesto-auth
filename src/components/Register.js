import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

const Register = (props) => {

    // Делаем все по примеру из компонента Login

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleRegistration(e) {
        e.preventDefault();
        props.onRegistered({email, password})
    }

    return (
        <div className="login__container">
            <h3 className="login__title">Регистрация</h3>
            <form action="" className="login__form" onSubmit={handleRegistration}>
                <input
                    className="login__input"
                    placeholder="Email"
                    minLength="2"
                    maxLength="30"
                    type="email"
                    required
                    onChange={handleEmailChange}
                    value={email}
                />
                <input
                    className="login__input"
                    placeholder="Пароль"
                    minLength="2"
                    maxLength="30"
                    type="password"
                    required
                    onChange={handlePasswordChange}
                    value={password}
                />
                <button className="login__submit-register-button">Зарегистрироваться</button>
            </form>
            <div className="login__log-in-button-container">
                <Link to="sign-in">
                    <button className="login__log-in-button">Уже зарегистрированы? Войти</button>
                </Link>
            </div>
        </div>
    )
}

export default withRouter(Register);