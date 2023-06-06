import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';

import {
   Avatar,
   List,
   ListItem,
   ListItemAvatar,
   Divider,
   Stack,
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
  //const theme = useContext(ThemeContext);
  //const theme = useTheme();

  const getAverageRating = (reviews) => {
    let sumRating = reviews.reduce((acc, review)=>{
      return acc + review.rating;
    }, 0);
    let averageRating;
    if(reviews.length === 0){
      averageRating = 0;
    } else{
      averageRating = sumRating / reviews.length;
    }
    return averageRating;
  };
  
  const averageRatingByCategory = getAverageRating(sortedReviews);
  const averageRatingOverall = getAverageRating(filteredReviews);
  
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
    <div className='public-profile'>
    <Typography variant='h4'>{user.firstName} {user.lastName[0]}. Profile</Typography>
      <List>
        <ListItem>
          <ListItemAvatar>
          {/*<Stack direction='row'>*/}
            <Avatar
              src={ user.avatar }
              sx={{ width: 60, height: 60 }}
              >
            </Avatar>
          </ListItemAvatar>
          <Stack direction='column' spacing={1} sx={{ marginLeft: 2 }}>
            <Stack direction='row' alignItems='center' >
              <StarIcon/> {averageRatingOverall.toFixed(1)} overall ({filteredReviews.length} {filteredReviews.length === 1 ? 'rating' : 'ratings'})
            </Stack>
            <Typography variant='h5'>Skills & experience</Typography>
            <Typography variant='body1'>{ user.aboutMe }</Typography>
          </Stack>  
          {/*</Stack>*/}
        </ListItem>
        <Divider />
      </List>
   
      <Typography variant='h5'>Reviews</Typography>
      <Stack 
        direction='row'
        alignItems='center' 
        spacing={2}
        margin={1}
      >
       <StarIcon/> {averageRatingByCategory.toFixed(1)} ({sortedReviews.length} {sortedReviews.length === 1 ? 'rating' : 'ratings'})
      </Stack>
      <Stack
        direction='row'
        margin={1}
      >
      <FormControl sx={{ minWidth: 200 }} size='small'>
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
      
      <FormControl sx={{ minWidth: 200, marginLeft: 1}} spacing={1} size='small'> 
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
                  <Typography variant='h6' sx={{ marginLeft: 1 }}>{ taskCreator.firstName } { taskCreator.lastName[0] }.
                  </Typography> 
              </Stack>
              <Stack
                  direction='row'
                  alignItems='center'
              >
                <Rating name="read-only" value={review.rating} readOnly />
                <Typography variant='h6' sx={{ marginLeft: 1 }} >{ review.title }</Typography>
              </Stack>
        
              <Stack
                direction='row'
                alignItems='center'
              >
                <Chip label={ task.category } variant='outlined'
                
                  //style={{ backgroundColor: theme.palette.virtual.main}}
                  color='primary'
                />
             
                <Typography variant='body2' sx={{ marginLeft: 1 }}> { createdAt.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                  }) }
                </Typography>
              </Stack>
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
