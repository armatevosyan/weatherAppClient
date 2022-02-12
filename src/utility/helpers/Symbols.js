import React from 'react';
import {useSelector} from "react-redux";

const Symbols = () => {
  const units = useSelector(state => state.weather.unitsList);
     if (units?.units === 'standard') {
       return <span>K</span>
     } else if (units?.units === 'metric') {
       return <span>&#8451;</span>
     } else if (units?.units === 'imperial') {
       return <span>&#8457;</span>
     } else {
       return <span>K</span>
     }
};
export default Symbols;
