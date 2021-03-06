import { API_ENDPOINT } from 'react-native-dotenv';

const root = API_ENDPOINT;

export const LOGIN = root + 'login';
export const REGISTER = root + 'register';
export const POST_ITEM = root + 'post';
export const GET_FEED = root + 'feed';
export const GET_ME = root + 'feed/me';
export const DELETE_ACC = root + 'user/delete';
