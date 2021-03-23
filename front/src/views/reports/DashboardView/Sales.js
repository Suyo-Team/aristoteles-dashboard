import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
 
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Config from 'src/utils/config';


const useStyles = makeStyles(() => ({
  root: {
    width: "150%",  
   },

}));

const Sales = ({ className, titulo, ruta, id, is_public,   ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [publico, setPublico] = useState(is_public);
 
  const handlePublic = (dato)=> {
    setPublico(dato)
   
  }


 
  const Compartir = async (datos,is_public) => {
    const token = await AsyncStorage.getItem('rkok');
    console.log("Valor public", is_public);

    let estado;

    if(!is_public)
      estado = true
    else
      estado = false

    const Objeto =  {
      "is_public": estado
     
    }

    handlePublic(estado)

    const Modificar = await axios.post(
      `${Config.app.api_root}/dashboards/${datos}/share/`, (Objeto),

      {
        headers: {
          Authorization: `JWT ${token}`
        }
      }
    
    );
 
    !estado? alert(`Tu Dashboard ya no es publico`):alert(`Tu Dashboard es publico, Esta es tu Ruta: ${ruta}`)

      return estado

    };

 
  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };
 

  



  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}      
    >
      <CardHeader
        // action={(
        //   <Button
        //     endIcon={<ArrowDropDownIcon />}
        //     size="small"
        //     variant="text"
        //   >
        //    {titulo}
        //   </Button>
        // )}
        title={titulo}
      />
      <Divider />
      <CardContent >
      <iframe 
      src={ruta}
      position="absolute"
      top="0"
      left="0"
      width="100%"
      height="100%"
       >
       </iframe>
      </CardContent>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={3}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          onClick={()=> Compartir(id, publico)} 
        >
          {publico?'Descompartir':'Compartir'}

        </Button>
      </Box>
    </Card>
  );
};

Sales.propTypes = {
  className: PropTypes.string
};

export default Sales;
