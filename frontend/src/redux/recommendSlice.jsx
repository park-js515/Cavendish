import { createSlice } from "@reduxjs/toolkit";

const initialState_origin = {
  processNo: -1,
  selected: 0,
  ramNo: 0,
  processList: [
    // process1: 부품 사전 선택
    [
      { name: "case", value: "-1", id: "" },
      { name: "cooler", value: "-1", id: "" },
      { name: "cpu", value: "-1", id: "" },
      { name: "gpu", value: "-1", id: "" },
      { name: "hdd", value: "-1", id: "" },
      { name: "mainboard", value: "-1", id: "" },
      { name: "power", value: "-1", id: "" },
      { name: "ram", value: "-1", id: "" },
      { name: "ssd", value: "-1", id: "" },
    ],
    // process2: 용도 선택
    { usage: "" },
    // process3: 세부 용도 선택
    { program: "", spec: [] },
    // process4: 예산 선택 (단위: 만원)
    { budget: 0 },
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
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    setProcess: (state, action) => {
      state.processList[state.processNo + 1] = {
        ...state.processList[state.processNo + 1],
        ...action.payload,
      };
    },
    setProcessList0: (state, action) => {
      state.processList[0][state.selected] = {
        ...state.processList[0][state.selected],
        ...action.payload,
      };
    },
    removeProcess: (state) => {
      state.processList[state.processNo] = initialState_origin.processList[state.processNo];
      state.processNo--;
    },
    setRamNo: (state, action) => {
      state.ramNo = action.payload;
    },
  },
});

export const {
  resetProcessAll,
  setProcessNo,
  setSelected,
  setProcessList0,
  setProcess,
  removeProcess,
  setRamNo,
} = recommendSlice.actions;
export default recommendSlice.reducer;
