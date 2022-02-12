import React, {useEffect} from 'react';
import Paper from "@material-ui/core/Paper";
import Symbols from '../../../../utility/helpers/Symbols';

const TabForecastDataItem = ({elem, setNewItem, index , classes , handleOpenMore , activeWeatherIndex}) => {

  useEffect(() => {
    if (activeWeatherIndex === index) {
      setNewItem(elem)
    }
  },[elem])

  return (
    <Paper onClick={() => handleOpenMore(elem, index)}
           className={`${classes.paper} ${activeWeatherIndex === index ? classes.active : ''} `}
           elevation={3}>{elem.dt_txt.slice(10)} <br/> <img
      src={`http://openweathermap.org/img/wn/${elem.weather[0].icon}.png`} alt=""/> <br/>
      <span>{Math.floor(elem.main.temp)} <Symbols /></span></Paper>
  )
};

export default TabForecastDataItem;
