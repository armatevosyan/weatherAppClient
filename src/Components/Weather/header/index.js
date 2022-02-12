import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import TemporaryDrawer from "./drawer";
import Button from '@material-ui/core/Button';
import {NavLink, useHistory} from 'react-router-dom';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import {
  setUnitsList,
} from "../../../Redux/Weather";
import {useDispatch, useSelector} from "react-redux";
import Avatar from "@material-ui/core/Avatar";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    paddingTop: '60px'
  }
}));

const MenuAppBar = (props)=> {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElA, setAnchorElA] = useState(null);
  const history = useHistory()
  const {isFoundedSuccess, isLoggedSuccess, helperUnits, selectedCity, foundedUserData} = useSelector(state => state.weather)
  const [units, setUnits] = useState({
    city:selectedCity,
    units:'standard',
    lat: '',
  });

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = (event) => {
    setAnchorElA(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElA(null);
  };

  const handleChange = (event) => {
    setUnits({
      units: event.target.value
    });
    dispatch(setUnitsList({
      lat : helperUnits?.lat,
      lon: helperUnits?.lon,
      city: selectedCity,
      units: event.target.value
    }));
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    history.push('/login')
    window.location.reload();
    setAnchorEl(null);
    setAnchorElA(null);
  }

  return (
    <AppBar position="fixed">
      <Toolbar>
          <div onClick={handleMenu}>
            <TemporaryDrawer />
          </div>
        <IconButton
          aria-label="contained"
          color="secondary"
        >
        </IconButton>
        <NavLink style={{textDecoration:"none", color:"white"}} to="/">
          <Typography variant="h6" className={classes.title}>
            Search And Watch Weather
          </Typography>
        </NavLink>
        <Typography variant="h6" className={classes.title}>
        </Typography>
          <FormControl className={classes.formControl}>
            <InputLabel >Units</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={units.units}
              onChange={handleChange}
            >
              <MenuItem value={'standard'}>Kelwin</MenuItem>
              <MenuItem value={'metric'}>Celsius</MenuItem>
              <MenuItem value={'imperial'}>Fahrenheit</MenuItem>
            </Select>
          </FormControl>
          <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <Avatar style={{alignSelf: 'center'}} alt={foundedUserData?.user?.name} src={foundedUserData?.user?.image} />
            </Button>
            { isFoundedSuccess || isLoggedSuccess ?
              <Menu
                id="simple-menu"
                anchorEl={anchorElA}
                keepMounted
                open={Boolean(anchorElA)}
                onClose={handleClose}
              >
                <NavLink style={{textDecoration:"none", color:"black"}} to='/'><MenuItem onClick={handleClose}>Profile</MenuItem></NavLink>
                <NavLink style={{textDecoration:"none", color:"black"}} to='/account'><MenuItem onClick={handleClose}>My account</MenuItem></NavLink>
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
              </Menu>
              :
              <Menu
              id="simple-menu"
              anchorEl={anchorElA}
              keepMounted
              open={Boolean(anchorElA)}
              onClose={handleClose}
              >
              <NavLink style={{textDecoration:"none", color:"black"}} to='/login'><MenuItem onClick={handleClose}>Sign In</MenuItem></NavLink>
              <NavLink style={{textDecoration:"none", color:"black"}} to='/registration'><MenuItem onClick={handleClose}>Sign Up</MenuItem></NavLink>
              </Menu>
            }
          </div>
      </Toolbar>
    </AppBar>
  );
};

export default  MenuAppBar;
