import React, { FC, ReactNode, useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { SocketContext } from '../context/SocketContext'
import ACTIONS from '../const/actions'
import { Dispatch } from '../store';
import { IUser } from '../types/user';

interface Props {
  children: ReactNode;
}

const UsersHOC: FC<Props> = ({ children }) => {
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    socket.on(ACTIONS.NEW_USER, (users: IUser[]) => {
      dispatch.usersData.addUserReducer(users);
    })

    socket.on(ACTIONS.USER_LEFT, (userId: string) => {
      dispatch.usersData.removeUserReducer(userId);
    })
  }, [])
  return <>{children}</>
}

export default UsersHOC