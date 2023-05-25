import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

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
              { review.rating } <br/>
              { review.title } <br/>
              { review.comment }
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
