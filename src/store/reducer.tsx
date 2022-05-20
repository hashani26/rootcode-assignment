import { createSlice } from '@reduxjs/toolkit'

export interface CartState {
  total: number
}

const initialState: CartState = {
    total: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increment: (state) => {
            console.log('state', state)
            
            state.total++
        }
    },
})

// Action creators are generated for each case reducer function
export const { increment} = cartSlice.actions

export default cartSlice.reducer