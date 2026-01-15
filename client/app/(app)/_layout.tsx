import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useAppSelector } from "../hooks";
import { i18n } from "./index";

export default function Layout() {
  const language = useAppSelector((state) => state.language.language.locale);
  const isTeacherLoggedIn = useAppSelector((state) => {
    return state.teacherlogin.isLoggedIn;
  });

  const isLoggedIn = useAppSelector((state) => {
    return state.auth.user !== undefined && state.auth.user.name.length > 0
      ? true
      : false;
  });

  i18n.locale = language;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{ drawerLabel: i18n.t("home"), title: i18n.t("home") }}
        />
        <Drawer.Screen
          name="signup"
          options={{
            drawerLabel: i18n.t("signup"),
            title: i18n.t("signup"),
            drawerItemStyle: {
              display: isLoggedIn || isTeacherLoggedIn ? "none" : "flex",
            },
          }}
        />
        <Drawer.Screen
          name="login"
          options={{
            drawerLabel: i18n.t("login"),
            title: i18n.t("login"),
            drawerItemStyle: {
              display: isLoggedIn || isTeacherLoggedIn ? "none" : "flex",
            },
          }}
        />
        <Drawer.Screen
          name="teacherLogin"
          options={{
            drawerLabel: i18n.t("teacher_login"),
            title: i18n.t("teacher_login"),
            drawerItemStyle: {
              display:
                !isLoggedIn && !isTeacherLoggedIn && __DEV__ ? "flex" : "none",
            },
          }}
        />
        <Drawer.Screen
          name="studentlogin"
          options={{
            drawerLabel: "Student Login",
            title: "Student Login",
            drawerItemStyle: {
              display: !isLoggedIn && __DEV__ ? "flex" : "none",
            },
          }}
        />
        <Drawer.Screen
          name="teacherDashboard"
          options={{
            drawerLabel: i18n.t("teacher_dashboard"),
            title: i18n.t("teacher_dashboard"),
            drawerItemStyle: {
              display: isTeacherLoggedIn && __DEV__ ? "flex" : "none",
            },
          }}
        />
        <Drawer.Screen
          name="dashboard"
          options={{
            drawerLabel: i18n.t("dashboard"),
            title: i18n.t("dashboard"),
            drawerItemStyle: {
              display: isLoggedIn ? "flex" : "none",
            },
          }}
        />
        <Drawer.Screen
          name="(students)"
          options={{
            drawerLabel: i18n.t("students"),
            title: i18n.t("students"),
            drawerItemStyle: {
              display: isLoggedIn ? "flex" : "none",
            },
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="(fee)"
          options={{
            drawerLabel: i18n.t("fees"),
            title: i18n.t("fees"),
            drawerItemStyle: {
              display: isLoggedIn ? "flex" : "none",
            },
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="calender"
          options={{
            drawerLabel: i18n.t("attendance"),
            title: i18n.t("attendance"),
            drawerItemStyle: {
              display: __DEV__ && isLoggedIn ? "flex" : "none",
            },
          }}
        />
        <Drawer.Screen
          name="class"
          options={{
            drawerLabel: i18n.t("class"),
            title: i18n.t("class"),
            drawerItemStyle: { display: isLoggedIn ? "flex" : "none" },
          }}
        />
        <Drawer.Screen
          name="section"
          options={{
            drawerLabel: i18n.t("section"),
            title: i18n.t("section"),
            drawerItemStyle: { display: isLoggedIn ? "flex" : "none" },
          }}
        />
        <Drawer.Screen
          name="subject"
          options={{
            drawerLabel: i18n.t("subject"),
            title: i18n.t("subject"),
            drawerItemStyle: { display: isLoggedIn ? "flex" : "none" },
          }}
        />
        <Drawer.Screen
          name="teacher"
          options={{
            drawerLabel: i18n.t("teacher"),
            title: i18n.t("teacher"),
            drawerItemStyle: { display: isLoggedIn ? "flex" : "none" },
          }}
        />
        <Drawer.Screen
          name="announcement"
          options={{
            drawerLabel: i18n.t("announcement"),
            title: i18n.t("announcement"),
            drawerItemStyle: {
              display: __DEV__ && isLoggedIn ? "flex" : "none",
            },
          }}
        />
        <Drawer.Screen
          name="task"
          options={{
            drawerLabel: i18n.t("task"),
            title: i18n.t("task"),
            drawerItemStyle: {
              display: __DEV__ && isLoggedIn ? "flex" : "none",
            },
          }}
        />
        <Drawer.Screen
          name="staff"
          options={{
            drawerLabel: i18n.t("staff"),
            title: i18n.t("staff"),
            drawerItemStyle: {
              display: __DEV__ && isLoggedIn ? "flex" : "none",
            },
          }}
        />
        <Drawer.Screen
          name="homework"
          options={{
            drawerLabel: i18n.t("homework"),
            title: i18n.t("homework"),
            drawerItemStyle: {
              display:
                (__DEV__ && isLoggedIn) || (__DEV__ && isTeacherLoggedIn)
                  ? "flex"
                  : "none",
            },
          }}
        />
        <Drawer.Screen
          name="assingment"
          options={{
            drawerLabel: i18n.t("assingment"),
            title: i18n.t("assingment"),
            drawerItemStyle: {
              display: __DEV__ && isLoggedIn ? "flex" : "none",
            },
          }}
        />
        <Drawer.Screen
          name="language"
          options={{
            drawerLabel: i18n.t("language"),
            title: i18n.t("language"),
            drawerItemStyle: {
              display: "flex",
            },
          }}
        />
        <Drawer.Screen
          name="teacherLogout"
          options={{
            drawerLabel: i18n.t("teacher_logout"),
            title: i18n.t("teacher_logout"),
            drawerItemStyle: { display: isTeacherLoggedIn ? "flex" : "none" },
          }}
        />
        <Drawer.Screen
          name="logout"
          options={{
            drawerLabel: i18n.t("logout"),
            title: i18n.t("logout"),
            drawerItemStyle: { display: isLoggedIn ? "flex" : "none" },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
