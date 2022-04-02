import React, { FC, ReactNode, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CLIENT_URL } from '../const/CLIENT_URL';
import { SocketContext } from '../context/SocketContext'
import ACTIONS from '../const/actions'
import { Dispatch, RootState } from '../store';

interface Props {
  children: ReactNode;
}

const AuthHOC: FC<Props> = ({ children }) => {
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch<Dispatch>();
  const local = useSelector((state: RootState) => state.localData);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const name = window.localStorage.getItem('name')
    const id = window.localStorage.getItem('id')
    if ((!local.id || !local.name) && name && id) {
      if (name && id && location.pathname === CLIENT_URL.CHAT) {
        socket.emit(ACTIONS.JOIN, {
          name,
          id,
        });
        dispatch.localData.setLocalReducer({
          name,
          id,
        })
      } else {
        navigate(CLIENT_URL.INDEX)
      }
    }
  }, [])
  return <>{children}</>
}

export default AuthHOC