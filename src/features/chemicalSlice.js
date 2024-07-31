import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chemicals: JSON.parse(localStorage.getItem("chemicals")) || [
    { id: 1, name: "Hydrochloric Acid", formula: "HCL" },
    { id: 2, name: "Sodium Cloride", formula: "NaCl" },
    { id: 3, name: "Sulfuric Acid", formula: "H2SO4" },
    { id: 4, name: "Ammonia", formula: "NH3" },
    { id: 5, name: "Ethanol", formula: "C2H5OH" },
  ],
};
export const chemicalSlice = createSlice({
  name: "chemicals",
  initialState,
  reducers: {
    addChemical: (state, action) => {
      state.items.push(action.payload);
    },
    removeChemical: (state, action) => {
      state.items = state.items.filter(
        (item, index) => index !== action.payload
      );
    },
    editChemical(state, action) {
      state.chemicals = state.chemicals.map((item) =>
        item.id === action.payload.id
          ? { ...item, name: action.payload.name }
          : item
      );
      localStorage.setItem("chemicals", JSON.stringify(state.chemicals));
    },
    filterChemical(state, action) {
      state.chemicals = state.chemicals.filter(
        (item) => item.name === action.payload
      );
      console.log(action.payload);
    },
  },
});

export const { addChemical, removeChemical, editChemical, filterChemical } =
  chemicalSlice.actions;
export default chemicalSlice.reducer;
