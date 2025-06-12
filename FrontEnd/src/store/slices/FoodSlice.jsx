import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
    data : []
}

const FoodSlice = createSlice({
  name: "foods",
  initialState: initial_state,
  reducers: {
    set_foods_data : (state,action)=>{
      state.data = action.payload;
    }
  },
});

export const { set_foods_data } = FoodSlice.actions; 
export default FoodSlice.reducer;
