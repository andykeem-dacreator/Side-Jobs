import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { createReview } from '../store';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Avatar, Stack } from '@mui/material';

const AddReview = () => {
  const { auth, tasks, users } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return null;
  }

  const user = users.find((user) => user.id === task.taskDoerId);
  if (!user) {
    return null;
  }

  const create = (ev) => {
    ev.preventDefault();
    try {
      dispatch(
        createReview({
          userId: auth.id,
          taskId: task.id,
          taskDoerId: task.taskDoerId,
          rating,
          title,
          comment,
        })
      );
      navigate(`/users/${task.taskDoerId}`);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="add-review">
      <Typography variant="h4">Write a Review</Typography>
      <Stack direction="column" sx={{ spacing: 2, padding: 1 }}>
        <Stack direction="row">
          <Avatar src={task.taskDoer.avatar}></Avatar>
          <Typography variant="h6" sx={{ marginLeft: 2 }}>
            For: {user.firstName} {user.lastName[0]}.
          </Typography>
        </Stack>
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          Completed Job: {task.title}
        </Typography>
        <Typography variant="body1">
          Job Description: {task.description}
        </Typography>
      </Stack>

      <form onSubmit={create}>
        <Rating
          value={rating}
          onChange={(ev) => setRating(Number(ev.target.value))}
          sx={{ margin: 'auto', my: '10px' }}
          size="large"
        />
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <TextField
          label="Comment"
          variant="outlined"
          value={comment}
          onChange={(ev) => setComment(ev.target.value)}
          multiline={true}
          rows={3}
        />
        <Button
          variant="outlined"
          type="submit"
          disabled={!title || !comment || !rating}
        >
          Add Review
        </Button>
      </form>
    </div>
  );
};

export default AddReview;
