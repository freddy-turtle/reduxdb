import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

// Define a type for the slice state
interface TodosItem {
  id : string,
  text : string,
  completed : boolean,
}

interface TodosState extends Array<TodosItem>{}

// Define the initial state using that type
const initialState: TodosState = [
  { id: "1", text: "Go to the Swimming Pool 🏊" , completed : true},
  { id: "2", text:  "Watch a movie 🎬" , completed : true},
  { id: "3", text: "Check your agenda 📅" , completed : true},
]

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action : PayloadAction<string>) {
      state.push({
        id: nanoid(),
        text: action.payload,
        completed: false
      })
    },
    todoToggled(state, action : PayloadAction<string>) {
      const todo = state.find(todo => todo.id === action.payload)
      todo.completed = !todo.completed
    },
    todoEdited(state, action : PayloadAction<{id : string, text : string}>) {
      const todo = state.find(todo => todo.id === action.payload.id)
      todo.text = action.payload.text
    },
    todoDeleted(state, action : PayloadAction<string>) {
      for( var i = 0; i < state.length; i++){                          
        if ( state[i].id === action.payload) { 
          state.splice(i, 1); 
          i--; 
        }
      }
    },
    todoReordered(state, action : PayloadAction<{sourceIndex : number, destinationIndex:number}>) {
      const [reorderedItem] = state.splice(action.payload.sourceIndex, 1);
      state.splice(action.payload.destinationIndex, 0, reorderedItem);
    }

  }
})

export const { todoAdded, todoToggled, todoDeleted, todoReordered, todoEdited } = todosSlice.actions
export default todosSlice.reducer