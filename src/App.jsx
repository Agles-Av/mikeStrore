// el app.jsx es el componenete padre de toda la app 
import { useEffect, useReducer } from 'react';
import './output.css';
import 'animate.css';
import { authManager } from './config/context/auth-manager';
import AuthContext from './config/context/auth-context';
import AppRouter from './router/AppRouter';
 
const init = () => JSON.parse( //al cargar la app buscara un sesion y si no la encuentra es falsa
  //localStorega es una varibla global en la cual hace referencai de un apartado del navegador para guardar datos => String 
localStorage.getItem('user') // mueve datos, alamcena, CRUD, user es un nombre que le ponemos 
)|| {signed: false}; // si no obtiene user la sesión es falsa

function App() {
  const [user, dispatch] = useReducer( //dispatch es como un set 
    authManager, {}, init
  );

  //use se va a ejcutar una vez se haya renderizado el html y se va aseguir ejecutando cada que hay aun cambio en user
  useEffect(()=>{ // es una funcion que se activa en esta ocacio se activa con una funcion flecha 
    if(!user) return;
    localStorage.setItem("user",JSON.stringify(user)); // 
  }, [user]); // dentro de la funcio beto, el retorno es el que hace todas las funciones 


  return <AuthContext.Provider //es el padre
  value={{dispatch,user}}>
    <AppRouter
    
    />
  </AuthContext.Provider>
}

export default App
