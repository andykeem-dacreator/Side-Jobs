import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { destroyReview,} from '../store';
import { Link } from 'react-router-dom';
import UpdateReview from './UpdateReview';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
 import {
   Avatar,
   Modal
//   IconButton,
//   DeleteIcon,
//   Tooltip,
//   EditIcon
 } from '@mui/material'

const Reviews = () => {
  const { auth, tasks, reviews } = useSelector(state => state);
  const dispatch = useDispatch();
  const filteredReviews = reviews.filter(review => review.userId === auth.id);
  const [showUpdateFormMap, setShowUpdateFormMap] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  //const handleOpen = () => setOpen(true);
  //const handleClose = () => setOpen(false)
  const handleOpen = (review) => {
    setSelectedReview(review);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setSelectedReview(null);
  };
  
  const destroy = (review) => {
    dispatch(destroyReview(review));
  };
  
  const handleUpdateClick = (reviewId) => {
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
                  <IconButton onClick={ ()=> handleUpdateClick(review.id) }>{showUpdateForm ? 'Cancel Update': <Tooltip title="Edit"><EditIcon /></Tooltip>}</IconButton>
                  {/*<IconButton onClick={ ()=> handleUpdateClick(review.id) }>{showUpdateForm ? 'Cancel Update': <Tooltip title="Edit"><EditIcon /></Tooltip>}</IconButton>*/}
                  <Tooltip title="Delete">
                    <IconButton onClick={ () => destroy(review) }><DeleteIcon /></IconButton>
                  </Tooltip>
                  {
                    showUpdateForm && (
                    <UpdateReview review={review}/>
                    )
                  }
                  {/*{
                    showUpdateForm && (
                    <IconButton onClick={ () => handleOpen(review) }>
                      <Tooltip title='Edit'>
                        <EditIcon />
                      </Tooltip>
                    </IconButton>
                    )
                  }*/}
             
                </li>
             
            )})}
      </ul>
      {/*
      <Modal
        open={ open }
        onClose={ handleClose }
        aria-labelledby="update-review-modal"
        aria-describedby="update-review-form"
        >
        <div>
          {selectedReview && <UpdateReview review={selectedReview} />}
        </div>
      </Modal>
      */}
    </div> 
  );
};

export default Reviews;
