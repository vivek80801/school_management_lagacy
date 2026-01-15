import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import studentReducer from "../features/student/studentSlice";
import sectionReducer from "../features/section/sectionSlice";
import classReducer from "../features/class/classSlice";
import subjectReducer from "../features/subject/subjectSlice";
import teacherReducer from "../features/teacher/teacherSlice";
import teacherloginReducer from "../features/teacherlogin/teacherloginSlice";
import feeReducer from "../features/fee/feeSlice";
import languageReducer from "../features/language/languageSlice";
import homeworkReducer from "../features/homework/homeworkSlice";
import studentLoginReducer from "../features/studentlogin/studentloginSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    fee: feeReducer,
    class: classReducer,
    section: sectionReducer,
    subject: subjectReducer,
    teacher: teacherReducer,
    teacherlogin: teacherloginReducer,
    language: languageReducer,
    homework: homeworkReducer,
    studentlogin: studentLoginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
