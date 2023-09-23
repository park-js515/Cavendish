import { createSlice } from "@reduxjs/toolkit";

const initialState_origin = {
  processNo: -1,
  processList: [
    // process1: 부품 사전 선택
    [
      { name: "case", value: "-1" },
      { name: "cooler", value: "-1" },
      { name: "cpu", value: "-1" },
      { name: "gpu", value: "-1" },
      { name: "hdd", value: "-1" },
      { name: "mainboard", value: "-1" },
      { name: "power", value: "-1" },
      { name: "ram", value: "-1" },
      { name: "ssd", value: "-1" },
    ],
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
      state.processList[state.processNo] = {
        ...state.processList[state.processNo],
        ...action.payload,
      };
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
