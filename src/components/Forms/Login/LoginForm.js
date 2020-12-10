import React from 'react';
import {Button, Input} from '@material-ui/core';
import logo from '../../../img/logo.jpg';


const LoginForm = () =>{
  

    return(
         
            <form>
                <div>
                    <img src={logo} width="200px" height="200px"></img>
                    <h2 >Ingresa a tu cuenta</h2>
                    <div>
                       <label htmlFor="email">Correo Eletronico: </label>
                       
 
                    </div>
                    <input
                        type="email"
                         name="email"
                        id="email"
                        ></input>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña: </label>
                        
                    </div>
                    <input 
                         type="password" 
                        name="password" 
                        id="password" 
                    ></input>
                    <div>
                        <Button variant="contained" color="primary">Ingresar</Button>
                    </div>
                </div>
                
                
            </form>  
     

        
    )
}
export default LoginForm;