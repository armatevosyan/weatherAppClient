import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import BusinessIcon from '@material-ui/icons/Business';
import {Divider, Paper} from "@material-ui/core";
import {
  addCity,
  deleteUserCityRequest,
  findOneRequest,
  getAllCitiesNameRequest,
  getFavoriteApiListRequest
} from "../../../../Redux/Weather";
import ModalAddCity from "./ModalAddCity";
import Button from '@material-ui/core/Button';
import {NavLink} from "react-router-dom";
import {toast} from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 360,
    backgroundColor: '#0e0e0e52',
    padding:'1px'
  },
  typography: {
    padding: '4px'
  },
  paper: {
    width: '100%',
    backgroundColor: '#bdb4b473',
    display:'flex',
    justifyContent:'space-between'
  },
}));

const FavoriteCitiesList =(props)=> {

  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  // const favoriteCity = useSelector(state=>state.weather.addedCity);
  const [open, setOpen] = useState(false);
  const unitsList = useSelector(state => state.weather.unitsList);
  const {isFoundedSuccess, gettingNames, deletedResponse} = useSelector(state => state.weather)
  const dispatch = useDispatch();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    const token =localStorage.getItem("token")
    if (gettingNames.length === 0) {
      dispatch(getAllCitiesNameRequest(token))
    }
  },[])

  const token ="Bearer " + localStorage.getItem("token")
  useEffect(() => {
    if (token !== undefined) {
      dispatch(findOneRequest(token))
    }
  }, [token]);

  const handleFavoriteRequest =(item) => {
    dispatch(addCity(item))
      dispatch(getFavoriteApiListRequest({unitsList, city:item}));
      props.history.push("/search");
  }

  const handleDelete = (id) => {
    dispatch(deleteUserCityRequest(id))
    if(deletedResponse)
    toast.success("Successful!")
  }

  return (
      <Paper elevation={5} className={classes.root}>
        { isFoundedSuccess ?
          <div>
            <Paper elevation={0} className={classes.paper}>
              <Typography variant="h6" component="p">
                Favorite City List
              </Typography>
              <Typography component="span">
                <ModalAddCity setOpen={setOpen} open={open}/>
              </Typography>
            </Paper>
            <List component="nav" aria-label="main mailbox folders">
              {
                gettingNames?.city?.map((item, index) => {
                  return (
                    <ListItem
                      key={index}
                      button
                      selected={selectedIndex === 0}
                      onClick={(event) => handleListItemClick(event, 0)}
                    >
                      <ListItemIcon>
                        <BusinessIcon/>
                      </ListItemIcon>
                      <ListItemIcon>
                        {item.id}
                      </ListItemIcon>
                      <ListItemText onClick={() => handleFavoriteRequest(item)} primary={item.cityName}/>
                      <ListItemIcon>
                        <Button onClick={() => handleDelete(item.id)}><DeleteForeverIcon/></Button>
                      </ListItemIcon>
                      <Divider/>
                    </ListItem>
                  )
                })
              }
            </List>
          </div> : <Button variant="outlined" color="primary"><NavLink style={{textDecoration: 'none', color: 'black'}} to="/login">Are You Logged IN ?</NavLink></Button>
        }
      </Paper>
  )
}

export default FavoriteCitiesList;
