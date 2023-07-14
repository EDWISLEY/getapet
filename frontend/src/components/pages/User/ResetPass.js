import { useState, useContext } from 'react'
import Input from '../../form/Input'
import { Link } from 'react-router-dom'

import styles from '../../form/Form.module.css'

/* contexts */
import { Context } from '../../../context/UserContext'

function ResetPass() {
  const [password, setPassword] = useState({})
  const { resetPass } = useContext(Context)

  function handleChange(e) {
    setPassword({ ...password, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(password)
    resetPass(password)

  }

  return (
    <section className={styles.form_container}>
      <h1>Alterar sua Senha</h1>
      <form onSubmit={handleSubmit}>

      <Input
          text="Token Recebido"
          type="text"
          name="usertoken"
          placeholder="Token Recebido"
          handleOnChange={handleChange}
        />

        <Input
          text="Nova senha"
          type="password"
          name="password"
          placeholder="Digite a sua nova senha"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirme a sua senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme a sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Alterar" />
      </form>
      <p>
        Login <Link to="/login">Clique aqui.</Link>
      </p>
    </section>
  )
}

export default ResetPass