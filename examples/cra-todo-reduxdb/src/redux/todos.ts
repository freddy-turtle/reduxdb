import todoJSON from './todos.json'
import { createDB } from './reduxdb'

type todoItem = {
  text : string,
  completed : boolean
}

export const {actions, reducer} = createDB<todoItem>('todos', Array.from(todoJSON))