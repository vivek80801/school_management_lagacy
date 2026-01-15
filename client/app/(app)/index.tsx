import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { I18n } from "i18n-js";
import { en, hi } from "../../translations";
import CopyRight from "../../componenets/copyRights";
import { Link } from "expo-router";
import { useAppDispatch, useAppSelector } from "../hooks";
import { changeLanguage } from "../../features/language/languageSlice";

export const i18n = new I18n({ en, hi });

export default function Index() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const teacher = useAppSelector((state) => state.teacherlogin.teacher);
  const language = useAppSelector((state) => state.language.language.locale);

  i18n.enableFallback = true;
  if (language === "en-US") {
    dispatch(changeLanguage("en"));
  }
  i18n.locale = language;

  return (
    <SafeAreaView>
      <Text>
        {i18n.t("welcome")}{" "}
        {user.name.length > 0 ? (
          <Link
            style={{ color: "#0000ff", fontWeight: "bold" }}
            href={"dashboard"}
          >
            {i18n.t("dashboard")}
          </Link>
        ) : teacher.name.length > 0 ? (
          <Link
            style={{ color: "#0000ff", fontWeight: "bold" }}
            href={"teacherDashboard"}
          >
            {i18n.t("dashboard")}
          </Link>
        ) : (
          <Link style={{ color: "#0000ff", fontWeight: "bold" }} href={"login"}>
            {i18n.t("login")}
          </Link>
        )}
      </Text>
      <CopyRight />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
