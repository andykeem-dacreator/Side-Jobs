import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deleteTask } from "../store";
import UpdateTask from "./UpdateTask";
import MapData from "./MapData";

const TaskDetail = () => {
  const { id } = useParams();
  const { tasks, auth, reviews } = useSelector((state) => state);
  let task = tasks.find((t) => t.id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const review = reviews.find(review => review.taskId === id);
  // useEffect(()=>{
  //   task = tasks.find((t) => t.id === id);
  // }, [tasks]);

  if (!task) {
    return null;
  }

  const destroy = async (task) => {
    await dispatch(deleteTask(task));
    navigate("/tasks");
  };

   return (
    <div id ="page-layout">
      <MapData />
      <div>
          <div className="task-detail">
            <h1>Task Detail</h1>
            <div className="task-title">Title: {task.title}</div>
            <div className="task-description">Description: {task.description}</div>
            <div className="task-location">
              Location: {task.city}, {task.state}
            </div>
            <div className="task-price">Price: {task.price}</div>
            { task.taskDoerId === auth.id ? '': <button onClick={() => destroy(task)}>Delete</button>}
          </div>
          <div>
            { task.taskDoerId === auth.id ? '': <UpdateTask />}
            <pre>
              { JSON.stringify(task, null, 2) }
            </pre>
             { auth.id === task.userId && task.isComplete && task.taskDoerId && !review ? <Link to={`/tasks/${task.id}/review/new`}><button>Leave a Review</button></Link> : ''}
          </div>
      </div>
    </div>
  );
};

export default TaskDetail;
