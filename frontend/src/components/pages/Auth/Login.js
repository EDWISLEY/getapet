import { useState, useContext } from 'react'
import Input from '../../form/Input'
import { Link } from 'react-router-dom'

import styles from '../../form/Form.module.css'

/* contexts */
import { Context } from '../../../context/UserContext'

/*icons*/
import * as FaIcon from 'react-icons/fa'


function Login() {
  //localStorage.removeItem('token')

  const [user, setUser] = useState({})
  const { login } = useContext(Context)

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(user)
  }

  return (
    <section className={styles.form_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o e-mail"
          handleOnChange={handleChange}
        />
        <ul className={styles.icons_envelope}>
          <li>
            <FaIcon.FaEnvelope/>
          </li>
        </ul>
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a senha"
          handleOnChange={handleChange}
        />
        <ul className={styles.icons_key}>
          <li>
            <FaIcon.FaUnlock />
          </li>
        </ul>
        <input type="submit" value="Entrar" />
      </form>
      <p>
        Esqueceu sua senha? <Link to="/forgotpassword">Clique aqui.</Link>
      </p>
      <p>
        Não tem conta? <Link to="/register">Clique aqui.</Link>
      </p>
    </section>
  )
}

export default Login
