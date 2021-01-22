import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import Logos from "src/components/Logo2";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "src/components/Page";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "90%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const Autentiacion = async (datos) => {
  

    const login = await axios.post(
      "http://localhost:8000/api-token-auth/",
      datos,
    );

    const token = login.data.token;
    await AsyncStorage.setItem('rkok', token)
    if (token) navigate("/app/dashboard", { replace: true, rkok: token });
  
  };

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Ingrese un email válido")
                .max(255)
                .required("Email es requerido"),
              password: Yup.string().max(255).required("Password es requerido"),
            })}
            onSubmit={Autentiacion}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={1} align="center">
                  <Logos />
                  <Typography color="textPrimary" variant="h1" align="center">
                    ARISTOTELES
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography color="textPrimary" variant="h2" align="center">
                    Ingresa a tu Cuenta
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Correo "
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Contraseña"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Ingresar
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                  align="center"
                >
                  {/* <Link component={RouterLink} to="/register" variant="h6">
                    ¿ Olvidaste la contraseña?
                  </Link> */}
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
