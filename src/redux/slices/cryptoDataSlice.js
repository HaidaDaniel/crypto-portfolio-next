import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cryptoData: [],
    loading: false,
    error: null,
};

const cryptoDataSlice = createSlice({
    name: 'cryptoData',
    initialState,
    reducers: {
        fetchCryptoDataStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCryptoDataSuccess: (state, action) => {
            state.loading = false;
            state.cryptoData = action.payload;
        },
        fetchCryptoDataFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchCryptoDataStart,
    fetchCryptoDataSuccess,
    fetchCryptoDataFailure,
} = cryptoDataSlice.actions;

export default cryptoDataSlice.reducer;