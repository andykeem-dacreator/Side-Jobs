import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

const PublicProfile = () => {
  const { users, auth, tasks, reviews} = useSelector((state) => state);
  const { id } = useParams();
  const user = users.find((user) => user.id === id);
  const dispatch = useDispatch();
  const filteredReviews = reviews.filter(review => review.taskDoerId === id);
  //find first task where the taskDoerId === id. then i can get the taskDoer's name
  const task = tasks.find(task => task.taskDoerId === id);
  //createReview component should show if the task that taskcreator made doesn't have review yet

  if (!user) {
      return null;
  }
  if(!task){
    return null;
  }
  return (
    <div>
      <h1> {user.firstName} Profile </h1>
      <ol>{
        filteredReviews.map(review =>{
          return (
            <li key={ review.id }>
              {/*{ review.rating } <br/>*/}
              <Rating name="read-only" value={review.rating} readOnly /> <br/>
              <Typography variant='h6'>{ review.title }</Typography> <br/>
              <Typography variant='body1'>{ review.comment }</Typography>
            </li>
          );
        })
      }
      </ol>
      <div>
      {/*{ task.userId === auth.id ? <Link to={`/tasks/${task.id}/review/new`}><button>Leave a Review</button></Link>: ''}*/}
    </div>
    </div>
  );
};

export default PublicProfile;
