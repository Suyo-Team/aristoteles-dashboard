import { AppBar,Toolbar, Typography } from "@material-ui/core";
import React from "react";



const Navbar = () => {
  return (
      <div>
          <AppBar position="fixed" color="primary">
              <Toolbar>
                  <Typography variant="h6">

                  </Typography>
              </Toolbar>

             
          </AppBar>
      </div>

  );
};
export default Navbar;