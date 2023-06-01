import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { destroyReview,} from '../store';
import { Link } from 'react-router-dom';
import UpdateReview from './UpdateReview';
//import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
//import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import {
   Avatar,
   Modal,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Button,
   Typography,
   IconButton,
   //DeleteIcon,
   Tooltip,
   //EditIcon,
  
 } from '@mui/material'

const Reviews = () => {
  const { auth, tasks, reviews } = useSelector(state => state);
  const dispatch = useDispatch();
  const filteredReviews = reviews.filter(review => review.userId === auth.id);
  const [showUpdateFormMap, setShowUpdateFormMap] = useState({});
  const [open, setOpen] = useState(false);
  
  
  // if(!task){
  //   return null;
  // }
  const handleOpen = (reviewId) => {
    setShowUpdateFormMap(prevState => ({ ...prevState, [reviewId]: true }));
  };
  
  const handleClose = (reviewId) => {
    setShowUpdateFormMap(prevState => ({ ...prevState, [reviewId]: false }));
  };
  
  const destroy = (review) => {
    dispatch(destroyReview(review));
  };
  
  const handleUpdateClick = (reviewId) => {
    handleOpen(reviewId);
  };

  
  // const update = (review) => {
  //   dispatch(updateReview())
  // };
  return (
    <div>
      <Typography variant='h4'>My Reviews of Jobs I Posted</Typography>
      <ul>
        {
          filteredReviews.map(review =>{
            const showUpdateForm = showUpdateFormMap[review.id] || false;
            console.log('showUpdateForm:', showUpdateForm)
            const task = tasks.find(task => task.id === review.taskId);
            if(!task){
              return null;
            }
            return (
            
                <li key={ review.id }>
                  Job: { task.title }
                  <br/>
                  Review Title: <Link to={`/users/${review.taskDoerId}`}>{ review.title } </Link>
                  {/*<IconButton onClick={ ()=> handleUpdateClick(review.id) }>{showUpdateForm ? <Tooltip title="Edit"><EditIcon /></Tooltip>:  <Tooltip title="Edit"><EditIcon /></Tooltip>}</IconButton>*/}
                  <IconButton onClick={ ()=> handleUpdateClick(review.id) }>
                    {showUpdateForm}
                    <Tooltip title="Edit Review">
                      <EditIcon />
                    </Tooltip>
                  </IconButton>
                  
                  <Tooltip title="Delete Review">
                    <IconButton onClick={ () => destroy(review) }><DeleteIcon /></IconButton>
                  </Tooltip>
                  {  (
                  <Dialog 
                    maxWidth='sm'
                    fullWidth={true}
                    open={showUpdateForm} onClose={() => handleClose(review.id)}>
                    <DialogTitle>Edit Review</DialogTitle>
                      <DialogContent>
                        <UpdateReview review={review} onClose={() => handleClose(review.id)}/>
                      </DialogContent>
                    <DialogActions>
                      <Button onClick={ () => handleClose(review.id)}>Cancel</Button>
                    </DialogActions>
                  </Dialog>)}
                </li>
            )})}
      </ul>
    </div> 
  );
};

export default Reviews;
