import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name:"posts",
    initialState:{
        items: []
    },
    reducers:{
        addPost :(state , action)=>{
            state.items.push(action.payload)
        },
        DeleteFromTable : (state , action )=>{
            state.items = state.items.filter(item => item.id !== action.payload.id)
        },
        updatePost : (state , action)=>{
            state.items.map((item)=>{
                if(item.id == action.payload.id){
                    item.fname = action.payload.fname
                    item.lname = action.payload.lname
                    item.email = action.payload.email
                    item.phone = action.payload.phone
                  
                }
            })
        }
    }
})
export const { addPost , DeleteFromTable  , updatePost} = postsSlice.actions
export default postsSlice.reducer