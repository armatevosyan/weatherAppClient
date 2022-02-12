import {handleActions} from 'redux-actions';
import handlers from '../../utility/helpers/weatherData'

import {
  getWeatherRequest,
  getWeatherSuccess,
  getWeatherFailure,
  getWeatherForecastSuccess,
  getWeatherForecastRequest,
  getWeatherForecastFailure,
  getFavoriteApiListRequest,
  getFavoriteApiListFailure,
  getFavoriteApiListSuccess,
  getFavoriteCity,
  helperUtilities,
  setUnitsList,
  addCity,
  createRegisterRequest,
  createRegisterSuccess,
  createRegisterFailure,
  loggedInRequest,
  loggedInSuccess,
  loggedInFailure,
  findOneRequest,
  findOneSuccess,
  findOneFailure,
  addCityRequest,
  addCitySuccess,
  addCityFailure,
  getAllCitiesNameRequest,
  getAllCitiesNameSuccess,
  getAllCitiesNameFailure,
  deleteUserCityRequest,
  deleteUserCitySuccess,
  deleteUserCityFailure
} from './actions';

const initialState = {
  weatherLists: [],
  weatherList:[],
  isGettingWeather: false,
  isGettingWeatherSuccess: false,
  isGettingWeatherFailure: false,
  favoriteApiList: [],
  forecastList: [],
  unitsList:{},
  addedCity:'',
  favoriteCityList:[],
  helperUtilitiesList:{},
  errorMessages: '',
  isRegistered: false,
  isRegisteredSuccess: false,
  isRegisteredFailure: false,
  regErrorMessages: [],
  loggingIn: [],
  isLogged: false,
  isLoggedSuccess: false,
  isLoggedFailure: false,
  LoggingErrorMessages: '',
  foundedUserData: [],
  isFoundedSuccess: false,
  isFoundedFailure: false,
  foundedErrorMessage: '',
  isGettingNameSuccess: false,
  isGettingNameFailure: false,
  gettingNamesErrorMessage: '',
  gettingNames: [],
  isDeletingNameSuccess: false,
  isDeletingNameFailure: false,
  deletingNamesErrorMessage: '',
  deletedResponse: []
}
const reducer = handleActions({
  [getWeatherRequest]: (state) => {
    return {
      ...state,
      isGettingWeather: true,
      isGettingWeatherSuccess: false,
      isGettingWeatherFailure: false,
    }
  },
  [getWeatherSuccess]: (state, {payload}) => ({
    ...state,
    weatherList: payload,
    isGettingWeather: false,
    isGettingWeatherSuccess: true,
    isGettingWeatherFailure: false
  }),
  [getWeatherFailure]: (state, {payload}) => ({
    ...state,
    isGettingWeather: false,
    isGettingWeatherSuccess: false,
    isGettingWeatherFailure: true,
    errorMessages: payload
  }),
  [getFavoriteApiListRequest]: (state, {payload}) => ({
    ...state,
    isGettingFavoriteList: true,
    isGettingFavoriteListSuccess: false,
    isGettingFavoriteListFailure: false,
  }),
  [getFavoriteApiListSuccess]: (state, {payload}) => ({
    ...state,
    favoriteApiList: payload,
    isGettingFavoriteList: false,
    isGettingFavoriteListSuccess: true,
    isGettingFavoriteListFailure: false
  }),
  [getFavoriteApiListFailure]: (state, {payload}) => ({
    ...state,
    isGettingFavoriteList: false,
    isGettingFavoriteListSuccess: false,
    isGettingFavoriteListFailure: true,
    errorMessages: payload
  }),
  [getWeatherForecastRequest]: (state, {payload}) => ({
    ...state,
    isGettingForecastWeather: true,
    isGettingForecastWeatherSuccess: false,
    isGettingForecastWeatherFailure: false,
  }),
  [getWeatherForecastSuccess]: (state, {payload}) => ({
    ...state,
    forecastList: payload,
    isGettingForecastWeather: false,
    isGettingForecastWeatherSuccess: true,
    isGettingForecastWeatherFailure: false,
    forecastWeatherDataObj: handlers.getForecastWeatherData(payload.list)
  }),
  [getWeatherForecastFailure]: (state, {payload}) => ({
    ...state,
    isGettingForecastWeather: false,
    isGettingForecastWeatherSuccess: false,
    isGettingForecastWeatherFailure: true,
    errorMessages: payload
  }),
  [getFavoriteCity]: (state, {payload}) => ({
    ...state,
    favoriteCityList: [payload],
  }),
  [helperUtilities]: (state, {payload}) => ({
    ...state,
    helperUtilitiesList: payload,
  }),
  [setUnitsList]: (state, {payload}) => {
    return ({
      ...state,
      unitsList: payload
    })
  },
  [addCity]: (state, {payload}) => ({
    ...state,
    addedCity: payload
  }),
  [createRegisterRequest]: (state, {payload}) => ({
    ...state,
    isRegistered: true,
    isRegisteredSuccess: false,
    isRegisteredFailure: false,
  }),
  [createRegisterSuccess]: (state, {payload}) => ({
    ...state,
    registerData: payload,
    isRegistered: false,
    isRegisteredSuccess: true,
    isRegisteredFailure: false,
  }),
  [createRegisterFailure]: (state, {payload}) => ({
    ...state,
    isRegistered: false,
    isRegisteredSuccess: false,
    isRegisteredFailure: true,
    regErrorMessages: payload
  }),
  [loggedInRequest]: (state, {payload}) => ({
    ...state,
    isLogged: true,
    isLoggedSuccess: false,
    isLoggedFailure: false,
  }),
  [loggedInSuccess]: (state, {payload}) => ({
    ...state,
    loggingIn: payload,
    isLogged: false,
    isLoggedSuccess: true,
    isLoggedFailure: false,
  }),
  [loggedInFailure]: (state, {payload}) => ({
    ...state,
    isLogged: false,
    isLoggedSuccess: false,
    isLoggedFailure: true,
    LoggingErrorMessages: payload
  }),
  [findOneRequest]: (state, {payload}) => ({
    ...state,
    isFoundedSuccess: false,
    isFoundedFailure: false,
  }),
  [findOneSuccess]: (state, {payload}) => ({
    ...state,
    foundedUserData: payload,
    isFoundedSuccess: true,
    isFoundedFailure: false,
  }),
  [findOneFailure]: (state, {payload}) => ({
    ...state,
    isFoundedSuccess: false,
    isFoundedFailure: true,
    foundedErrorMessage: payload
  }),
  [addCityRequest]: (state, {payload}) => ({
    ...state,
    isAddedSuccess: false,
    isAddedFailure: false,
  }),
  [addCitySuccess]: (state, {payload}) => {
    console.log(payload)
    return  ({
      ...state,
      gettingNames: state.gettingNames.push(payload?.cities),
      isAddedSuccess: true,
      isAddedFailure: false,
    })
  },
  [addCityFailure]: (state, {payload}) => ({
    ...state,
    isAddedSuccess: false,
    isAddedFailure: true,
    addedErrorMessage: payload
  }),
  [getAllCitiesNameRequest]: (state, {payload}) => ({
    ...state,
    isGettingNameSuccess: false,
    isGettingNameFailure: false,
  }),
  [getAllCitiesNameSuccess]: (state, {payload}) => ({
    ...state,
    gettingNames: payload,
    isGettingNameSuccess: true,
    isGettingNameFailure: false,
  }),
  [getAllCitiesNameFailure]: (state, {payload}) => ({
    ...state,
    isGettingNameSuccess: false,
    isGettingNameFailure: true,
    gettingNamesErrorMessage: payload
  }),
  [deleteUserCityRequest]: (state, {payload}) => ({
    ...state,
    isDeletingNameSuccess: false,
    isDeletingNameFailure: false,
  }),
  [deleteUserCitySuccess]: (state, {payload}) => ({
    ...state,
    gettingNames: state.gettingNames.filter(item => item.id !== payload),
    isDeletingNameSuccess: true,
    isDeletingNameFailure: false,
  }),
  [deleteUserCityFailure]: (state, {payload}) => ({
    ...state,
    isDeletingNameSuccess: false,
    isDeletingNameFailure: true,
    deletingNamesErrorMessage: payload
  }),
}, initialState);

export default reducer;
