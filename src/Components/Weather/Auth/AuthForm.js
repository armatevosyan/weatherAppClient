import React, {useRef} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import {NavLink, useHistory} from "react-router-dom";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {useDispatch, useSelector} from "react-redux";
import {loggedInRequest} from "../../../Redux/Weather";
import Alert from './Alert';
import Loader from '../Loader';
import {Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
   display: 'flex',
    justifyContent: 'spaceBetween',
    flexDirection: 'column',
    marginTop: '10px',
    padding: '70px'
  },
  field: {
    marginTop: '40px'
  },
  button: {
    marginTop: '40px'
  }
}));

const AuthForm =() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {isLoggedSuccess,isLoggedFailure,isLogged,LoggingErrorMessages} = useSelector(state => state.weather)

  const loggingData = useRef({
    email: '',
    password: ''
  });

  const onChangeHandler = (e) => {
    const {name, value} = e.target
    loggingData.current[name] = value
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loggedInRequest(loggingData.current))
  }

  if (isLoggedSuccess) {
    setTimeout(()=> {
      history.push('/account');
    },1000)
  }

  return (
    <form action="/login" method="post" noValidate autoComplete="off" onSubmit={(e)=>onSubmitHandler(e)}>
      <div  className={classes.root}>
        <TextField
          autoComplete="on"
          id="outlined-search"
          label="Email"
          required
          name="email"
          error={LoggingErrorMessages?.length !== 0 && LoggingErrorMessages?.message[0]?.context?.key === 'email'? isLoggedFailure : false}
          helperText={LoggingErrorMessages?.length !== 0 && LoggingErrorMessages?.message[0]?.context?.key === 'email' ? LoggingErrorMessages?.message[0].message : ''}
          onChange={onChangeHandler}
          type="email"
          variant="outlined"
          className={classes.field}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          required
          name="password"
          onChange={onChangeHandler}
          variant="outlined"
          error={LoggingErrorMessages?.length !== 0 && LoggingErrorMessages?.message[0]?.context?.key === 'password'? isLoggedFailure : false}
          helperText={LoggingErrorMessages?.length !== 0 && LoggingErrorMessages?.message[0]?.context?.key === 'password' ? LoggingErrorMessages?.message[0].message : ''}
          autoComplete="current-password"
          className={classes.field}
        />
        <ButtonGroup>
          <Button startIcon={isLogged ? <Loader /> : undefined} className={classes.button} type="submit" variant="contained" color="primary">Log In</Button>
          <Button className={classes.button} variant="outlined" color="secondary"><NavLink style={{textDecoration: 'none', color: 'black'}} to='/registration'>Not Profile?</NavLink></Button>
        </ButtonGroup>
      </div>
      {
        isLoggedSuccess ? <Alert /> : <Typography>
          <Paper style={{backgroundColor:'red', color: 'white'}}>
            {/*{LoggingErrorMessages?.message}*/}
          </Paper>
        </Typography>
      }
    </form>
  );
}

export default AuthForm;
