import { createAction } from 'redux-actions';

export const getWeatherRequest = createAction('GET_WEATHER_REQUEST');
export const getWeatherSuccess = createAction('GET_WEATHER_SUCCESS');
export const getWeatherFailure = createAction('GET_WEATHER_FAILURE');

export const getWeatherForecastRequest = createAction('GET_WEATHER_FORECAST_REQUEST');
export const getWeatherForecastSuccess = createAction('GET_WEATHER_FORECAST_SUCCESS');
export const getWeatherForecastFailure = createAction('GET_WEATHER_FORECAST_FAILURE');

export const getFavoriteApiListRequest = createAction('GET_FAVORITE_API_REQUEST');
export const getFavoriteApiListFailure = createAction('GET_FAVORITE_API_FAILURE');
export const getFavoriteApiListSuccess = createAction('GET_FAVORITE_API_SUCCESS');

export const getFavoriteCity = createAction('GET_FAVORITE_CITY');
export const helperUtilities = createAction('HELPER_UTILITIES');
export const setUnitsList = createAction('SET_UNITS_LIST');
export const addCity = createAction('ADD_CITY');


export const createRegisterRequest = createAction('CREATE_REGISTER_REQUEST');
export const createRegisterSuccess = createAction('CREATE_REGISTER_SUCCESS');
export const createRegisterFailure = createAction('CREATE_REGISTER_FAILURE');

export const loggedInRequest = createAction('LOGGED_IN_REQUEST');
export const loggedInSuccess = createAction('LOGGED_IN_SUCCESS');
export const loggedInFailure = createAction('LOGGED_IN_FAILURE');

export const findOneRequest = createAction('FIND_ONE_REQUEST');
export const findOneSuccess = createAction('FIND_ONE_SUCCESS');
export const findOneFailure = createAction('FIND_ONE_FAILURE');

export const addCityRequest = createAction('ADD_CITY_REQUEST');
export const addCitySuccess = createAction('ADD_CITY_SUCCESS');
export const addCityFailure = createAction('ADD_CITY_FAILURE');

export const getAllCitiesNameRequest = createAction('GET_ALL_CITIES_NAME_REQUEST');
export const getAllCitiesNameSuccess = createAction('GET_ALL_CITIES_NAME_SUCCESS');
export const getAllCitiesNameFailure = createAction('GET_ALL_CITIES_NAME_FAILURE');

export const deleteUserCityRequest = createAction('DELETE_USER_CITY_REQUEST');
export const deleteUserCitySuccess = createAction('DELETE_USER_CITY_SUCCESS');
export const deleteUserCityFailure = createAction('DELETE_USER_CITY_FAILURE');
