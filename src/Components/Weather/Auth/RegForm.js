import React, {useRef, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {createRegisterRequest} from "../../../Redux/Weather";
import Alert from './Alert';
import Loader from '../Loader';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'spaceBetween',
    flexDirection: 'column',
    marginTop: '10px',
    padding: '50px 120px'
  },
  field: {
    marginTop: '40px',
    width: '100%'
  },
  button: {
    marginTop: '40px'
  }
}));

const RegForm=()=> {
  const classes = useStyles();
  const dispatch = useDispatch();
  const regData = useRef({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const form = [
    {name: "name", label: "Name", variant: 'outlined'},
    {name: "lastName", label: "Last Name",variant: 'outlined'},
    {name: "email", label: "Email",variant: 'outlined'},
    {name: "password", label: "Password",variant: 'outlined', type: 'password'},
    {name: "confirmPassword", label: "Confirm Password",variant: 'outlined', type: "password"},
  ]

  const {regErrorMessages, isRegisteredFailure, isRegisteredSuccess, isRegistered} = useSelector(state => state.weather)

  const handleChange = (name, value) => {
    regData.current[name] = value
  }

  const handleChangeImage = (e) => {
    regData.current[e.target.name] = e.target.files[0]
  }


  const handleSignUp = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file",regData.current.image)
    formData.append("name",regData.current.name)
    formData.append("lastName",regData.current.lastName)
    formData.append("email",regData.current.email)
    formData.append("password",regData.current.password)
    formData.append("confirmPassword",regData.current.confirmPassword)

    dispatch(createRegisterRequest(formData));
  }
  return (
    <form  method="post" action="/create"  className={classes.root} noValidate autoComplete="off" onSubmit={(e)=>handleSignUp(e)} encType="multipart/form-data">
      {
        form.map(item => {
          return (
            <TextField
              key={item.name}
              autoComplete="on"
              name={item.name}
              className={classes.field}
              required
              id="filled-required"
              error={regErrorMessages?.length !== 0 && regErrorMessages?.message[0].context.key === item.name ? isRegisteredFailure : false}
              helperText={regErrorMessages?.length !== 0 && regErrorMessages?.message[0].context.key === item.name ? regErrorMessages?.message[0].message : ''}
              label={item.label}
              variant={item.variant}
              type={item.type}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          )
        })
      }
      <div>
        <TextField
          name="image"
          className={classes.field}
          required
          error={regErrorMessages?.length !== 0 && regErrorMessages?.message[0].context.key === "image" ? isRegisteredFailure : false}
          helperText={regErrorMessages?.length !== 0 && regErrorMessages?.message[0].context.key === "image" ? regErrorMessages?.message[0].message : ''}
          type="file"
          onChange={handleChangeImage}
        />
      </div>
      <ButtonGroup>
        <Button startIcon={ isRegistered ? <Loader /> : undefined} className={classes.button} variant="contained" color="primary" type="submit">sign Up</Button>
        <Button className={classes.button}><NavLink style={{textDecoration: 'none', color: 'black'}} to="/login">Have Account ?</NavLink></Button>
      </ButtonGroup>
      {
        isRegisteredSuccess ? <Alert /> :undefined
      }
    </form>
  );
}
export default RegForm
