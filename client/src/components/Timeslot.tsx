import React, { useState } from "react";
import { IFieldTimeSlot } from "../App";
import { List } from "antd";

interface IListStyle {
  backgroundColor?: string;
  color: string;
}

const Timeslot = ({ data, key }: { data: IFieldTimeSlot; key: string }) => {
  const [isClicked, setIsClicked] = useState(false);
  const { user, price } = data;
  let listStyle: IListStyle = { color: "white" };
  if (user !== null || isClicked) {
    listStyle.backgroundColor = "#1890ff";
  }
  return (
    <List.Item
      key={key}
      onClick={() => setIsClicked(!isClicked)}
      style={listStyle}
    >
      <div className="timetable-slot">
        {user} {price}
      </div>
    </List.Item>
  );
};

export default Timeslot;
