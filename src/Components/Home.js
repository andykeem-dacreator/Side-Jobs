import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src="https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2018/08/29121018/ExtraIncome-1024x512.jpg"
          style={{
            width: '80%',
            height: '70%',
            paddingBottom: '1rem',
            paddingTop: '1rem',
          }}
        />
      </div>
      <div>
        {/* Welcome { auth.username }!!
        <button onClick={()=> dispatch(logout())}>Logout</button> */}
        <p
          className="introStatement"
          style={{
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            fontSize: '20px',
            margin: '10px',
          }}
        >
          Introducing a versatile platform that caters to both job posters and
          job seekers, this company provides a convenient space for users to
          post and accept random side jobs. It serves as a go-to resource for
          individuals seeking additional income opportunities, facilitating the
          seamless connection between those in need of assistance and those
          eager to take on extra hustle.
        </p>
      </div>
      <div className="featured">
        <img
          src="https://support.pingidentity.com/servlet/servlet.FileDownload?file=00P1W00001Jyy6dUAB"
          // style={{ width: 'auto', height: '100%', objectFit: 'contain', margin: 20 }}
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/f4/Inc._magazine_logo.png"
          // style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Shark_Tank_TV_logo.svg/2560px-Shark_Tank_TV_logo.svg.png"
          // style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
        />
      </div>
    </div>
  );
};

export default Home;
