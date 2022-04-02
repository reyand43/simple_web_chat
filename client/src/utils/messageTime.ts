import { format, isToday } from 'date-fns'

export const messageTime = (time: Date) => {
  const date = new Date(time)
  if (isToday(date)) {
    return format(date, 'kk:mm')
  } else {
    return format(date, 'dd.MM kk:mm')
  }
}
