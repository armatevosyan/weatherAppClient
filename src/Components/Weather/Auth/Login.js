import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import AuthForm from './AuthForm';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  paper: {
    backgroundColor: '#e0e0e0'
  }
}));
const LoginPage = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" >
      <div className={classes.root}>
        <Typography variant="h3">Log In</Typography>
        <Paper elevation={3} className={classes.paper}>
          <AuthForm />
        </Paper>
      </div>
    </Container>
  );
};

export default LoginPage;
