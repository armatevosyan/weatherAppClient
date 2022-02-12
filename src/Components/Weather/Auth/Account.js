import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {findOneRequest} from "../../../Redux/Weather";
import Container from "@material-ui/core/Container";
import {Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const Account = () => {
  const {loggingIn, foundedUserData} = useSelector(state => state.weather)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(findOneRequest(loggingIn.token))
  }, []);
  const token ="Bearer " + localStorage.getItem("token")

  useEffect(() => {
    if (loggingIn.token === undefined) {
      dispatch(findOneRequest(token))
    }
  }, [token]);

  return (
    <Container >
      { foundedUserData.length === 0 ?  <Paper elevation={3}><Typography variant="h2">You Are Not Logged In.</Typography></Paper> :
        <Paper elevation={3}>
          <img src={foundedUserData?.user?.image} style={{alignSelf: 'center', height: '300px', width: '300px'}} alt={foundedUserData?.user?.name}/>

          <Typography variant="h2">
            name: {foundedUserData?.user?.name}
          </Typography>
          <Typography variant="h3">
            Last Name: {foundedUserData?.user?.lastName}
          </Typography>
        </Paper>
      }
    </Container>
  );
};

export default Account;
