import React from "react";
import { Button, InputLabel, Box, TextField } from "@material-ui/core";
import logo from "../../../img/logo.jpg";
import {Link} from "react-router-dom";

const LoginForm = () => {
  return (
    <form>
      <Box textAlign="center">
        <img src={logo} width="280px" height="180px"></img>
        <h1>ARISTOTELES</h1>
        <h2 align="center">
          <font color="#4000FF">Ingresa a tu cuenta</font>
        </h2>
      </Box>
      <div>
        <TextField
          id="email"
          label="Correo Eletronico:"
          variant="outlined"
          color="primary"
          style={{ width: 300, margin: "5px" }}
        />
      </div>

      <div>
        <TextField
          id="passwordl"
          label="Contraseña:"
          variant="outlined"
          color="primary"
          style={{ width: 300, margin: "5px" }}
        />
      </div>

      <Box textAlign="center">
        <Link to="/Dashboard">
        <Button variant="contained" color="primary" style={{ margin: "10px" }}>
          Ingresar
        </Button>
        </Link>
      </Box>
      <Box textAlign="center">
        <InputLabel style={{ color: "#4000FF" }}>
          ¿Olvidaste la contraseña?
        </InputLabel>
      </Box>
    </form>
  );
};
export default LoginForm;
