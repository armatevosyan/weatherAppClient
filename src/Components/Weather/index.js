import React from 'react';
import MenuAppBar from './header';
import {Route} from "react-router-dom";
import Routes from '../../Route/Route';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '70px 0 10px 7px'
  },
  typography : {
    color:'#000000b8'
  }
}));

const Weather = (props) => {
  const routeComponents = Routes.map(({path, component}, index) => <Route exact path={path} component={component} key={index} />);
  const classes = useStyles();
  const index = Routes.findIndex(elem => elem.path === props.location.pathname);

  return (
    <div className="background-style">
      <ToastContainer/>
      <MenuAppBar />
      <Grid container className={classes.root} fixed="">
        <Typography className={classes.typography} variant="h4">
          {Routes[index]?.name}
        </Typography>
      </Grid>
      {
        routeComponents
      }
    </div>
  )
}
export default Weather;
