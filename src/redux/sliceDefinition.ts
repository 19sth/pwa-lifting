import { INavItem } from "../components/mulayout";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { APP_NAME } from "../utils/constants";

export interface Exercise {
  name: string;
  setCount: number;
  reps: number;
}

export interface DefinitionItem {
  id: number;
  name: string;
  exercises: Exercise[];
}

export interface DefinitionState {
  items: DefinitionItem[];
}

const initialState: DefinitionState = {
  items: [],
};

export const definitionSlice = createSlice({
  name: "definition",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<DefinitionItem>) => {
      const newItem = {
        ...action.payload,
        id: state.items.length > 0 ? Math.max(...state.items.map(item => item.id)) + 1 : 1
      };
      state.items.push(newItem);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateItem: (state, action: PayloadAction<DefinitionItem>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { addItem, removeItem, updateItem } = definitionSlice.actions;

export default definitionSlice.reducer;
