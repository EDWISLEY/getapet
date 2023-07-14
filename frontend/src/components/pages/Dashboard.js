import api from '../../utils/api'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { Chart } from "react-google-charts";

/*import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";*/

import styles from './Dashboard.module.css'

function Dashboard() {
  const [pets, setPets] = useState([])
  const [authenticated, setAuthenticated] = useState(false)
  const [token] = useState(localStorage.getItem('token') || '')  
  
  //const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api.get('/pets').then((response) => {
      setPets(response.data.pets)
    })
  }, [])

      const data = [
  ["Element", "Density", { role: "style" }],  
  ["Copper", 8.94, "#b87333"], // RGB value
  ["Silver", 10.49, "silver"], // English color name
  ["Gold", 19.3, "gold"],
  ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
];




  useEffect(() => {       

        if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }

    api
      .get('/pets/', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets)
      })
  }, [token])






const data1 = [
  
  ["Task", "Hours per Day"],
  ["Pet Adotado", 11],
  ["Pet Cadastrado", 5],
  ["Pet pra Adoção", 5],
  ["Gat Adotado", 15],
  ["Gat Cadastrado", 9],
  ["Gat pra Adoção", 6],  
];
 
 const pieData = data.map((value, index) => ({
    value,
    key: `${index}-${value}`,
    svg:{
        fill: '#FF0000'
    }
 }));


 const options = {
  title: "Gráfico Pizza",
  is3D: true,

};


  

  return (
    <>
    
    
    <section>
      <div className={styles.pet_home_header}>
        <h1>Gráficos</h1>
        <p>Veja os detalhes de cada um e conheça o tutor deles</p>
      </div>
      <div className={styles.graficocolumn}>
      <Chart chartType="ColumnChart" width="600px" height="300px" data={data} />
      </div>    
      
    <div className={styles.graficopizza}>
    <Chart
      chartType="PieChart"
      data={data1}
      options={options}
      width={"600px"}
      height={"400px"}
    />
    </div>

    <Chart
        chartType="PieChart"
        data={pieData}
        options={options}
        width={"100%"}
        height={"400px"}        
     />
      <div className={styles.pet_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div className={styles.pet_card} key={pet._id}>
                <span className="bold">{pet.name}</span>
                {`pet/${pet._id}`}
              <div
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`,
                }}
                className={styles.pet_card_image}
              ></div>
              <h3>{pet.name}</h3>
              <p>
                <span className="bold">Peso:</span> {pet.weight}kg
              </p>
              {pet.available ? (
                <Link to={`/pet/${pet._id}`}>Mais detalhes</Link>
              ) : (
                <p className={styles.adopted_text}>Adotado!</p>
              )}
            </div>            
          ))}
          {pets.length > 0 &&
          pets.map((pet) => (
            <div className={styles.pet_card} key={pet._id}>
              <h3>{pet._id}</h3>
              <p>
                <span className="bold">Peso:</span> {pet.weight}kg
              </p>
              
            </div>       
            ))}
        {pets.length === 0 && (
          <p>Não há pets cadastrados ou disponíveis para adoção no momento!</p>
        )}
      </div>
    </section>
    </>
  )
}

export default Dashboard
