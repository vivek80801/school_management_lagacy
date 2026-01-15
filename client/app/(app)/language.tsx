import React from "react";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { useAppDispatch, useAppSelector } from "../hooks";
import { changeLanguage } from "../../features/language/languageSlice";
import { i18n } from "./index";

export default function Language() {
  const [tmpLanguage, setTmpLanguage] = React.useState("");
  const languages = ["en", "hi"];
  const languageLables = [i18n.t("english"), i18n.t("hindi")];

  const language = useAppSelector((state) => state.language.language.locale);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView>
      <Picker
        selectedValue={tmpLanguage.length <= 0 ? language : tmpLanguage}
        onValueChange={(itemValue) => setTmpLanguage(itemValue)}
        prompt={i18n.t("choose your language")}
        mode="dialog"
      >
        {languages.length > 0 &&
          languages.map((lang, idx) => (
            <Picker.Item key={idx} label={languageLables[idx]} value={lang} />
          ))}
      </Picker>
      <Button
        onPress={() => dispatch(changeLanguage(tmpLanguage))}
        mode="contained"
        style={{ margin: 5 }}
      >
        {i18n.t("change language")}
      </Button>
    </SafeAreaView>
  );
}
