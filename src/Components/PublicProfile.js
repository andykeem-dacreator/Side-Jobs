import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const PublicProfile = () => {
  const { users } = useSelector((state) => state);
  const { id } = useParams();
  const user = users.find((user) => user.id === id);
  const dispatch = useDispatch();

  return (
    <div>
      <h1> {user.firstName} Profile </h1>
    </div>
  );
};

export default PublicProfile;
