import { createSlice } from "@reduxjs/toolkit";
import * as Localization from "expo-localization";

interface ILanguage {
  language: {
    locale: string;
  };
}

const languageState: ILanguage = {
  language: {
    locale: Localization.locale,
  },
};

const languageSlice = createSlice({
  name: "language",
  initialState: languageState,
  reducers: {
    changeLanguage: (state, action) => {
      state.language.locale = action.payload;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
