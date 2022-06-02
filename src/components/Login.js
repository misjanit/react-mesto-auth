import {useState} from "react";

const Login = (props) => {

    // Объявили переменные состояния
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Создали функции, подставляющие актуальные значения и обновляющие переменные состояния
    function handleEmailChange(e) {
        setEmail(e.target.value)
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    // Создаем функцию реакцию на сабмит, которая перебрасывает на функцию логина в app
    function handleAuthorization(e) {
        e.preventDefault();
        props.onAuthorization({email, password})
    }

    return (
        <div className="login__container">
            <h3 className="login__title">Вход</h3>
            <form className="login__form" onSubmit={handleAuthorization}>
                <input
                    className="login__input"
                    placeholder="Email"
                    minLength="2"
                    maxLength="30"
                    type="email"
                    onChange={handleEmailChange}
                    value={email}
                />
                <input
                    className="login__input"
                    placeholder="Пароль"
                    minLength="2"
                    maxLength="30"
                    type="password"
                    onChange={handlePasswordChange}
                    value={password}
                />
                <button className="login__submit-register-button">Войти</button>
            </form>
        </div>
    )
}

export default Login;