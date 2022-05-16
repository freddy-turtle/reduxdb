import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

import { castDraft } from 'immer'



type loading = "idle" | "pending"
type error = {message? : string}
type withID<T> = T & {id : string}
type DBstate<T> = {
  loading : loading,
  uploading : loading,
  fetchError : error,
  uploadError : error,
  db : Array<withID<T>>
}


export function createDB<T>(dbname : string, filePath: string){

  const fetchDB = createAsyncThunk(
    `reduxdb/${dbname}/fetchdb`,
    async () => {
      const response = await fetch(filePath)
      return await response.json()
    }
  )

  const uploadDB = createAsyncThunk(
    `reduxdb/${dbname}/uploaddb`,
    async () => {
      await fetch(filePath, {method : "POST"})
    }
  )

  const {actions, reducer} = createSlice({
    name: `reduxdb/${dbname}`,
    initialState : { 
      loading : "idle", 
      uploading: "idle", 
      db : [], 
      fetchError: null, 
      uploadError : null
    } as DBstate<T>,
    reducers: {
      insert(state, action : PayloadAction<T>) {
        state.db.push(castDraft({
          id: nanoid(),
          ...action.payload
        }))
      },
      update(state, action : PayloadAction<withID<T>>) {
        const index = state.db.findIndex(todo => todo.id === action.payload.id)
        state.db[index] = castDraft(action.payload)
      },
      delete(state, action : PayloadAction<string>) {
        for( var i = 0; i < state.db.length; i++){                          
          if ( state.db[i].id === action.payload) { 
            state.db.splice(i, 1); 
            i--; 
          }
        }
      },
      reorder(state, action : PayloadAction<{sourceIndex : number, destinationIndex:number}>) {
        const [reorderedItem] = state.db.splice(action.payload.sourceIndex, 1);
        state.db.splice(action.payload.destinationIndex, 0, reorderedItem);
      }

    },
    extraReducers : (builder) => {
      builder
        .addCase(fetchDB.fulfilled, (state, action) => {
          state.db = action.payload
          state.loading = "idle"
        })
        .addCase(fetchDB.pending, (state) => {
          state.loading = "pending"
        })
        .addCase(fetchDB.rejected, (state, action) => {
          state.loading = "idle"
          state.fetchError = action.error
        })
        .addCase(uploadDB.fulfilled, (state) => {
          state.uploading = "idle"
        })
        .addCase(uploadDB.pending, (state) => {
          state.uploading = "pending"
        })
        .addCase(uploadDB.rejected, (state, action) => {
          state.uploading = "idle";
          state.uploadError = action.error
        })
    }
  })

  return {
    reducer,
    actions: {...actions, fetchDB}
  }
}
