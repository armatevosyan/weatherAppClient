import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import {addCity, getFavoriteApiListRequest, getFavoriteCity} from "../../../../Redux/Weather";
import {useDispatch, useSelector} from "react-redux";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  box: {
    height:''
  }
}));

const FavoriteCities = (props) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const unitsList = useSelector(state => state.weather.unitsList);
  const [cityData, setCityData] = useState({
    city:'',
    units:'standard'
  });

  const handleChange = (e) => {
    const upper =  e.target.value.charAt(0).toUpperCase()+ e.target.value.slice(1);
    setCityData({
      city: upper,
    });
  };

  const handleSubmit =(e)=> {
    e.preventDefault();
    dispatch(addCity(cityData.city))
    setCityData({city:'', exclude: ''});
    if(cityData.city !== ''){
      dispatch(getFavoriteApiListRequest({city:cityData.city,unitsList}));
    }
    props.history.push('/search');
  };

  useEffect(() => {
    if (cityData.city !== '') {
      dispatch(getFavoriteCity(cityData.city));
    }
  }, [cityData]);

  const handleBack = () => {
    props.history.push('/')
  }

  return (
    <Box display="flex" className={classes.box} flexDirection="column" alignItems="center" mt={7}>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={e=> handleSubmit(e)}>
        <TextField onChange={handleChange} id="outlined-basic" label="Search City" required variant="outlined" />
        <ButtonGroup size="large">
          <Button startIcon={<SearchIcon />} type="submit" variant="contained" color="primary">Search</Button>
          <Button onClick={handleBack} variant="contained" color="secondary">Back Home</Button>
        </ButtonGroup>
      </form>
    </Box>
  );
};

export default FavoriteCities;
