import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';

const Home = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img 
          src="https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2018/08/29121018/ExtraIncome-1024x512.jpg"
          style={{ width: '80%', height: '70%', paddingBottom: '1rem', paddingTop: '1rem' }}
        />
      </div>  
      <div>
        {/* Welcome { auth.username }!!
        <button onClick={()=> dispatch(logout())}>Logout</button> */}
        <p style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '20px' }}>
          With the prices of everything going up, one income source may be hard to live off of. Some might also pay for convenience. Our job borad allows users to post side quests for others to do and get compensated. Add a job or accept a job today!
        </p>
      </div>
      <div className='featured' >
          <img 
            src='https://support.pingidentity.com/servlet/servlet.FileDownload?file=00P1W00001Jyy6dUAB'
            // style={{ width: 'auto', height: '100%', objectFit: 'contain', margin: 20 }}
          />
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/f/f4/Inc._magazine_logo.png'
            // style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
          />
          <img 
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Shark_Tank_TV_logo.svg/2560px-Shark_Tank_TV_logo.svg.png'
            // style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
          />  
        </div>

    </div>
  );
};

export default Home;
