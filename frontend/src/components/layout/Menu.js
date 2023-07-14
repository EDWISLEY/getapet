import { Link } from 'react-router-dom'
import React, { useContext, useState  } from 'react'
import Logo from '../../assets/img/logo.png'



/*icons*/
import { FaBars } from 'react-icons/fa'
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons/lib";

/* contexts */
import { Context } from '../../context/UserContext';

import styled from "styled-components";



//Menu fixo da NAVBAR  
const Nav = styled.div`
  max-width: 2600px;
  width: 100%;
  background: rgb(41, 41, 241);
  position: fixed;
  top: 0;  
  height: 80px;
  display: flex;  
  align-items: center;
  justify-content: space-between;  
  
  img{
    margin-top: 5px;
    margin-left: 0;    
    height: 50px;
    width: 40px;
    margin-right: .8em;
    border-radius: 5px;

  }

  h2{
    color: #FFF;
    margin-left: -1510px;
  }


  ul {
  display: flex;
  align-items: center;
  list-style: none;
  }


  li, a {    
    font-size: 18px;
    text-decoration: none;
    list-style: none;
    color: #FFF;
    font-weight: bold;
    margin-left: 10px;
    align-items: center;
    justify-content: space-between;  
    cursor: pointer;
    transition: .5s;
    padding: .4em .6em;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  
}


  li:hover{    
    margin-left: 5px;
    background-color: rgb(224, 10, 10);
    color: #FFF;
  }

li > a:hover{    
    margin-left: 5px;
    color: #FFF;
  }

  @media screen and (max-width: 850px){

  ul{
      display: none;
    }

  img{
    margin-left: 0;
  }

  }  
  
`;
 

const NavIcon = styled(Link)`//É NESSE AQUI PRA MEXER    

  display: none;  

  @media screen and (max-width: 850px){    
    display: block;
    top: 0;
    margin-top: 0 20px;
    width: 20px;
    height: 80px;    
    justify-content: flex-start;
    align-items: center;
    margin-left: 20px;
    font-size: 25px; 
  }    

`;
  

//Tela quando clica no MENU
const SidebarNav = styled.nav`  
  background: rgb(41, 41, 241);  
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;  
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;  
  display: none;
  

  
  @media screen and (max-width: 850px){

    display: block;    
    
    li{      
      margin-left: 40px
    }   

    
     li, a {    
  top: 0;
  font-size: 18px;
  text-decoration: none;
  list-style: none;
  color: #FFF;
  font-weight: bold;  
  align-items: center;  
  justify-content: space-between;  
  cursor: pointer;
  transition: .5s;
  padding: .5em .10em;  
  margin-bottom: 15px;  
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  
}

  li:hover{    
    margin-left: 15px;
    margin-right: 15px;
    background-color: rgb(224, 10, 10);
    color: #FFF;
    border-left: 5px solid #FFF;
  }

li > a:hover{    
    margin-left: 10px;
    color: #FFF;
  }   

  }
  
`;  
  
const SidebarWrap = styled.div`
  width: 100%;
`;


const Menu = () => {

  const [sidebar, setSidebar] = useState(false);
  
  const showSidebar = () => setSidebar(!sidebar);


  const { authenticated, logout } = useContext(Context);
  

   return (    
       <>    
       <IconContext.Provider value={{ color: "#fff" }}>        
        <Nav>
          <NavIcon to="#">
            <FaBars style={{marginTop: 20, left: 10, height: 30, width: 30}} onClick={showSidebar} />
          </NavIcon>
            <div>
              <Link to="/"><img src={Logo} alt="SRM - Sistema de Reserva Multimídia"/></Link>
            </div>
      <ul>
        <li>
          <Link to="/">Adotar</Link>
        </li>
        {authenticated ? (
          <>            
            <li>
              <Link to="/pet/myadoptions">Minhas Adoções</Link>
            </li>
            <li>
              <Link to="/pet/mypets">Meus Pets</Link>
            </li>
            <li>
              <Link to="/user/profile">Meu Perfil</Link>
            </li>
            <li>
              <Link onClick={logout}>Sair</Link>
            </li>            
          </>
        ) : (
          <>
            <li>
            <Link to="/login">Entrar</Link>
            </li>
            
          </>
        )}
      </ul >                                
        </Nav>          
          <SidebarNav sidebar={sidebar}>            
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose style={{marginTop: 20, left: 10, height: 35, width: 35}} onClick={showSidebar} />
            </NavIcon>
            <ul>
        <li>
          <Link to="/">Adotar</Link>
        </li>
        {authenticated ? (
          <>          
            <li>
              <Link to="/pet/myadoptions">Minhas Adoções</Link>
            </li>
            <li>
              <Link to="/pet/mypets">Meus Pets</Link>
            </li>
            <li>
              <Link to="/user/profile">Meu Perfil</Link>
            </li>
            <li onClick={logout}>Sair</li>                                   
          </>
        ) : (
          <>
            <li>
            <Link to="/login">Entrar</Link>
            </li>            
          </>
        )}
      </ul >
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>    
    </>     
  );
  
};


export default Menu;