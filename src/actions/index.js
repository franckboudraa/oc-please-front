import axios from 'axios';
const x = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000
});
export default x;

export * from './auth';
export * from './users';
export * from './map';
export * from './requests';
