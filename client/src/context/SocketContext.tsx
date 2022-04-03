import { createContext, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface ContextValue {
  socket: Socket;
}

interface Props {
  children: ReactNode;
}

export const SocketContext = createContext<ContextValue>({} as ContextValue);

export function SocketContextProvider({ children }: Props) {

  const socket = io('http://localhost:3001', {
    transports: ['websocket'],
    reconnectionDelayMax: 10000,
    forceNew: true,
  });
  
  const contextValue = {
    socket,
  };

  return (
    <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>
  );
}