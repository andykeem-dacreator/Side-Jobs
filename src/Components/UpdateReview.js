import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateReview } from '../store';
import { useParams } from 'react-router-dom';

const UpdateReview = ({review}) => {
  const { auth, reviews, tasks } = useSelector(state => state);
  const dispatch = useDispatch();
  
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const task = tasks.find(task => task.taskDoerId === review.taskDoerId);
  
  useEffect(()=>{
    if(review){
      setRating(review.rating);
      setTitle(review.title);
      setComment(review.comment);
    }
  }, [reviews]);
  
  
  const update = async(ev) => {
    ev.preventDefault();
    try{
      console.log('review is:', review)
      await dispatch(updateReview({ id: review.id, rating, title, comment, userId: auth.id, taskId: task.id, taskDoerId: task.taskDoerId }));
    }
    catch(ex){
      console.log(ex);
    }
  };
  
  return(
    <>
      <h3>Edit Review</h3>
      <form onSubmit={ update }>
        <input value={ rating } onChange={ ev => setRating(Number(ev.target.value)) } placeholder='rating'/>
        <input value={ title } onChange={ ev => setTitle(ev.target.value) } placeholder='title' />
        <input value={ comment } onChange={ ev => setComment(ev.target.value) } placeholder='comment' />
        <button>Update</button>
      </form>
    </>
    );
};

export default UpdateReview;