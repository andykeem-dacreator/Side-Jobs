import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createMessage, fetchMessages } from '../store';

const Chats = ({ taskId, task }) => {
  const { messages, auth } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages(taskId));
  }, [dispatch, taskId]);

  const chatMap = messages
    .filter(message => message.taskId === taskId)
    .reduce((acc, message) => {
      const withUser = message.fromId === auth.id ? message.to : message.from;
      acc[withUser.id] = acc[withUser.id] || { messages: [], withUser };
      acc[withUser.id].messages.push({ ...message, mine: auth.id === message.fromId });
      return acc;
    }, {});
  const chats = Object.values(chatMap);

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = (chat, ev) => {
    ev.preventDefault();
    const txt = ev.target.querySelector('input').value;
    try {
      if (chat) {
        dispatch(createMessage({ txt, toId: chat.withUser.id, taskId }));
      } else {
        const toId = task.taskDoerId === auth.id ? task.userId : task.taskDoerId;
        dispatch(createMessage({ txt, toId, taskId }));
      }
    } catch (error) {
      console.error('Error:', error);
    }
    ev.target.querySelector('input').value = '';
  };

  return (
    <div id='chats'>
      {chats.map((chat, idx) => {
        return (
          <div key={idx} className="chat-container">
            <h3>Chat with {chat.withUser.username}</h3>
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
            <form onSubmit={sendMessage.bind(null, chat)}>
              <input placeholder={`send message to ${chat.withUser.username}`} />
            </form>
          </div>
        );
      })}

      {chats.length === 0 && (
        <div className="no-chats">
          <h3>Start a Conversation</h3>
          <form onSubmit={sendMessage.bind(null, null)}>
            <input
              placeholder="Start a conversation"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Chats;
