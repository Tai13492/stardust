import React, { useState } from "react";
import { IFieldTimeSlot } from "../App";
import { List } from "antd";

interface IListStyle {
  backgroundColor?: string;
  color: string;
}

const Timeslot = ({
  data,
  key,
  insertIfNotExists
}: {
  data: IFieldTimeSlot;
  key: string;
  insertIfNotExists: any;
}) => {
  const [isClicked, setIsClicked] = useState(false);
  let listStyle: IListStyle = { color: "white" };
  const { user, price } = data;
  if (user !== null || isClicked) {
    listStyle.backgroundColor = "#1890ff";
  }

  return (
    <List.Item
      key={key}
      onClick={() => {
        insertIfNotExists();
        setIsClicked(!isClicked);
      }}
      style={listStyle}
    >
      <div className="timetable-slot">
        {user !== null && user.name + " " + user.phone + " "}
        {price && price + " บาท"}
      </div>
    </List.Item>
  );
};

export default Timeslot;
