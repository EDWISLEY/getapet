import api from '../../../utils/api'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './Dashboard.module.css'

import RoundedImage from '../../layout/RoundedImage'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'


/* icons */
import * as FaIcon from 'react-icons/fa'


function MyPets() {
  const [authenticated, setAuthenticated] = useState(false)
  const [token] = useState(localStorage.getItem('token') || '')
  const [pets, setPets] = useState([])
  
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {       

        if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }

    api
      .get('/pets/mypets', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets)
      })
  }, [token]) 

  
  async function removePet(id) {
    let msgType = 'success'

    const data = await api
      .delete(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedPets = pets.filter((pet) => pet._id !== id)
        setPets(updatedPets)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message, msgType)
  }

  async function concludeAdoption(id) {

    let msgType = 'success'

    const data = await api
      .patch(`/pets/conclude/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message, msgType)    

    return { authenticated }

  }
 

  return (
    <section>
      <div className={styles.petslist_header}>
        <h1>Meus Pets Cadastrados</h1>      
          <Link to="/pet/add">Cadastrar Pet</Link>        
      </div>
      <div className={styles.petlist_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet._id} className={styles.petlist_row}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                alt={pet.name}
                width="px75"
              />
              <span className="bold">{pet.name}</span>
              <div className={styles.actions}>
                {pet.available ? (
                  <>
                    {pet.adopter && (
                      <button
                        className={styles.conclude_btn}
                        onClick={() => {
                          concludeAdoption(pet._id)
                        }}
                      ><onmouseover title="Concluir adoção"><FaIcon.FaCheck className={styles.icon}/></onmouseover>                        
                      </button>
                    )}                    
                    <Link className={styles.actions} to={`/pet/edit/${pet._id}`}><onmouseover title="Editar"><FaIcon.FaEdit className={styles.icon}/></onmouseover></Link>                    
                    <button
                      onClick={() => {
                        removePet(pet._id)
                      }}
                    ><onmouseover title="Excluir"><FaIcon.FaTrashAlt className={styles.icon}/></onmouseover>
                     
                    </button>
                  </>
                ) : (
                  <p>Pet já adotado</p>
                )}
              </div>
            </div>
          ))}
        {pets.length === 0 && <p>Ainda não há pets cadastrados!</p>}
      </div>
    </section>
  )

}

export default MyPets