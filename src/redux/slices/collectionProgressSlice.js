import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import {
  getCollectionProgress,
  markDebt,
  printBill
} from "../../services/collectionProgressService";

import consultantService
from "../../services/consultantService";

import billingPeriodsService
from "../../services/billingPeriodsService";

export const fetchCollectionProgress =
  createAsyncThunk(
    "collectionProgress/fetch",

    async (_, thunkAPI) => {

      const state =
        thunkAPI.getState()
          .collectionProgress;

      return await getCollectionProgress({
        page: state.page,
        size: state.size,
        ...state.filters
      });
    }
  );

export const fetchConsultants =
  createAsyncThunk(
    "collectionProgress/fetchConsultants",

    async () => {

      const response =
        await consultantService.getList({
          page: 0,
          size: 100
        });

      return response.data.data;
    }
  );

export const fetchBillingPeriods =
  createAsyncThunk(
    "collectionProgress/fetchBillingPeriods",

    async () => {

      const response =
        await billingPeriodsService.getList({
          page: 0,
          size: 100
        });

      return response.data.data;
    }
  );

  export const printBillRecord =
  createAsyncThunk(

    "collectionProgress/printBill",

    async (
      {
        recordId,
        collectedAmount
      },
      thunkAPI
    ) => {

      await printBill(
        recordId,
        collectedAmount
      );

      thunkAPI.dispatch(
        fetchCollectionProgress()
      );
    }
  );
export const markDebtRecord =
  createAsyncThunk(

    "collectionProgress/markDebt",

    async (
      recordId,
      thunkAPI
    ) => {

      await markDebt(recordId);

      thunkAPI.dispatch(
        fetchCollectionProgress()
      );
    }
  );

const initialState = {

  loading: false,

  records: [],

  consultants: [],

  billingPeriods: [],

  page: 0,

  size: 20,

  totalPages: 0,

  totalElements: 0,

  filters: {

    periodId: "",

    search: "",

    assignedUserId: "",

    collectionStatus: "",

    debtStatus: ""
  }
};

const collectionProgressSlice =
  createSlice({

    name: "collectionProgress",

    initialState,

    reducers: {

      updateFilter: (
        state,
        action
      ) => {

        state.filters = {

          ...state.filters,

          ...action.payload
        };
      },

      resetFilter: (state) => {

        state.filters = {

          periodId: "",

          search: "",

          assignedUserId: "",

          collectionStatus: "",

          debtStatus: ""
        };

        state.page = 0;
      },

      setPage: (
        state,
        action
      ) => {

        state.page =
          action.payload;
      },

      setSize: (
        state,
        action
      ) => {

        state.size =
          action.payload;
      }

    },

    extraReducers: (builder) => {

      builder

        .addCase(
          fetchCollectionProgress.pending,

          (state) => {

            state.loading = true;
          }
        )

        .addCase(
          fetchCollectionProgress.fulfilled,

          (state, action) => {

            state.loading = false;

            state.records =
              action.payload.content;

            state.totalPages =
              action.payload.totalPages;

            state.totalElements =
              action.payload.totalElements;
          }
        )

        .addCase(
          fetchCollectionProgress.rejected,

          (state) => {

            state.loading = false;
          }
        )

        .addCase(
          fetchConsultants.fulfilled,

          (state, action) => {

            state.consultants =
              action.payload.content;
          }
        )

        .addCase(
          fetchBillingPeriods.fulfilled,

          (state, action) => {

            state.billingPeriods =
              action.payload.content;
          }
        );
    }

  });

export const {

  updateFilter,

  resetFilter,

  setPage,

  setSize

} = collectionProgressSlice.actions;

export default
collectionProgressSlice.reducer;