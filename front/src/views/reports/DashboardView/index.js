import React, {useState, useEffect} from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from 'src/utils/config';

import { Items, Content } from './Sale'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const { API_ROOT } = process.env;

const Dashboard = ({rkok}) => {
  const classes = useStyles();
  const [dash, setDash] = useState([])
  const [isDash, setIsDash] = useState(false)
  

  const obtenerToken = async () => {
    const token = await AsyncStorage.getItem('rkok')

    console.log("Este es el token: ", token)
    const dashboard = await axios.get(
      `${Config.app.api_root}/dashboards/`,
     {
       headers: {
         Authorization: `JWT ${token}`
       }
     }
    );
    console.log(dashboard.data.results)

    if(dashboard.data.results.length>0){
     setDash(dashboard.data.results)
     setIsDash(true)
    }
  }

 
  
  useEffect(()=> {

    if(!isDash)
    obtenerToken()
  },[isDash]);
 

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={1}
        >
          <Grid
            item
            xs
          >
            {
              dash.map(dash => (
              <> 
              <Items title={dash.name} url={dash.url} >
                <Content titulo={dash.name} ruta={dash.url} id={dash.id} is_public={dash.is_public} />
              </Items>
                <br></br> 
              </>
              
            ))}
            
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
