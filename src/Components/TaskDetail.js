import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { deleteTask, fetchMessages } from '../store';
import UpdateTask from './UpdateTask';
import MapData from './MapData';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import Chats from './Chats';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const TaskDetail = () => {
  const { id } = useParams();
  const { tasks, auth, reviews, users } = useSelector((state) => state);
  let task = tasks.find((t) => t.id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const review = reviews.find((review) => review.taskId === id);
  const theme = useTheme();

  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMessages(id));
  }, [dispatch, id]);

  if (!task) {
    return null;
  }
  let taskDoer = users.find((u) => u.id === task.taskDoerId);

  if (!taskDoer) {
    taskDoer = {};
    taskDoer.firstName = 'no one';
  }

  const destroy = async (task) => {
    await dispatch(deleteTask(task));
    navigate('/tasks');
  };

  const handleToggleChat = () => {
    setIsChatOpen((prevIsChatOpen) => !prevIsChatOpen);
  };

  return (
    <div id="page-layout">
      <MapData />
      <div className="task-info" id="task-detail-container">
        <div className="task-detail">
          <div className="task-detail-header">
            <Typography variant="h4">Job Details</Typography>

            {task.userId === auth.id && !task.taskDoerId ? (
              <Tooltip title="Delete Task">
                <IconButton onClick={() => destroy(task)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ''
            )}
          </div>
          <div className="task-title">Title: {task.title}</div>
          <div className="task-description">
            Description: {task.description}
          </div>
          <div className="task-location">
            Location: {task.city}, {task.state}
          </div>
          <div className="task-price">Price: ${task.price}</div>
          <div className="taskDoerName">
            Accepted by:
            {taskDoer.firstName !== 'no one' ? (
              <Link
                to={`/users/${task.taskDoerId}`}
                style={{
                  color: theme.palette.mode === 'dark' ? 'white' : 'black',
                }}
              >
                {taskDoer.firstName}
              </Link>
            ) : (
              taskDoer.firstName
            )}
          </div>
        </div>
        <div>
          {task.userId === auth.id && !task.isComplete && !task.taskDoerId ? (
            <UpdateTask />
          ) : (
            ''
          )}
          {auth.id === task.userId &&
          task.isComplete &&
          task.taskDoerId &&
          !review ? (
            <Link to={`/tasks/${task.id}/review/new`}>
              <button>Leave a Review</button>
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>
      <div id="chats-container">
        {task.taskDoerId && (
          <div>
            <IconButton
              id="chats-button"
              onClick={handleToggleChat}
              color="primary"
            >
              {isChatOpen ? (
                <ChatBubbleOutlineIcon />
              ) : (
                <ChatBubbleIcon />
              )}
            </IconButton>
            {isChatOpen && (
              <div className="chats-popup">
              <Chats taskId={id} task={task} withUserName={taskDoer.firstName} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;
