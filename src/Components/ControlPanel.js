import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const UserControl = () => {
  const { auth } = useSelector((state) => state);
  console.log(auth);
  return (
    <div>
      <h1>Control Panel</h1>
      Welcome Admin {auth.firstName}
    </div>
  );
};

export default UserControl;
