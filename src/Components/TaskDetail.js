import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deleteTask, fetchMessages } from "../store";
import UpdateTask from "./UpdateTask";
import MapData from "./MapData";
import { useTheme } from "@mui/material";
import Chats from "./Chats";

const TaskDetail = () => {
  const { id } = useParams();
  const { tasks, auth, reviews, users } = useSelector((state) => state);
  let task = tasks.find((t) => t.id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const review = reviews.find((review) => review.taskId === id);
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchMessages(id));
  }, [dispatch, id]);

  if (!task) {
    return null;
  }
  let taskDoer = users.find((u) => u.id === task.taskDoerId);

  if (!taskDoer) {
    taskDoer = {};
    taskDoer.firstName = "no one";
  }

  const destroy = async (task) => {
    await dispatch(deleteTask(task));
    navigate("/tasks");
  };

  return (
    <div id="page-layout">
      <MapData />
      <div>
        <div className="task-detail">
          <h2>Task Detail</h2>
          <div className="task-title">Title: {task.title}</div>
          <div className="task-description">
            Description: {task.description}
          </div>
          <div className="task-location">
            Location: {task.city}, {task.state}
          </div>
          <div className="task-price">Price: {task.price}</div>
          <div className="taskDoerName">
            Accepted by:
            {taskDoer.firstName !== "no one" ? (
                <Link
                    to={`/users/${task.taskDoerId}`}
                    style={{
                      color: theme.palette.mode === "dark" ? "white" : "black",
                    }}
                >
                  {console.log(task)}
                  {taskDoer.firstName}
                </Link>
            ) : (
                taskDoer.firstName
            )}
          </div>
          {task.userId === auth.id && !task.taskDoerId ? (
            <button onClick={() => destroy(task)}>Delete</button>
          ) : (
            ""
          )}
        </div>
        <div>
          {task.userId === auth.id && !task.isComplete && !task.taskDoerId ? <UpdateTask /> : ""}
          {console.log(JSON.stringify(task, null, 2))}
          {auth.id === task.userId &&
          task.isComplete &&
          task.taskDoerId &&
          !review ? (
            <Link to={`/tasks/${task.id}/review/new`}>
              <button>Leave a Review</button>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
      <Chats taskId={id} task={task} />
    </div>
  );
};

export default TaskDetail;
