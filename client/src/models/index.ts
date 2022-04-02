import { Models } from '@rematch/core'
import { localData } from './local'
import { messagesData } from './messages'
import { usersData } from './users'

export interface RootModel extends Models<RootModel> {
  usersData: typeof usersData,
  messagesData: typeof messagesData,
  localData: typeof localData,
}

export const models: RootModel = { usersData, messagesData, localData }