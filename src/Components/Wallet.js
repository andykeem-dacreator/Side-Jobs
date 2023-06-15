import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const Wallet = () => {
  const { users, auth } = useSelector((state) => state);
  const { id } = useParams();
  const user = user.find((user) => user.id === id);

  return (
    <div>
      Wallet Balance = {user.wallet};
    </div>
  )
};

export default Wallet;