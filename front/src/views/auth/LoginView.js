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
    //console.log(datos);

    const login = await axios.post(
      "http://localhost:8000/api-token-auth/",
      datos,
    );
    const token = login.data.token;
    if (token) navigate("/app/dashboard", { replace: true, rkok: token });
    else console.log("Contraseña inválida");

    // // Verificar token
    // const verifi_token = await axios.post(
    //   "http://localhost:8000/api-token-verify/",
    //   objeto,
    // );
    // console.log(verifi_token);
    // console.log(login.data.token);

    // Obtemos los dahsboard

    const dash = await axios.get("http://localhost:8000/dashboards/", {
      headers: {
        //`WWW-Authenticate: Basic realm='api'`
        Authorization: `JWT ${token}`,
      },
    });
    console.log("info: ", dash);
    /*const dashboard = await axios.get(
      "http://localhost:8000/dashboards/",
      login.data.token,
    );
    console.log("Información de dash", dashboard.data);*/
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
              email: "demo@devias.io",
              password: "Password123",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
              password: Yup.string().max(255).required("Password is required"),
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
                  <Link component={RouterLink} to="/register" variant="h6">
                    ¿ Olvidaste la contraseña?
                  </Link>
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
