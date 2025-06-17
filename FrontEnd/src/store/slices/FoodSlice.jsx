import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
    data: []
}

const FoodSlice = createSlice({
  name: "foods",
  initialState: initial_state,
  reducers: {
    set_foods_data: (state, action) => {
      state.data = action.payload;
    },
    update_food_item: (state, action) => {
      const updatedItem = action.payload;
      state.data = state.data.map(item => 
        item._id === updatedItem._id ? updatedItem : item
      );
    }
  },
});

export const { set_foods_data, update_food_item } = FoodSlice.actions; 
export default FoodSlice.reducer;