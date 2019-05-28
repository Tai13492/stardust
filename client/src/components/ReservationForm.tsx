import React, { useState } from "react";
import { Row, Col, Modal, Input } from "antd";
import moment from "moment";
const ReservationForm = ({
  setIsModalVisible,
  isModalVisible,
  activeTimeslot,
  onSuccess
}: {
  setIsModalVisible: any;
  isModalVisible: boolean;
  activeTimeslot: any;
  onSuccess: any;
}) => {
  const [phone, setPhone] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const concatZeroToTime = (time: string) => {
    if (time.length < 2) {
      return time + "0";
    } else {
      return time;
    }
  };
  const computeModalHeader = (activeTimeslot: any) => {
    if (activeTimeslot.length < 1) {
      return "";
    }
    const fieldID = activeTimeslot[0].field;
    const fieldName = activeTimeslot[0].fieldName;
    let dateReferences = {
      max: new Date(1970, 1, 1, 0, 0, 0),
      min: new Date(2070, 1, 1, 0, 0, 0)
    };
    for (let i = 0; i < activeTimeslot.length; i++) {
      const element = activeTimeslot[i];
      if (element.field !== fieldID) {
        return "ERROR";
      } else {
        if (element.timeStamp.getTime() - dateReferences.min.getTime() < 0) {
          dateReferences.min = element.timeStamp;
        }
        if (element.timeStamp.getTime() - dateReferences.max.getTime() > 0) {
          dateReferences.max = element.timeStamp;
        }
      }
    }
    const { max, min } = dateReferences;
    const ending_time = moment(max)
      .add(30, "minutes")
      .toDate();

    const starting_hours = concatZeroToTime(min.getHours().toString());
    const starting_minutes = concatZeroToTime(min.getMinutes().toString());
    const ending_hours = concatZeroToTime(ending_time.getHours().toString());
    const ending_minutes = concatZeroToTime(
      ending_time.getMinutes().toString()
    );
    const title: string = `สนาม ${fieldName} - เวลา ${starting_hours}.${starting_minutes} - ${ending_hours}.${ending_minutes} - วันที่ ${moment(
      min
    ).format("DD/MM/YYYY")}`;
    return title;
  };
  return (
    <Modal
      title={
        <p style={{ textAlign: "center", marginBottom: 0 }}>
          {computeModalHeader(activeTimeslot)}
        </p>
      }
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      onOk={() => {
        onSuccess({ name, phone, price });
        setIsModalVisible(false);
      }}
    >
      <Row gutter={8}>
        <Col span={8}>
          <h2> ชื่อ </h2>
          <Input
            placeholder="stardust"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Col>
        <Col span={8}>
          <h2> เบอร์โทรศัพท์ </h2>
          <Input
            placeholder="0xxxxxxxx"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </Col>
        <Col span={8}>
          <h2> ราคา </h2>
          <Input
            placeholder="1000"
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default ReservationForm;
