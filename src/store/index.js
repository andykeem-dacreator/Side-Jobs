import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import tasks from './task';
import users from './users';
import reviews from './reviews';
import onlineUsers from './onlineUsers';
import messages from './messages';

const reducer = combineReducers({
  auth,
  tasks,
  users,
  reviews,
  onlineUsers,
  messages
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './task';
export * from './users';
export * from './reviews';
export * from './onlineUsers';
export * from './messages';