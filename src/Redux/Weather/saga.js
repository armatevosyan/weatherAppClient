import { call, put, takeLatest} from 'redux-saga/effects';
import axios from "axios";
import axiosInstance from './AxiosInstance';

import {
  getWeatherRequest,
  getWeatherSuccess,
  getWeatherFailure,
  getWeatherForecastSuccess,
  getWeatherForecastFailure,
  getFavoriteApiListSuccess,
  getFavoriteApiListFailure,
  getWeatherForecastRequest,
  getFavoriteApiListRequest,
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

function* getWeather ({payload}){

  try {
    const response = yield call(() => axiosInstance.post(`weather/create`, payload))
    if (response?.status === 200) {
       yield put(getWeatherSuccess(response.data))
    }
  } catch (error) {
    return  yield put(getWeatherFailure("Something want Wrong!"))
  }
}
function* getForecastWeather ({payload}){
  try {
    const response = yield call(()=> axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${payload.lat}&lon=${payload.lon}&units=${payload.units}&appid=78949a85d047893c4833058665329803`))
    if (response?.status === 200) {
      yield put(getWeatherForecastSuccess(response.data))
    }
  }catch (error) {
    yield put(getWeatherForecastFailure("Something want Wrong!"))
  }
}
function* getOneApiList ({payload}){
  try {
    const response = yield call(()=> axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${payload.city}&units=${payload.unitsList.units}&appid=78949a85d047893c4833058665329803`))
    if (response?.status === 200) {
      yield put(getFavoriteApiListSuccess(response.data))
    }
  }catch (error) {
    yield put(getFavoriteApiListFailure("Something want Wrong!"))
  }

}

function* creteRegister ({payload}){
  try {
    const response = yield call(()=> axiosInstance.post(`user/register` , payload))
    if (response?.status === 200) {
      yield put(createRegisterSuccess(response.data))
    }
  }catch (error) {
    yield put(createRegisterFailure(error.response.data))
  }
}

function* loggingIn ({payload}){
  try {
    const response = yield call(()=> axiosInstance.post(`user/login` , payload))
    if (response?.status === 200) {
      yield put(loggedInSuccess(response.data))
      const token = response.data.token.split(" ").pop()
      localStorage.setItem("token",token)
    }
  }catch (error) {
    yield put(loggedInFailure(error.response.data))
  }
}

function* findOne ({payload}){
  try {
    const response = yield call(()=> axiosInstance.get(`user/find/${payload}`))
    if (response?.status === 200) {
      yield put(findOneSuccess(response.data))
    }
  }catch (error) {
    yield put(findOneFailure(error))
  }
}

function* addCity ({payload}){

  try {
    const response = yield call(()=> axiosInstance.post(`city/create/`, payload))
    if (response?.status === 200) {
      yield put(addCitySuccess(response.data))
    }
  }catch (error) {
    yield put(addCityFailure(error))
  }
}

function* getAllUserCities ({payload}){

  try {
    const response = yield call(()=> axiosInstance.get(`city/get/${payload}`))
    if (response?.status === 200) {
      yield put(getAllCitiesNameSuccess(response.data))
    }
  }catch (error) {
    yield put(getAllCitiesNameFailure(error))
  }
}

function* deleteUserCity ({payload}){

  try {
    const response = yield call(()=> axiosInstance.delete(`city/delete/${payload}`))
    if (response?.status === 200) {
      yield put(deleteUserCitySuccess(response.data))
    }
  }catch (error) {
    yield put(deleteUserCityFailure(error))
  }
}

export  default function* posts() {
  yield takeLatest(getWeatherRequest, getWeather)
  yield takeLatest(getWeatherForecastRequest, getForecastWeather)
  yield takeLatest(getFavoriteApiListRequest, getOneApiList)
  yield takeLatest(createRegisterRequest, creteRegister)
  yield takeLatest(loggedInRequest, loggingIn)
  yield takeLatest(findOneRequest, findOne)
  yield takeLatest(addCityRequest, addCity)
  yield takeLatest(getAllCitiesNameRequest, getAllUserCities)
  yield takeLatest(deleteUserCityRequest, deleteUserCity)
}
