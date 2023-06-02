import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
//import Rating from '@mui/material/Rating';
import {
   Avatar,
   List,
   ListItem,
   ListItemAvatar,
   ListItemText,
   Divider,
   Stack,
   Card,
   Badge,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   Chip,
   Rating,
 } from '@mui/material';
 
const PublicProfile = () => {
  const { users, auth, tasks, reviews} = useSelector((state) => state);
  const { id } = useParams();
  const user = users.find((user) => user.id === id);
  const dispatch = useDispatch();
  const filteredReviews = reviews.filter(review => review.taskDoerId === id);
 
  const [sortedReviews, setSortedReviews] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const categories = [
    'virtual',
    'shopping',
    'misc',
    'moving',
    'sport',
    'gaming',
    'photography',
    'beauty',
    'cleaning',
    ];
  
  let sumRating = sortedReviews.reduce((acc, review)=>{
    return acc + review.rating
  }, 0);
  console.log('sumrating:', sumRating)
  console.log('sortedreviews len:', sortedReviews.length)
  let averageRating = sumRating / sortedReviews.length;
  
   useEffect(() => {
    const filteredByCategory = filteredReviews.filter((review) => {
      if (filterCategory === '') {
        return true; // No category filter applied
      }
      const task = tasks.find((task) => task.id === review.taskId);
      return task && (task.category === filterCategory);
    });
    
    setSortedReviews(
      filteredByCategory.slice()
        .sort((a, b) => {
          if (sortOption === 1) {
            return b.rating - a.rating;
          }
          else if(sortOption === 2 ){
            return a.rating - b.rating;
          }
          return 0;
        })
        
    );
  }, [reviews, sortOption, filterCategory, tasks]);
  
  if (!user) {
    return null;
  }
  
  return (
    <div>
    <Typography variant='h4'>{user.firstName} {user.lastName[0]}. Profile</Typography>
      <List>
        <ListItem>
          <ListItemAvatar>
          {/*<Stack direction='row'>*/}
            <Avatar
              src={ user.avatar }
              sx={{ width: 56, height: 56 }}
              >
            </Avatar>
          </ListItemAvatar>
          <Stack direction='column' spacing={1} sx={{ marginLeft: 1 }}>
            <Typography variant='h5'>Skills & experience</Typography>
            <Typography variant='body1'>{ user.aboutMe }</Typography>
          </Stack>  
          {/*</Stack>*/}
        </ListItem>
        <Divider />
      </List>
   
      <Typography variant='h5'>Reviews ({sortedReviews.length}), {averageRating}</Typography>
      <Stack
        direction='row'
      >
      <FormControl sx={{ minWidth: 200 }} >
        <InputLabel>Sort by</InputLabel>
        <Select
          value={ sortOption }
          onChange={ (ev) => setSortOption(ev.target.value) }
        >
          <MenuItem value=''>None</MenuItem>
          <MenuItem value={1}>Highest Rated</MenuItem>
          <MenuItem value={2}>Lowest Rated</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl sx={{ minWidth: 200, marginLeft: 1}} spacing={1}> 
        <InputLabel>Filter by</InputLabel>
        <Select
          value={ filterCategory }
          onChange={ (ev) => setFilterCategory(ev.target.value) }
        >
        
          <MenuItem value={''}>All Categories</MenuItem>
          {
            categories.sort().map((category) => {
              return (
              <MenuItem key={ category } value={ category }>
                { category }
              </MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      </Stack>
      
      <List>{
        sortedReviews.map(review =>{
          const createdAt = new Date(review.createdAt);
          const taskCreator = users.find(user => user.id === review.userId);
          const task = tasks.find(task => task.id === review.taskId);
          if(!task){
            return null;
          }
          return (
          <React.Fragment key={review.id}>
            <ListItem key={ review.id }
              >
              {/*<ListItemAvatar>*/}
              {/*<Card sx={{ padding: '1rem' }} >*/}
              <Stack direction='column' spacing={1}>
                <Stack
                  direction='row'
                  alignItems='center'
                >
                <Avatar
                  src={taskCreator.avatar}
                >
                </Avatar>
              {/*</ListItemAvatar>*/}
                <Typography variant='h6' sx={{ marginLeft: 1 }}>{ taskCreator.firstName } { taskCreator.lastName[0] }.</Typography> 
              </Stack>
              <Stack
                  direction='row'
                  alignItems='center'
                >
                <Rating name="read-only" value={review.rating} readOnly />
                <Typography variant='h6' sx={{ marginLeft: 1 }} >{ review.title }</Typography>
              </Stack>
              {/*<Typography variant='subtitle1'>{ task.category }</Typography>*/}
              <Chip label={ task.category } variant='outlined' size='small' sx={{ width: 1/2}}/>
             
              <Typography variant='body2'>{ createdAt.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          }) }</Typography>
              <Typography variant='body1'>{ review.comment }</Typography>
              {/*</Card>*/}
              </Stack>
            </ListItem>
            <Divider />
            </React.Fragment>
          );
        })
      }
      </List>
      <div>
     
    </div>
    </div>
  );
};

export default PublicProfile;
