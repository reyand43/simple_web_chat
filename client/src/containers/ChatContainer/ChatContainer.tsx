import classNames from 'classnames';
import React, { FC, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import LocalMessage from '../../components/LocalMessage/LocalMessage';
import UserItem from '../../components/UserItem/UserItem';
import UserMessage from '../../components/UserMessage/UserMessage';
import { SocketContext } from '../../context/SocketContext';
import ACTIONS from '../../const/actions';
import { RootState } from '../../store';
import styles from './ChatContainer.module.scss';

const ChatContainer: FC = () => {
  const users = useSelector((state: RootState) => state.usersData);
  const messages = useSelector((state: RootState) => state.messagesData);
  const local = useSelector((state: RootState) => state.localData);
  const messageListRef = useRef<HTMLDivElement>(null);
  const messageListWrapperRef = useRef<HTMLDivElement>(null);
  const { socket } = useContext(SocketContext);
  const [messageText, setMessageText] = useState('');

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setMessageText(e.currentTarget.value);
  }, [])

  const handleSend = useCallback(() => {
    if (!messageText) {
      return
    }
    socket.emit(ACTIONS.SEND_MESSAGE, { text: messageText })
    setMessageText('');
  }, [messageText])

  const handleClickEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13) {
      handleSend()
    }
  }

  useEffect(() => {
    if (
      messageListRef.current &&
      messageListWrapperRef.current 
    ) {
      messageListWrapperRef.current?.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.chat}>
          <div className={classNames(styles.messages, {
            [styles.empty]: !messages.length
          })} ref={messageListRef}>
            {messages.length ? <div className={styles.messagesWrapper} ref={messageListWrapperRef}>
              {messages.map((m) => m.senderId === local.id ?
                <LocalMessage message={m} key={m.id} />
                : <UserMessage message={m} key={m.id} />
              )}
            </div> : <span className={styles.noMessages}>No messages yet</span>}
          </div>
          <div className={styles.inputWrapper}>
            <input className={styles.input} onChange={handleChange} onKeyDown={handleClickEnter} value={messageText}/>
            <button className={styles.sendButton} onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
        <div className={styles.users}>
          <span className={styles.users__title}>Online users ({users.length})</span>
          {users.map((user) => (
            <UserItem name={user.name} id={user.id} key={user.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChatContainer