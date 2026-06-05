import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import billingPeriodService from "../../services/billingPeriodsService";


export const fetchBillingPeriods =
createAsyncThunk(
  "paidCustomerImport/fetchBillingPeriods",

  async () => {

    const response =
      await billingPeriodService
        .getBillingPeriods({
          page: 0,
          size: 100
        });

    return response.data.data.content;

  }
);

const initialState = {

  periods: [],

  selectedPeriodId: "",

  loadingPeriods: false,

};

const paidCustomerImportSlice =
createSlice({

  name: "paidCustomerImport",

  initialState,

  reducers: {

    setSelectedPeriodId(
      state,
      action
    ) {

      state.selectedPeriodId =
        action.payload;

    }

  },

  extraReducers: builder => {

    builder

      .addCase(
        fetchBillingPeriods.pending,
        state => {

          state.loadingPeriods =
            true;

        }
      )

      .addCase(
        fetchBillingPeriods.fulfilled,
        (
          state,
          action
        ) => {

          state.loadingPeriods =
            false;

          state.periods =
            action.payload;

          const openPeriod =
            action.payload.find(
              x =>
                x.status === "OPEN"
            );

          if (openPeriod) {

            state.selectedPeriodId =
              openPeriod.id;

          }

        }
      )

      .addCase(
        fetchBillingPeriods.rejected,
        state => {

          state.loadingPeriods =
            false;

        }
      );

  }

});

export const {
  setSelectedPeriodId
} =
paidCustomerImportSlice.actions;

export default
paidCustomerImportSlice.reducer;