import React, { useState, useEffect } from "react";
import { Calendar, Row, Col, List } from "antd";
import "./App.css";
import moment from "moment";
import Axios from "axios";
import Timeslot from "./components/Timeslot";

// const elevenOClock = new Date(2019, 5, 22, 11, 0, 0);
// const tenOClock = new Date(2019, 5, 22, 10, 0, 0);
// const thirteenOClock = new Date(2019, 5, 22, 13, 0, 0);
// const isBetween = moment(elevenOClock).isBetween(
//   elevenOClock,
//   thirteenOClock,
//   "millisecond",
//   "[]"
// );
// console.log(isBetween);

interface ItimeInService {
  time: string;
  timeStamp: Date;
}

// interface ITimeHashmap {
//   timeKey?: number;
// }

export interface IFieldTimeSlot {
  time: string;
  timeStamp: Date;
  user?: any;
  field?: any;
  price?: number;
}

const App: React.FC = () => {
  const [activeDate, setActiveDate] = useState(new Date());
  const [timeInService, setTimeInService] = useState<Array<ItimeInService>>([
    { time: "", timeStamp: new Date() }
  ]);
  const [fieldTimeTable, setFieldTimeTable] = useState<any>({});
  const [timeHashmap, setTimeHashmap] = useState<any>({});
  const [activeTimeslot, setActiveTimeslot] = useState<any>([]);
  useEffect(() => {
    const fetchOwnerInfo = async (_id: String) => {
      const requests = [
        await Axios.get("/api/owner/" + _id),
        await Axios.get("/api/fields/" + _id)
      ];
      await Promise.all(requests);
      const [owner, fields] = requests;
      if (owner.data) {
        const { opening_time, closing_time } = owner.data.owner;
        const IopeningTime: number = parseInt(opening_time);
        const IclosingTime: number = parseInt(closing_time);
        const operationTime: number = IclosingTime - IopeningTime;
        let temporaryHashmap: any = {};
        let temporaryFieldTimeTable: any = {};
        const timeLists: any = [];
        for (let i = 0; i < operationTime * 2 + 1; i++) {
          let hour;
          let tHour: string;
          if (i % 2 === 0) {
            hour = IopeningTime + i / 2;
            if (hour.toString().length < 2) {
              tHour = "0" + hour.toString();
            } else {
              tHour = hour.toString();
            }
            temporaryHashmap[`T${tHour}00`] = i;
            timeLists.push({
              time: hour.toString() + ":00",
              timeStamp: new Date(
                activeDate.getFullYear(),
                activeDate.getMonth(),
                activeDate.getDate(),
                hour,
                0,
                0
              )
            });
          } else {
            hour = IopeningTime + Math.floor(i / 2);
            if (hour.toString().length < 2) {
              tHour = "0" + hour.toString();
            } else {
              tHour = hour.toString();
            }
            temporaryHashmap[`T${tHour}30`] = i;
            timeLists.push({
              time: hour.toString() + ":30",
              timeStamp: new Date(
                activeDate.getFullYear(),
                activeDate.getMonth(),
                activeDate.getDate(),
                hour,
                30,
                0
              )
            });
          }
        }
        if (fields.data) {
          let belongingFields = fields.data.fields;
          for (let j = 0; j < belongingFields.length; j++) {
            const timeListsClone = [...timeLists];
            const emptyTimeSlots = timeListsClone.map(element => {
              element.user = null;
              element.field = belongingFields[j]._id;
              element.price = null;
              return { ...element };
            });
            temporaryFieldTimeTable[
              `${belongingFields[j]._id}`
            ] = emptyTimeSlots;
          }
        }
        setTimeInService(timeLists);
        setTimeHashmap(temporaryHashmap);
        setFieldTimeTable(temporaryFieldTimeTable);
      }
    };
    fetchOwnerInfo("5ce93353e80c982c0444ba0c");
  }, [activeDate]);
  const listOfFields = Object.keys(fieldTimeTable);
  return (
    <div className="main-container">
      <Row gutter={16}>
        <Col lg={18} md={16}>
          <div className="date-container">
            <h1 className="date-header">
              {moment(activeDate).format("DD/MM/YYYY")}
            </h1>
          </div>
          <div className="timetable-container">
            <Row gutter={16}>
              <Col md={3} style={{ marginTop: "1.5rem" }}>
                <h1 className="timetable-header"> เวลา </h1>
                <List
                  bordered
                  dataSource={timeInService}
                  style={{ marginTop: "1rem" }}
                  renderItem={element => (
                    <List.Item>
                      <div className="timetable-slot">{element.time}</div>
                    </List.Item>
                  )}
                />
              </Col>
              {listOfFields.map((id, count) => {
                return (
                  <Col md={4} style={{ marginTop: "1.5rem" }} key={id}>
                    <h1 className="timetable-header">สนาม {count + 1}</h1>
                    <List
                      bordered
                      dataSource={fieldTimeTable[id]}
                      style={{ marginTop: "1rem" }}
                      renderItem={(element: IFieldTimeSlot) => {
                        return (
                          <Timeslot
                            data={element}
                            key={element.time + "" + id}
                            insertIfNotExists={() => {
                              const index = activeTimeslot.findIndex(
                                ({
                                  field,
                                  timeStamp
                                }: {
                                  field: string;
                                  timeStamp: Date;
                                }) => {
                                  return (
                                    field === element.field &&
                                    timeStamp === element.timeStamp
                                  );
                                }
                              );
                              if (index !== -1) {
                                const clone = [...activeTimeslot];
                                clone.splice(index, 1);
                                setActiveTimeslot(clone);
                              } else {
                                setActiveTimeslot(
                                  [...activeTimeslot].concat(element)
                                );
                              }
                            }}
                          />
                        );
                      }}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
        </Col>
        <Col lg={6} md={8} style={{ backgroundColor: "white" }}>
          <Calendar
            fullscreen={false}
            onChange={date => {
              if (date) {
                setActiveDate(date.toDate());
              }
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default App;
