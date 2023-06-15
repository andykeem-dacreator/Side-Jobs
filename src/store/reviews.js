import axios from 'axios';

const reviews = (state = [], action) => {
  if (action.type === 'SET_REVIEWS') {
    return action.reviews;
  }
  if (action.type === 'CREATE_REVIEW') {
    return [...state, action.review];
  }
  if (action.type === 'DESTROY_REVIEW') {
    return state.filter((review) => review.id !== action.review.id);
  }
  if (action.type === 'UPDATE_REVIEW') {
    return state.map((review) =>
      review.id === action.review.id ? action.review : review
    );
  }
  return state;
};

export const fetchReviews = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/reviews');
    dispatch({ type: 'SET_REVIEWS', reviews: response.data });
  };
};

export const createReview = (review) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.post(`/api/reviews`, review, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: 'CREATE_REVIEW', review: response.data });
  };
};

export const destroyReview = (review) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.delete(`/api/reviews/${review.id}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: 'DESTROY_REVIEW', review });
  };
};

export const updateReview = (review) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.put(`/api/reviews/${review.id}`, review, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: 'UPDATE_REVIEW', review: response.data });
  };
};

export default reviews;
