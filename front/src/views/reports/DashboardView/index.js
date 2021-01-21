import React, {useState, useEffect} from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Sales from './Sales';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = ({rkok}) => {
  const classes = useStyles();
  const [dash, setDash] = useState([])
  const [isDash, setIsDash] = useState(false)

  const obtenerToken = async () => {
    const token = await AsyncStorage.getItem('rkok')

    console.log("Este es el token: ", token)
    const dashboard = await axios.get(
      "http://localhost:8000/dashboards/",
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
          spacing={3}
        >
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            {
              dash.map(dash => (
              <> 
                <Sales titulo={dash.name} ruta={dash.url}  /> 
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
