import React, {useEffect, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Symbols from "../../../../utility/helpers/Symbols";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  style: {
    width: '100%',
    marginTop: '2px'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: "#8e8b8b45",
  },
  gridItem: {
    maxWidth: "50%",
    cursor: 'pointer',
    flexGrow: '5',
    margin: "5px",
    paddingBottom: "5px",
    backgroundColor:'',
  },
  image: {
    width: "100px",
    height: "100px"
  },
  active: {
    backgroundColor:'#71afcc73'
  }
}));

const MoreForecastInfo =({newItem}) => {

  const classes = useStyles();

  return (
    <Paper style={{width:'100%'}} elevation={5} className={classes.paper}>
      <Typography variant="h4">
        {newItem?.dt_txt}
      </Typography>
      <Typography variant="h4">
        <img className={classes.image} src={`http://openweathermap.org/img/wn/${newItem?.weather[0].icon}.png`} alt=""/>
      </Typography>
      <Typography variant="h4">
        <span>{Math.floor(newItem?.main.temp)} <Symbols /></span>
      </Typography>
      <Typography variant="h4">
        <span>Max Temperature: {Math.floor(newItem?.main.temp_max)} <Symbols /></span>
      </Typography>
      <Typography variant="h4">
        <span>Min Temperature: {Math.floor(newItem?.main.temp_min)} <Symbols /></span>
      </Typography>
      <Typography variant="h4">
        <span>Description: {newItem?.weather[0].description}</span>
      </Typography>
      <Typography variant="h4">
        <span>Humidity: {Math.floor(newItem?.main.humidity)} %</span>
      </Typography>
      <Typography variant="h4">
        <span>Pressure: {Math.floor(newItem?.main.pressure)} hPa</span>
      </Typography>
      <Typography variant="h4">
        <span>Wind Spped: {Math.floor(newItem?.wind.speed)} m/s</span>
      </Typography>
    </Paper>
  )
};

export default MoreForecastInfo;
