import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applicants: {
    applications: [] // this must match what ApplicantsTable uses
  }
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setAllApplicants: (state, action) => {
      state.applicants = action.payload; // payload must be { applications: [...] }
    }
  }
});

export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;
