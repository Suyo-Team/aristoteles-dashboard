import React from 'react';
import LoginForm from '../../Forms/Login/LoginForm';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      alignItems: "center",
      padding: '50px 500px 20px 500px',
      justify: "center",
      display: "flex",
          
    },
    bullet: {
      display: 'inline-block',
      margin: '5px',
      transform: 'scale(0.8)',
      
    },
    
    
  });
     


const Login = () =>{
    const classes = useStyles();
    return(
        <div className={classes.root} >
          <Card>
            <CardContent variant="outlined" >
            <LoginForm  />
            </CardContent>
           
          </Card>
        </div>
        
    )
}


export default Login