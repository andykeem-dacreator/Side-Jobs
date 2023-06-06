import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { destroyReview,} from '../store';
import { Link } from 'react-router-dom';
import UpdateReview from './UpdateReview';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
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
   Rating,
   Card,
   CardActions,
   CardContent,
   Box,
   List,
   ListItem,
   Stack,
   Collapse
   //ExpandMore as ExpandMoreIcon
 } from '@mui/material'

const Reviews = () => {
  const { auth, tasks, reviews } = useSelector(state => state);
  const dispatch = useDispatch();
  const filteredReviews = reviews.filter(review => review.userId === auth.id);
  const [showUpdateFormMap, setShowUpdateFormMap] = useState({});
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState({});
  
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

  const handleExpandClick = (reviewId) => {
    //setExpanded(!expanded);
    setExpandedReviews((prevState)=>({ ...prevState, [reviewId]: !prevState[reviewId]}));
  };

  return (
    <div className='reviews-i-gave'>
      <Typography variant='h4'>Reviews I Gave</Typography>
      {/*<List >*/}
        {
          filteredReviews.map(review =>{
            const createdAt = new Date(review.createdAt);
            const showUpdateForm = showUpdateFormMap[review.id] || false;
            console.log('showUpdateForm:', showUpdateForm)
            const task = tasks.find(task => task.id === review.taskId);
            if(!task){
              return null;
            }
            return (
            <Box sx={{ minWidth: 275}}>
              <Card variant="outlined">
              <CardContent>
                {/*<ListItem key={ review.id }
                >*/}
                  
                  <Stack direction='column'>
                    <Stack direction='row'>
                      <Avatar
                        src={ task.taskDoer.avatar }
                        
                      >
                      </Avatar>
                      <Typography variant='h6' sx={{ marginLeft: 1 }}>To: {task.taskDoer.firstName} {task.taskDoer.lastName[0]}.</Typography>
                    
                    <div style={{ flexGrow: 1}}>
                      <IconButton onClick={ ()=> handleUpdateClick(review.id) }>
                        <Tooltip title="Edit Review" >
                          <EditIcon />
                        </Tooltip>
                    </IconButton>
                  
                    <Tooltip title="Delete Review">
                      <IconButton onClick={ () => destroy(review) } ><DeleteIcon /></IconButton>
                    </Tooltip>
                    </div> 
                    </Stack>
                  
                
                  {/*<Stack direction='column'>*/}
                  <Stack direction='row' alignItems='center'>
                  <Rating
                    name="read-only"
                    value={ review.rating }
                    readOnly
                  />
                  <Typography 
                    variant='h6' 
                    component='div'
                    sx={{ marginLeft: 1 }} 
                  >
                    <Link to={`/users/${review.taskDoerId}`}>
                      { review.title } 
                    </Link>
                  </Typography>
                  </Stack>
                  <Typography variant='body2' sx={{ marginLeft: 1 }}> { createdAt.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                  }) }
                  </Typography>
                  
                  <Typography variant='body1'>{ review.comment }</Typography>
                  </Stack>
                  
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
                {/*</ListItem>*/}
              </CardContent>  
              
              <CardActions disableSpacing>
                <IconButton
                  onClick={ () => handleExpandClick(review.id)}
                  aria-expanded={expandedReviews[review.id] || false}
                  aria-label='show more'
                >
          
                  <ExpandMoreOutlinedIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expandedReviews[review.id] || false} timeout='auto' unmountOnExit>
                <CardContent>
                  <Typography variant="body2">
                    
                    <Typography variant='subtitle1'>Job: { task.title }</Typography>
                    <Typography variant='body1'>{ task.description }</Typography>
                  </Typography>
                </CardContent>
              </Collapse>
              </Card>  
            </Box>  
            )})}
      {/*</List>*/}
    </div> 
  );
};

export default Reviews;
