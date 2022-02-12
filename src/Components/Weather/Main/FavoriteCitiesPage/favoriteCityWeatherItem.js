import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import {useDispatch, useSelector} from "react-redux";
import ErrorAlert from "../../ErrorAlert";
import Loader from "../../Loader";
import Symbols from "../../../../utility/helpers/Symbols";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

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


const FavoriteCityWeatherItem = (props) => {

  const {
    favoriteApiList: favoriteApiDataList,
    isGettingFavoriteListFailure,
    isGettingFavoriteListSuccess
  } = useSelector(state => state.weather);
  const classes = useStyles();

  const handleBack = () => {
    props.history.push('favorite')
  }

  return (
    <Container>
      <Box m={5}>
        <Button onClick={handleBack} variant="contained" color="secondary">Back To List</Button>
      </Box>
      <Grid container spacing={5}>
        {
          isGettingFavoriteListFailure ? <ErrorAlert/> :
            <>
              {
                isGettingFavoriteListSuccess ?
                  favoriteApiDataList?.list.map((item) =>(
                      <Grid key={item.dt_txt} item xs={3}>
                        <Paper variant="outlined" className={classes.paper} elevation={4}>
                          {<>
                            <Typography variant="h4" color="textPrimary" component="p">
                              {favoriteApiDataList?.city?.name},
                            </Typography>
                            <Typography variant="h6" color="textPrimary" component="p">
                              {item.dt_txt},
                            </Typography>
                            <img className={classes.image} alt="Remy Sharp"
                                 src={`http://openweathermap.org/img/wn/${item?.weather[0]?.icon.toString()}.png`}/>
                            <Typography variant="h6" color="textPrimary">
                              Temperature: <span>{`${Math.floor(item?.main.temp)}`}
                              <Symbols/> {`${item?.weather[0].description}, ${item?.weather[0].main}`}</span>
                            </Typography>
                            <Typography variant="h6" color="textPrimary">
                              Humidity: <span>{`${Math.floor(item?.main.humidity)}`} %,</span>
                            </Typography>
                            <Typography variant="h6" color="textPrimary">
                              Pressure: <span>{`${Math.floor(item?.main.pressure)}`} hPa,</span>
                            </Typography>
                            <Typography variant="h6" color="textPrimary">
                              Maximum Temperature: <span>{`${Math.floor(item?.main.temp_max)}`} <Symbols/>,</span>
                            </Typography>
                            <Typography variant="h6" color="textPrimary">
                              Minimum Temperature: <span>{`${Math.floor(item?.main.temp_min)}`} <Symbols/>,</span>
                            </Typography>
                            <Typography variant="h6" color="textPrimary">
                              Wind Speed: <span>{`${Math.floor(item?.wind.speed)}`} m/s,</span>
                            </Typography>
                            <Typography variant="h6" color="textPrimary">
                              Sea Level: <span>{`${Math.floor(item?.main.sea_level)}`} km,</span>
                            </Typography>
                          </>
                          }
                        </Paper>
                      </Grid>
                    )
                  ) : <Loader/>
              }
            </>
        }
      </Grid>
    </Container>
  );
};
export default FavoriteCityWeatherItem;
