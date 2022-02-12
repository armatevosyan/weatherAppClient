import FavoriteCities from "../Components/Weather/Main/FavoriteCitiesPage/FavoriteCities";
import WeatherTable from "../Components/Weather/Main/HomePage/WeatherTable";
import TabForecastDays from "../Components/Weather/Main/FiveDayForecastPage/TabForecastDays";
import FavoriteCitiesList from "../Components/Weather/Main/FavoriteCitiesPage/FavoriteCitiesList";
import favoriteCityWeatherItem from '../Components/Weather/Main/FavoriteCitiesPage/favoriteCityWeatherItem';
import Registration from '../Components/Weather/Auth/Registration';
import Login from '../Components/Weather/Auth/Login';
import Account from '../Components/Weather/Auth/Account';

const Routes =[
    {
      name: 'Home Page',
      path: '/',
      component: WeatherTable,
    },
    {
      name: 'Favorite Cities List',
      path: '/favorite',
      component: FavoriteCitiesList,
    },
    {
      name: '5 Day Forecast',
      path: '/forecast',
      component: TabForecastDays,
    },
    {
      name: 'Search Cities Weather',
      path: '/favoriteWeather',
      component: FavoriteCities
    },
    {
      name: 'Search Result',
      path: '/search',
      component: favoriteCityWeatherItem,
    },
    {
      name: 'Log In Page',
      path: '/login',
      component: Login,
    },
    {
      name: 'Registration Page',
      path: '/registration',
      component: Registration,
    },
    {
      name: 'My Account',
      path: '/account',
      component: Account,
    }
  ];

export default Routes;
