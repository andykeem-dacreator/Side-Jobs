import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createMessage, fetchMessages } from '../store';

const Chats = ({ taskId }) => {
  const { messages, auth, onlineUsers } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages(taskId));
  }, [dispatch, taskId]);

  const chatMap = messages
    .filter(message => message.taskId === taskId)
    .reduce((acc, message) => {
      const withUser = message.fromId === auth.id ? message.to : message.from;
      const online = onlineUsers.find(user => user.id === withUser.id);
      acc[withUser.id] = acc[withUser.id] || { messages: [], withUser, online };
      acc[withUser.id].messages.push({ ...message, mine: auth.id === message.fromId });
      return acc;
    }, {});
  const chats = Object.values(chatMap);

  return (
    <div id='chats'>
      {chats.map((chat, idx) => {
        return (
          <div key={idx} className={chat.online ? 'online' : ''}>
            <h3>{chat.withUser.username}</h3>
            <ul>
              {chat.messages.map(message => {
                return (
                  <li key={message.id} className={!message.mine ? 'yours' : ''}>
                    {message.txt}
                    {' '}
                    from {message.mine ? 'you' : chat.withUser.username}
                  </li>
                );
              })}
            </ul>
            <form
              onSubmit={ev => {
                ev.preventDefault();
                const txt = ev.target.querySelector('input').value;
                dispatch(createMessage({ txt, toId: chat.withUser.id, taskId }));
                ev.target.querySelector('input').value = '';
              }}
            >
              <input placeholder={`send message to ${chat.withUser.username}`} />
            </form>
          </div>
        );
      })}
    </div>
  );
};

export default Chats;
