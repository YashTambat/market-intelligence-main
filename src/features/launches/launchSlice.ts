import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { spaceXApi } from '../../services/api';

export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  details: string | null;
  flight_number: number;
  rocket: string;
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    webcast: string | null;
    wikipedia: string | null;
    article: string | null;
  };
  payloads: string[];
  ships: string[];
  capsules: string[];
  failures: Array<{
    time: number;
    altitude: number | null;
    reason: string;
  }>;
  cores: Array<{
    core: string;
    flight: number;
    landing_success: boolean | null;
    landing_type: string | null;
    landpad: string | null;
  }>;
  launchpad: string;
}

interface LaunchState {
  items: Launch[];
  loading: boolean;
  error: string | null;
}

const initialState: LaunchState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchLaunches = createAsyncThunk(
  'launches/fetchLaunches',
  async () => {
    const response = await spaceXApi.get('/launches');
    return response.data;
  }
);

const launchSlice = createSlice({
  name: 'launches',
  initialState,
  reducers: {
    clearLaunches(state) {
      state.items = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaunches.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLaunches.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(fetchLaunches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch launches';
      });
  },
});

export const { clearLaunches } = launchSlice.actions;
export default launchSlice.reducer;
