import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateReview } from '../store';
import { useParams } from 'react-router-dom';
import {
  Rating,
  TextField,
  Button,
 } from '@mui/material';

const UpdateReview = ({ review, onClose }) => {
  const { auth, reviews } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (review) {
      setRating(review.rating);
      setTitle(review.title);
      setComment(review.comment);
    }
  }, [reviews]);

  const update = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(
        updateReview({
          id: review.id,
          rating,
          title,
          comment,
          userId: auth.id,
          taskId: review.taskId,
          taskDoerId: review.taskDoerId,
        })
      );
      onClose();
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="update-review">
      <form onSubmit={update}>
        <Rating
          className="rating"
          sx={{ margin: 'auto', my: '10px' }}
          value={rating}
          onChange={(ev) => setRating(Number(ev.target.value))}
          placeholder="rating"
        />
        <TextField
          className="update-review-textfield"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <TextField
          className="update-review-textfield"
          label="Comment"
          variant="outlined"
          multiline={true}
          rows={3}
          value={comment}
          onChange={(ev) => setComment(ev.target.value)}
        />
        <Button variant="outlined" type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateReview;
