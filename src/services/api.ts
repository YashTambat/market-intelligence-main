import axios from 'axios';

export const dummyJsonApi = axios.create({
  baseURL: 'https://dummyjson.com',
});

export const randomUserApi = axios.create({
  baseURL: 'https://randomuser.me/api',
});

export const coinGeckoApi = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
});

export const spaceXApi = axios.create({
  baseURL: 'https://api.spacexdata.com/v4',
});
