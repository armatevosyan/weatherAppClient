import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Symbols from '../../../../utility/helpers/Symbols';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    backgroundColor: '#8e8b8b45'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    background: "transparent",
  },
}));

const WeatherItem = (props)=> {

  const { weatherList } = props;

  const classes = useStyles();
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const timeCurrent = today.getHours() + ":" + today.getMinutes();
  const sunrise = new Date(weatherList?.weather?.sunrise * 1000);
  const timestr = sunrise.toLocaleTimeString();
  const sunset = new Date(weatherList?.weather?.sunset * 1000);
  const timeset = sunset.toLocaleTimeString();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <img src={`http://openweathermap.org/img/wn/${weatherList?.weather?.icon}.png`} alt=""/>
          </Avatar>
        }
        title={
          <Typography variant="h3">
            {weatherList?.weather?.cityName}
          </Typography>
        }
        subheader={`${date} , ${timeCurrent}`}
      />
      <CardContent>
        <Typography variant="h5" color="textSecondary">
          Temperature:  <span>{Math.floor(weatherList?.weather?.temp)} <Symbols /> , {weatherList?.weather?.description}</span>
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Maximum temperature: <span>{Math.floor(weatherList?.weather?.maxTemp)}<Symbols /> </span>
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Minimum temperature: <span>{Math.floor(weatherList?.weather?.minTemp)} <Symbols /></span>
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Humidity:  <span>{Math.floor(weatherList?.weather?.humidity)} % </span>
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Pressure:  <span>{Math.floor(weatherList?.weather?.pressure)} hPa</span>
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Sunrise:  <span>{weatherList?.weather?.sunrise}, {timestr}</span>
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Sunset:  <span>{weatherList?.weather?.sunset}, {timeset}</span>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton color="secondary" aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton color="secondary" aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
export default WeatherItem;
