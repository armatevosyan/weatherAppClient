import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import WeatherItem from './WeatherItem';
import Loader from '../../Loader';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import {findOneRequest, getWeatherRequest} from '../../../../Redux/Weather';
import Box from "@material-ui/core/Box";
import ErrorAlert from '../../ErrorAlert';
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  image: {
    height: '60px',
    width: '60px',
  },
  paper: {
    height: '450px',
    width: '300px',
    background: '#27262659',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5px'
  },
  control: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    display: "flex",
    justifyContent: "center"
  },
}));

const WeatherTable = (props) => {

  const dispatch = useDispatch();
  const classes = useStyles();
  const {weatherList, isGettingWeatherSuccess} = useSelector(state => state.weather);
  const weatherDataFailure = useSelector(state => state.weather.isGettingWeatherFailure);
  // const unitsList = useSelector(state => state.weather.unitsList);

  const token ="Bearer " + localStorage.getItem("token")
  useEffect(() => {
    if (token !== undefined) {
      dispatch(findOneRequest(token))
    }
  }, [token]);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position)=> {
        dispatch(getWeatherRequest({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          units: "standard",
          forecast: false,
        }));
    }, (err)=> console.log(err));
  }, []);

  const handleSearch =()=> {
    props.history.push('/favoriteWeather')
  }

  return (
    <Container maxWidth="lg" style={{margin: "auto"}} className={classes.control}>
      <Grid container spacing={2}>
        {
          weatherDataFailure ? <ErrorAlert/> :
          <Grid container className={classes.root} spacing={2}>
            <Grid item>
              {
                isGettingWeatherSuccess ? <WeatherItem weatherList={weatherList}/> :
                  <Box style={{width: '500px'}} item>
                    <Loader/>
                  </Box>
              }
            </Grid>
          </Grid>
        }
      </Grid>
      { isGettingWeatherSuccess &&
        <Grid container>
          <Grid item>
            <Button startIcon={<SearchIcon/>} variant="contained" color="secondary" onClick={handleSearch}>Search
              City</Button>
          </Grid>
        </Grid>
      }
    </Container>
  )
}

export default WeatherTable;
