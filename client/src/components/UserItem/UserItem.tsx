import Avatar from 'boring-avatars'
import React, { FC, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { IUser } from '../../types/user'
import { ucFirst } from '../../utils/ucFirst';
import styles from './UserItem.module.scss';

const UserItem: FC<IUser> = ({ name, id }) => {
  const ucName = useMemo(() => ucFirst(name), [name])
  const local = useSelector((state: RootState) => state.localData);

  return (
    <div className={styles.root}>
      <Avatar name={id} variant="beam"></Avatar>
      <span className={styles.name}>
        {id === local.id ? `${ucName} (You)` : ucName}
      </span>
    </div>
  )
}

export default React.memo(UserItem);