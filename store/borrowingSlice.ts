import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BorrowState {
    borrowingBooks: string[]; // Use an array instead of a Set
}

const initialState: BorrowState = {
    borrowingBooks: [],
};

const borrowSlice = createSlice({
    name: 'borrow',
    initialState,
    reducers: {
        startBorrowing: (state, action: PayloadAction<string>) => {
            if (!state.borrowingBooks.includes(action.payload)) {
                state.borrowingBooks.push(action.payload); // Add bookId to the array
            }
        },
        stopBorrowing: (state, action: PayloadAction<string>) => {
            state.borrowingBooks = state.borrowingBooks.filter(
                (bookId) => bookId !== action.payload
            ); // Remove bookId from the array
        },
    },
});

export const { startBorrowing, stopBorrowing } = borrowSlice.actions;
export default borrowSlice.reducer;