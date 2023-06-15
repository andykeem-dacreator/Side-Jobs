import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateTask } from '../store';
import { styles } from '../styles/styles.js';

import { Typography, Button, Grid, Box } from '@mui/material';

const Tasks = () => {
  const { auth, tasks } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unassignedTasks = tasks.filter(
    (task) => task.taskDoerId === null && task.userId !== auth.id
  );

  const update = async (task) => {
    await dispatch(updateTask({ id: task.id, taskDoerId: auth.id }));
    navigate('/toDoList');
  };

  const isGuestMode = !auth.id;

  return (
    <Box className="tasks-page-layout">
      <Typography variant="h4">Available Jobs</Typography>
      <Box sx={{ flexGrow: 1, minHeight: '400px' }}>
        <Grid container sx={styles.sectionGridContainer}>
          {unassignedTasks.map((task) => {
            return (
              <Grid
                item
                xs={12}
                md={3.5}
                minHeight={300}
                key={task.id}
                sx={styles.sectionGridItem}
              >
                {isGuestMode ? (
                  <>
                    <Typography variant="h5">Title: {task.title}</Typography>
                    <Typography variant="h5">Price: ${task.price}</Typography>
                    <Typography variant="h5">
                      Location: {task.city}, {task.state}
                    </Typography>
                  </>
                ) : (
                  <Link to={`/tasks/${task.id}`}>
                    <Typography variant="h5">Title: {task.title}</Typography>
                    <Typography variant="h5">Price: ${task.price}</Typography>
                    <Typography variant="h5">
                      Location: {task.city}, {task.state}
                    </Typography>
                  </Link>
                )}
                <div className="acceptButton">
                  {!isGuestMode && (
                    <Button
                      onClick={() => update(task)}
                      variant="contained"
                      color="primary"
                      sx={{
                        width: '200px',
                        fontSize: '16px',
                        marginTop: '25px',
                      }}
                    >
                      Accept Job
                    </Button>
                  )}
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Tasks;
