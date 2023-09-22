import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState_origin = {
  processNo: -1,
  processList: [
    // process1: 부품 사전 선택
    {
      item0: "",
      item1: "",
      item2: "",
      item3: "",
      item4: "",
      item5: "",
      item6: "",
      item7: "",
      item8: "",
    },
    // process2: 용도 선택
    { usage: "" },
    // process3: 세부 용도 선택
    { program: "", spec: [] },
    // process4: 예산 선택
    { budget: "" },
    // process5: 우선순위 선택
    { priority1: "", priority2: "", priority3: "" },
  ],
};

const recommendSlice = createSlice({
  name: "recommend",
  initialState: initialState_origin,
  reducers: {
    resetProcessAll: () => {
      return initialState_origin;
    },
    setProcessNo: (state, action) => {
      state.processNo = action.payload;
    },
    addProcess: (state, action) => {
      console.log(`before: ${state.processList[state.processNo]}`);
      console.log(action.payload);
      state.processNo++;
      state.processList[state.processNo] = {
        ...state.processList[state.processNo],
        ...action.payload,
      };
      console.log(`after: ${JSON.stringify(initialState_origin)}`);
    },
    removeProcess: (state) => {
      state.processList[state.processNo] = initialState_origin[state.processNo];
      state.processNo--;
    },
  },
});

export const { resetProcessAll, setProcessNo, addProcess, removeProcess } =
  recommendSlice.actions;
export default recommendSlice.reducer;
