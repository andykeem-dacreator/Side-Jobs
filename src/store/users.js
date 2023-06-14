import axios from 'axios';
const users = (state = [], action) => {
  if (action.type === 'SET_USERS') {
    return action.users;
  }
  if (action.type === 'UPDATE_USER') {
    return state.map(user => {
      if (user.id === action.user.id) {
        return action.user;
      }
      return user;
    })
  }
  if (action.type === 'DELETE_USER') {
    return state.filter((user) => user.id !== action.user.id);
  }
  return state;
};

export const fetchUsers = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/users');
    dispatch({ type: 'SET_USERS', users: response.data });
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/users/${user.id}`, user);
    dispatch({ type: 'UPDATE_USER', user: response.data })
  };
};

export const deleteUser = (user) => {
  return async (dispatch) => {
    await axios.delete(`/api/users/${user.id}`);
    dispatch({ type: 'DELETE_USER', user });
  };
};

export default users;
