import { FC, useMemo } from 'react';
import { IMessage } from '../../types/message';
import { messageTime } from '../../utils/messageTime';
import styles from './LocalMessage.module.scss';

interface IProps {
  message: IMessage
}

const LocalMessage: FC<IProps> = ({ message }) => {
  const time = useMemo(() => messageTime(message.time), [message.time])

  return (
    <div className={styles.root}>
      <div className={styles.block}>
        <span className={styles.text}>{message.text}</span>
        <span className={styles.time}>{time}</span>
      </div>
    </div>
  )
}

export default LocalMessage;