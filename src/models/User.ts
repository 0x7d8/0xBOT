import DatabaseObject, { DatabaseObjectInfos, DatabaseObjectControl } from "@/models/DatabaseObject";

export const UserDefault: User = {
  id: '',
  name: '',
  tag: '',
  avatar: '',
  email: '',
  tokens: {
    auth: '',
    access: '',
    refresh: ''
  }, economy: {
    money: 0,
    quotes: 0,
    votes: 0
  }
}

export const UserInfos: DatabaseObjectInfos<User> = {
  table: 'users',
  mapping: {
    id: 'id',
    name: 'name',
    tag: 'tag',
    avatar: 'avatar',
    email: 'email',
    tokens: {
      auth: 'authtoken',
      access: 'accesstoken',
      refresh: 'refreshtoken',
    }, economy: {
      money: 'economymoney',
      quotes: 'economyquotes',
      votes: 'economyvotes'
    }
  }
}

export interface User {
  id: string
  name: string
  tag: string
  avatar: string
  email: string
  tokens: {
    auth: string
    access: string
    refresh: string
  }, economy: {
    money: number
    quotes: number
    votes: number
  }
}

export interface UserSearch {
  id: string
  email: string
}

export type UserControl = DatabaseObjectControl<User, UserSearch>

export default class UserObject extends DatabaseObject<User, UserSearch> {
  /** Create a new User Object */
  constructor() {
    super()

    this.default = UserDefault
    this.infos = UserInfos
  }
}