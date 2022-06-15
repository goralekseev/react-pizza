import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CartItem } from "./cartSlice";
import { Sort } from "./filterSlice";

type Pizza = {
  id: string;
  title: string
  type: string;
  size: number;
  price: number;
  count: number;
  imageUrl: string;
}

export enum Status{
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type SearchPizzaParams ={
  sortBy: string;
  order:string;
  category:string;
  search:string;
  currentPage:string;
}

//type fetchPizzasArgs= Record<string, number>

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzaStatus",
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://6292ef7e089f87a57ab6b800.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data as CartItem[];
  }
);

interface PizzaSliceState{
  items: Pizza[] ;
  status: Status
}


const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, //loading | success | error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
  });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
