import React, { useState } from "react";
import { Calendar, DateData  } from "react-native-calendars";

const Calender = () => {
  const [selected, setSelected] = useState("");

  const handleAttendence = (day: DateData) => {
    console.log("day: ", day);
    setSelected(day.dateString);
    console.log("Selected Date: ", selected);
  };

  return (
    <Calendar
      onDayPress={(day) => handleAttendence(day)}
      markedDates={{
        [selected]: {
          selected: true,
          disableTouchEvent: true,
          selectedDotColor: "orange",
        },
      }}
    />
  );
};

export default Calender;
