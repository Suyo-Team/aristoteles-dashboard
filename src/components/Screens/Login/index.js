import React from "react";
import LoginForm from "../../Forms/Login/LoginForm";
import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,

    padding: "30px 350px 20px 350px",

    display: "flex",
    justifyContent: "center",
  },
});

const Login = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card>
        <CardContent variant="outlined">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
