import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createMessage, fetchMessages } from '../store';

const Chats = ({ taskId, task }) => {
  const { messages, auth, users } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages(taskId));
  }, [dispatch, taskId]);

  const chatMap = messages
    .filter((message) => message.taskId === taskId)
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

  const getAvatar = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.avatar : null;
  };

  return (
    <div id="chats">
      {chats.map((chat, idx) => {
        const avatar = auth.id === task.userId ? getAvatar(task.taskDoerId) : getAvatar(task.userId);
        return (
          <div key={idx} className="chat-container">
            <h3>Chat with {chat.withUser.username}</h3>
            <ul>
              {chat.messages.map((message) => {
                const isLoginUser = message.fromId === auth.id;
                const messageAvatar = isLoginUser ? auth.avatar : avatar;
                const messageClassName = isLoginUser ? 'yours' : '';
                return (
                  <li key={message.id} className={messageClassName}>
                    <div className="message-wrapper">
                      <div className="message-avatar">
                        <img src={messageAvatar} alt={isLoginUser ? 'Your Avatar' : `${chat.withUser.username}'s Avatar`} />
                      </div>
                      <div className="message-content">{message.txt}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <form onSubmit={sendMessage.bind(null, chat)}>
              <div className="input-container">
                <input placeholder={`send message to ${chat.withUser.username}`} />
                <button type="submit">Send</button>
              </div>
            </form>
          </div>
        );
      })}

      {chats.length === 0 && (
        <div className="no-chats">
          <h3>Start a Conversation</h3>
          <form onSubmit={sendMessage.bind(null, null)}>
            <div className="input-container">
              <input
                placeholder="Start a conversation"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chats;
