import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {useDispatch, useSelector} from "react-redux";
import {findOneRequest, getWeatherForecastRequest, helperUtilities} from "../../../../Redux/Weather";
import MoreForecastInfo from "./MoreForecastInfo";
import TabForecastDataItem from "./TabForecastDataItem";
import Loader from "../../Loader";
import ErrorAlert from "../../ErrorAlert";

function TabPanel(props) {

  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  style: {
    width: '100%',
    marginTop: '2px'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: "#8e8b8b45",
  },
  gridItem: {
    maxWidth: "50%",
    cursor: 'pointer',
    flexGrow: '5',
    margin: "5px",
    paddingBottom: "5px",
    backgroundColor: '',
  },
  image: {
    width: "100px",
    height: "100px"
  },
  active: {
    backgroundColor: '#71afcc73'
  }
}));

const TabForecastDays = (props) => {

  const classes = useStyles();
  const weatherDataObj = [
    {weatherData: 'weatherDataOne', active: 1},
    {weatherData: 'weatherDataTwo', active: 2},
    {weatherData: 'weatherDataThree', active: 3},
    {weatherData: 'weatherDataFor', active: 4},
    {weatherData: 'weatherDataFive', active: 5},
  ];
  const weatherForecastFiveDays =
    ["weatherDataOne", "weatherDataTwo", "weatherDataThree", "weatherDataFor", "weatherDataFive"];
  const [value, setValue] = useState(0);
  const [activeTab, setActiveTab] = useState(1);
  const [activeWeatherIndex, setActiveWeatherIndex] = useState(0);
  const [isMore, setIsMore] = useState(true);
  const [newItem, setNewItem] = useState();
  const weatherForecastDate = useSelector(state => state.weather.forecastWeatherDataObj);
  const weatherForecastSuccess = useSelector(state => state.weather.isGettingForecastWeatherSuccess);
  const userForecastData = useSelector(state => state.weather.helperUtilitiesList);
  const userForecastFailure = useSelector(state => state.weather.isGettingForecastWeatherFailure);
  const unitsList = useSelector(state=>state.weather.unitsList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token") !== undefined) {
      dispatch(findOneRequest("Bearer " + localStorage.getItem("token")))
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if(userForecastData) {
      dispatch(getWeatherForecastRequest(userForecastData));
    } else if (unitsList !== undefined) {
      dispatch(getWeatherForecastRequest(unitsList))
    }
  }, [userForecastData]);


  const handleOpenTab = (item) => {
    setActiveWeatherIndex(0);
    weatherForecastFiveDays.forEach((obj, index) => {
      if (new Date(weatherForecastDate && weatherForecastDate[obj][0].dt * 1000).getDate() === parseInt(item, 10)) {
        setActiveTab(index + 1);
      }
    });
  };

  const handleOpenMore = (item, index = 0) => {
    setNewItem(item);
    setActiveWeatherIndex(index);
    weatherForecastFiveDays.forEach((obj, index) => {
      if (new Date(weatherForecastDate && weatherForecastDate[obj][0].dt * 1000).getDate() === new Date(item && item.dt * 1000).getDate()) {
        setIsMore(true);
      }
    });
  };

  return (
    <Box className={classes.root} mt={5}>
      {
        userForecastFailure ? <ErrorAlert/> :
          <Paper className={classes.paper} elevation={3}>
            <AppBar position="static" color="default" style={{zIndex: '0'}}>
              <Tabs
                className={classes.style}
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
                aria-label="full width tabs example"
              >
                {
                  weatherForecastDate?.weatherDates?.map((item, index) => {
                    return <Tab onClick={() => handleOpenTab(item)} key={index}
                                label={item} {...a11yProps(index)}/>
                  })
                }
              </Tabs>
            </AppBar>
            { weatherForecastSuccess ?
              <>
                <Grid container justify="center" className={classes.style} spacing={5}>
                  {
                    weatherDataObj.map(elem =>
                      activeTab === elem.active && weatherForecastDate?.[elem.weatherData]?.map((elem, index) => {
                        return (
                          <Grid item className={classes.gridItem} key={index} xs={1}>
                            <TabForecastDataItem setNewItem={setNewItem} activeWeatherIndex={activeWeatherIndex} elem={elem} index={index}
                                                 handleOpenMore={handleOpenMore} classes={classes}/>
                          </Grid>
                        )
                      })
                    )
                  }
                </Grid>
                <div>
                  {
                    isMore &&
                    <MoreForecastInfo newItem={newItem}/>
                  }
                </div>
              </> : <Loader/>
            }
          </Paper>
      }
    </Box>
  )
}

export default TabForecastDays;
