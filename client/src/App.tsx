import React, { useState, useEffect } from "react";
import { Calendar, Row, Col, List } from "antd";
import "./App.css";
import moment from "moment";
import Axios from "axios";

const data = [
  "13:00",
  "13:30",
  "13:00",
  "13:30",
  "13:00",
  "13:30",
  "13:00",
  "13:30",
  "13:00",
  "13:30",
  "13:00",
  "13:30",
  "13:00",
  "13:30",
  "13:00",
  "13:30",
  "13:30",
  "13:00",
  "13:30",
  "13:00",
  "13:30",
  "13:00",
  "13:30"
];

const App: React.FC = () => {
  const [activeDate, setActiveDate] = useState(new Date());
  useEffect(() => {
    const fetchOwnerInfo = async (_id: String) => {
      const requests = [
        await Axios.get("/api/owner/" + _id),
        await Axios.get("/api/fields/" + _id)
      ];
      await Promise.all(requests);
      const [owner, fields] = requests;
      console.log(owner.data.owner, "owner");
      console.log(fields.data.fields, "fields");
    };
    fetchOwnerInfo("5ce93353e80c982c0444ba0c");
  });
  return (
    <div
      style={{
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "0.5rem",
        backgroundColor: "#f7f7f7",
        height: "100vh"
      }}
    >
      <Row gutter={16}>
        <Col lg={18} md={16}>
          <div
            style={{ background: "white", padding: 12, textAlign: "center" }}
          >
            <h1
              style={{
                color: "#1890FF",
                fontSize: "2.4rem",
                fontWeight: "bold",
                marginBottom: 0,
                maxHeight: 240
              }}
            >
              {moment(activeDate).format("DD/MM/YYYY")}
            </h1>
          </div>
          <div
            style={{
              backgroundColor: "white",
              marginTop: "1.5rem",
              paddingLeft: 24,
              overflowY: "scroll",
              overflowX: "hidden",
              maxHeight: "72vh"
            }}
          >
            <Row gutter={16}>
              <Col md={3} style={{ marginTop: "1.5rem" }}>
                <h1
                  style={{
                    color: "#1890ff",
                    marginBottom: 12,
                    backgroundColor: "white",
                    border: "1px solid grey",
                    textAlign: "center",
                    position: "sticky",
                    top: 20,
                    left: 20,
                    zIndex: 3
                  }}
                >
                  {" "}
                  เวลา{" "}
                </h1>
                <List
                  bordered
                  dataSource={data}
                  style={{ marginTop: "1rem" }}
                  renderItem={item => (
                    <List.Item>
                      <div style={{ textAlign: "center" }}>{item}</div>
                    </List.Item>
                  )}
                />
              </Col>
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
