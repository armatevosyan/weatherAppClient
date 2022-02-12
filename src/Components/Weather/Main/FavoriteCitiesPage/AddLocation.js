import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useDispatch, useSelector} from "react-redux";
import { addCityRequest, getFavoriteApiListRequest} from "../../../../Redux/Weather";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import Loader from '../../Loader';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function BasicTextFields({handleClose, setOpen}) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const {isGettingFavoriteListSuccess, isGettingFavoriteListFailure, isGettingFavoriteList} = useSelector(state => state.weather)
  const [value, setValue] = useState({
    city: '',
  });

  const [error, setError] = useState({
    error: null,
    label:'',
    helperText: ''
  });

  useEffect(() => {
    setValue({
      city:'',
      token: localStorage.getItem("token"),
    })
  }, []);

  const handleChange =(e) => {
   const upper =  e.target.value.charAt(0).toUpperCase()+ e.target.value.slice(1);
    setValue({
      city: upper,
      token: value.token,
      unitsList: {
        units: 'standard'
      }
    });
  };

  useEffect(() => {
    if (value.city !== '') {
      if (isGettingFavoriteListSuccess) {
        setError({
          error: false,
          helperText: "Correct",
          label: 'Correct City'
        })
        dispatch(addCityRequest({city: value.city, token: value.token}));
        setOpen(false)
      }
      if(isGettingFavoriteListFailure) {
        setError({
          error: true,
          helperText: "Write Correct",
          label: 'Wrong !'
        })
        setOpen(true)
      }
    }
  }, [isGettingFavoriteList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getFavoriteApiListRequest(value))

    }

  return (
    <form className={classes.root} noValidate onSubmit={(e)=>handleSubmit(e)}>
      <TextField
        onChange={(e)=>handleChange(e)}
        id="outlined-basic"
        variant="outlined"
        autoComplete="on"
        label={error.label}
        helperText={error.helperText}
        error={error.error}
      />
      <DialogActions>
        <Button startIcon={isGettingFavoriteList ? <Loader /> : undefined} disabled={isGettingFavoriteList} type="submit" variant="contained" color="primary">
          Save
        </Button>
        <Button onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </form>
  );
}
