import { createDB } from './reduxdb'

type todoItem = {
  text : string,
  completed : boolean
}

export const {actions, reducer} = createDB<todoItem>('todos', process.env.PUBLIC_URL + '/todos.json')