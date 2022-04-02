import { FC, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CLIENT_URL } from '../../const/CLIENT_URL';
import { SocketContext } from '../../context/SocketContext';
import ACTIONS from '../../const/actions';
import styles from './AuthContainer.module.scss';
import { v4 as uuid } from 'uuid';

const AuthContainer: FC = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setError('');
    setName(e.currentTarget.value);
  }

  const handleSubmit = useCallback(() => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    const id = uuid();
    window.localStorage.setItem('name', name);
    window.localStorage.setItem('id', id);
    socket.emit(ACTIONS.JOIN, {
      name,
      id,
    });
    navigate(CLIENT_URL.CHAT)
  }, [name, socket])

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Hello</h1>
      <input className={styles.input} placeholder='Enter your name to start Chat' onChange={handleChange} />
      <span className={styles.error}>&nbsp;{error}&nbsp;</span>
      <button className={styles.submit} onClick={handleSubmit}>
          Let's go!
      </button>
    </div>
  )
}

export default AuthContainer;
