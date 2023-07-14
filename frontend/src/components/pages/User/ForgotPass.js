import { useState, useContext } from 'react'
import Input from '../../form/Input'
import { Link } from 'react-router-dom'

import styles from '../../form/Form.module.css'

/* contexts */
import { Context } from '../../../context/UserContext'

/*icons*/
import { FaEnvelope } from 'react-icons/fa'


function ForgotPass() {
    const [email, setEmail] = useState("")

    const { forgotPass } = useContext(Context)
  
    function handleChange(e) {
      setEmail({ ...email, [e.target.name]: e.target.value })
    }
  
    function handleSubmit(e) {
      e.preventDefault()
      forgotPass(email)
     
    }
    return (
      <section className={styles.form_container}>
        <h1>Recuperar Senha</h1>
        <form onSubmit={handleSubmit}>
    
          <Input
            text="E-mail"
            type="email"
            name="email"
            placeholder="Digite o seu e-mail"
            handleOnChange={handleChange}
          />
          <ul className={styles.icons_envelope}>
          <li>
            <FaEnvelope/>
          </li>
        </ul>
          <input type="submit" value="Enviar" />
        </form>
        
        <p>
          Retornar <Link to="/login">Login</Link>
        </p>
      </section>
    )
  }
  
  export default ForgotPass