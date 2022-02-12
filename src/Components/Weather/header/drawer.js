import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import BusinessIcon from '@material-ui/icons/Business';
import List from '@material-ui/core/List';
import {Divider, ListItem, ListItemIcon, ListItemText, MenuItem} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import {NavLink} from "react-router-dom";
import WbSunnyIcon from '@material-ui/icons/WbSunny';

const useStyles = makeStyles({
  list: {
    width: "auto",
  },
  fullList: {
    width: 'auto',
  },
  inactive: {
    color: '#757575',
    textDecoration: 'none',
    display: 'flex'
  },
  active: {
    color: '#757575',
    textDecoration: 'none',
    display: 'flex'
  },
  menuIcon: {
    cursor: 'pointer',
  },
});

export default function TemporaryDrawer() {

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({...state, [anchor]: open});
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <NavLink activeClassName={classes.active} className={classes.inactive} exact={true}  to="/">
          <ListItem button>
            <ListItemIcon primary="Home"><HomeIcon/></ListItemIcon>
            <ListItemText primary="Home"/>
          </ListItem>
        </NavLink>
        <Divider/>
        <NavLink activeClassName={classes.active} className={classes.inactive} exact={true} to="/forecast">
          <ListItem button>
            <ListItemIcon><WbSunnyIcon/></ListItemIcon>
            <ListItemText primary="5 Day Forecast Weather"/>
          </ListItem>
        </NavLink>
        <Divider/>
        <NavLink activeClassName={classes.active} className={classes.inactive} exact={true} to="/favorite">
          <ListItem button>
            <ListItemIcon><BusinessIcon/></ListItemIcon>
            <ListItemText primary=" Favorite Cities Weather"/>
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon onClick={toggleDrawer(anchor, true)} className={classes.menuIcon} />
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
