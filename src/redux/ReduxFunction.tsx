import { createSlice } from "@reduxjs/toolkit";
// Define a type for the slice state
interface CounterState {
  role: string;
  email: string | null;
}

// Define the initial state using that type
const initialState: CounterState = {
  role: "",
  email: null,
};

export const adminAuth = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.role = action.payload.role;
      state.email = action.payload.email;
    },
    logOut: (state) => {
      state.role = "";
      state.email = null;
    },
  },
});

export const { setUser, logOut } = adminAuth.actions;

export default adminAuth.reducer;
