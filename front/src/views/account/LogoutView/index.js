import React, {useEffect} from 'react';
import { Link as RouterLink, useNavigate } from "react-router-dom";

import AsyncStorage from '@react-native-async-storage/async-storage'; 


const LogoutView = () => {
    const navigate = useNavigate();
    
    useEffect(()=>{
        const Desconexion = async () =>{
            const elim = await AsyncStorage.removeItem('rkok')

            navigate("/login");
         }
         Desconexion()

    })
   
    return(
        <>
        </>
    )


}

export default LogoutView;