import React, { FC, ReactNode, useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { SocketContext } from '../context/SocketContext'
import ACTIONS from '../const/actions'
import { Dispatch } from '../store';
import { IMessage } from '../types/message';

interface Props {
  children: ReactNode;
}

const MessagesHOC: FC<Props> = ({ children }) => {
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    socket.on(ACTIONS.NEW_MESSAGE, (messages: IMessage[]) => {
      dispatch.messagesData.addMessageReducer(messages)
    })
  }, [])

  return <>{children}</>
}

export default MessagesHOC