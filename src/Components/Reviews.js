import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { destroyReview,} from '../store';
import { Link } from 'react-router-dom';
import UpdateReview from './UpdateReview';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
const Reviews = () => {
  const { auth, tasks, reviews } = useSelector(state => state);
  const dispatch = useDispatch();
  const filteredReviews = reviews.filter(review => review.userId === auth.id);
  //const [filteredReviews, setFilteredReviews] = useState([]);
  //const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showUpdateFormMap, setShowUpdateFormMap] = useState({});
  
  // useEffect(()=> {
  //   const _filteredReviews = reviews.filter(review => review.userId === auth.id);
  //   setFilteredReviews(_filteredReviews);
  // },[reviews, auth.id]);
  
  const destroy = (review) => {
    dispatch(destroyReview(review));
  };
  
  const handleUpdateClick = (reviewId) => {
    //setShowUpdateForm(!showUpdateForm);
    setShowUpdateFormMap(prevState => ({...prevState, [reviewId]: !prevState[reviewId]}));
  };
  
  // const update = (review) => {
  //   dispatch(updateReview())
  // };
  return (
    <div>
      <h2>My Reviews</h2>
      <ul>
        {
          filteredReviews.map(review =>{
            const showUpdateForm = showUpdateFormMap[review.id] || false;
            
            return (
              
              <li key={ review.id }>
                <Link to={`/users/${review.taskDoerId}`}>{ review.title } </Link>
                <button onClick={ ()=> handleUpdateClick(review.id) }>{showUpdateForm ? 'Cancel Update' : 'Go to Update'}</button>
                {/*<Tooltip title="Delete">
                  <IconButton onClick={ () => destroy(review) }><DeleteIcon /></IconButton>
                </Tooltip>*/}
                <button onClick={ () => destroy(review) }>X</button>
                {
                  showUpdateForm && (
                  <UpdateReview review={review}/>
                  )
                }
              
              </li>
              
            );
          })
        }
      </ul>
    </div> 
  );
};

export default Reviews;
