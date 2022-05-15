import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

import { castDraft } from 'immer'




type withID<T> = T & {id : string}
type DBstate<T> = {
  type: string,
  db : Array<withID<T>>
}

export function createDB<T>(dbname : string, initialDB : Array<withID<T>>){



  return createSlice({
    name: `reduxdb/${dbname}`,
    initialState : { type : "", db : initialDB} as DBstate<T>,
    reducers: {
      insert(state, action : PayloadAction<T>) {
        state.db.push(castDraft({
          id: nanoid(),
          ...action.payload
        }))
        state.type = action.type
      },
      update(state, action : PayloadAction<withID<T>>) {
        const index = state.db.findIndex(todo => todo.id === action.payload.id)
        state.db[index] = castDraft(action.payload)
        state.type = action.type
      },
      delete(state, action : PayloadAction<string>) {
        for( var i = 0; i < state.db.length; i++){                          
          if ( state.db[i].id === action.payload) { 
            state.db.splice(i, 1); 
            i--; 
          }
        }
        state.type = action.type
      },
      reorder(state, action : PayloadAction<{sourceIndex : number, destinationIndex:number}>) {
        const [reorderedItem] = state.db.splice(action.payload.sourceIndex, 1);
        state.db.splice(action.payload.destinationIndex, 0, reorderedItem);
        state.type = action.type
      }

    }
  })
}
