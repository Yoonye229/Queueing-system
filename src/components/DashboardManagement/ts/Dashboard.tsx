import React, { useState, useEffect } from "react";
import "../css/Dashboard.css";
import Navbar from "../../Bar/ts/Topbar";
import service from "../../../assets/progression (1).png";
import number from "../../../assets/icon dasboard03.png";
import item from "../../../assets/equip.png";
import Sidebar from "../../Bar/ts/Sidebar";
import ProFull from "../../../assets/icondasboarddacap.png";
import ProUse from "../../../assets/icondasboarddasudung.png";
import ProWait from "../../../assets/icondasboarddangcho.png";
import ProBack from "../../../assets/icondasboardboqua.png";
import piDrop from "../../EquipmentManagement/assets/fi_chevron-down.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { database } from "../../../firebase";
import DateComponent from "./DateComponent";
import WeekComponent from "./WeekComponent";
import MonthComponent from "./MonthComponent";
import { Link } from "react-router-dom";

interface WaveChartData {
  DateStart_Pr: string;
  Id_Pr: number;
}

const Dashboard: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [countBack, setCountBack] = useState<number>();
  const [count, setCount] = useState<number>();
  const [countUse, setCountUse] = useState<number>();
  const [countWait, setCountWait] = useState<number>();
  
  const [countEq, setCountEq] = useState<number>();
  const [countActionEq, setCountActionEq] = useState<number>();
  const [countStopEq, setCountStopEq] = useState<number>();

  const [countSv, setCountSv] = useState<number>();
  const [countActionSv, setCountActionSv] = useState<number>();
  const [countStopSv, setCountStopSv] = useState<number>();
  const handleDateChange = (selectedDate: any) => {
    setDate(selectedDate);
  };

  const countActiveStatusPr = async () => {
    try {
      // Khởi tạo Firebase và kết nối tới Realtime Database

      // Truy vấn bảng "Progression" và lấy dữ liệu
      const snapshot = await database.ref("Progression").once("value");
      const data = snapshot.val();

      
      let countBack = 0;
      let countUse = 0;
      let countWait = 0
      let count = 0;
      for (const key in data) {
        if (data[key].Status_Pr === "back") {
          countBack++;
        } if (data[key].Status_Pr === "wait") {
          countWait++;
        }if (data[key].Status_Pr === "use") {
          countUse++;
        }
         count = countUse+countBack+countWait;
      }

      setCountBack(countBack);
      setCountUse(countUse);
      setCountWait(countWait);
      setCount(count);
    } catch (error) {
      
    }
  };
  const countActiveEq = async () => {
    try {
      // Khởi tạo Firebase và kết nối tới Realtime Database

      // Truy vấn bảng "Progression" và lấy dữ liệu
      const snapshot = await database.ref("Equip").once("value");
      const data = snapshot.val();

      
      let countActionEq = 0;
      let countStopEq = 0;
      
      let countEq = 0;
      for (const key in data) {
        if (data[key].Action_Eq === true) {
          countActionEq++;
        } if (data[key].Action_Eq === false) {
          countStopEq++;
        }
         countEq = countActionEq+countStopEq;
      }

      
      setCountEq(countEq);
      setCountActionEq(countActionEq);
      setCountStopEq(countStopEq);
      console.log(`$P{}`);
      
    } catch (error) {
      console.error("Lỗi khi đếm số lần Status_Pr:", error);
    }
  };
  const countActiveService = async () => {
    try {
      // Khởi tạo Firebase và kết nối tới Realtime Database

      // Truy vấn bảng "Progression" và lấy dữ liệu
      const snapshot = await database.ref("Service").once("value");
      const data = snapshot.val();

      
      let countSv = 0;
      let countActionSv = 0;
      let countStopSv = 0
      
      for (const key in data) {
        if (data[key].Action_Sv === true) {
          countActionSv++;
        } if (data[key].Action_Sv === false) {
          countStopSv++;
      
        }
         countSv = countActionSv+countStopSv;
      }

      setCountSv(countSv);
      setCountActionSv(countActionSv);
      setCountStopSv(countStopSv);
      
    } catch (error) {
      console.error("Lỗi khi đếm số lần Status_Pr:", error);
    }
  };
  
  countActiveService();
  countActiveEq();
  countActiveStatusPr();
  const [selectedOption1, setSelectedOption1] = useState("Ngày");
  const [open1, setOpen1] = useState(false);

  const handleOptionClick1 = async (option1: string) => {
    setSelectedOption1(option1);
    setOpen1(false);
  };
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="Dashboard_form">
        <div className="info_Dashboard">Biểu đồ cấp số</div>
        <div className="Dashboard_left">
          <div className="component_Dashboard">
            <Link className="link_nav" to={"/ListPr"}>
              <div className="component_full">
                <div className="componentleft_header">
                  <div className="imgProFull">
                    <img src={ProFull} alt="" />
                  </div>
                  <span> Số thứ tự đã cấp </span>
                </div>
                <p>{count}</p>
              </div>
            </Link>
            <Link className="link_nav" to={"/ListPr"}>
              {" "}
              <div className="component_use">
                <div className="componentleft_header">
                  <div className="imgProUse">
                    <img src={ProUse} alt="" />
                  </div>
                  <span>Số thứ tự đã sử dụng </span>
                </div>
                <p>{countUse}</p>
              </div>
            </Link>
            <Link className="link_nav" to={"/ListPr"}>
              {" "}
              <div className="component_wait">
                <div className="componentleft_header">
                  <div className="imgProWait">
                    <img src={ProWait} alt="" />
                  </div>
                  <span> Số thứ tự đang chờ </span>
                </div>
                <p>{countWait}</p>
              </div>
            </Link>
            <Link className="link_nav" to={"/ListPr"}>
              {" "}
              <div className="component_back">
                <div className="componentleft_header">
                  <div className="imgProBack">
                    <img src={ProBack} alt="" />
                  </div>
                  <span> Số thứ tự đã bỏ qua </span>
                </div>
                <p>{countBack}</p>
              </div>
            </Link>
          </div>
          <div className="List_static">
            <div className="List_static_header">
              <div className="header_dash">
                <p>Bảng thống kê theo ngày</p>
                <span>Tháng 5/2023</span>
              </div>
              <div
                className={`select_menuPr${open1 ? " select_menu_openPr" : ""}`}
                onClick={() => setOpen1(!open1)}
              >
                <div className="select_btnDate">
                  <span className="drop_select">{selectedOption1}</span>
                  <img className="icon-wrap" src={piDrop} />
                </div>
                <ul className="listDate">
                  <li
                    className="option"
                    onClick={() => handleOptionClick1("Ngày")}
                  >
                    <span className="option_text">Ngày</span>
                  </li>
                  <li
                    className="option"
                    onClick={() => handleOptionClick1("Tuần")}
                  >
                    <span className="option_text">Tuần</span>
                  </li>
                  <li
                    className="option"
                    onClick={() => handleOptionClick1("Tháng")}
                  >
                    <span className="option_text">Tháng</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="DateC">
              {selectedOption1 === "Ngày" ? <DateComponent /> :selectedOption1 === 'Tuần' ? <WeekComponent/> :<MonthComponent/>}
              
            </div>
          </div>
        </div>
        <div className="Dashboard_right">
          <div className="info_right">
            <span>Tổng quan</span>
          </div>
          <div className="component_Equip">
            <div></div>
            <div className="Equip_count">
              <h1>{countEq}</h1>

              <p>
                {" "}
                <img src={item} alt="" /> Thiết bị
              </p>
            </div>
            <div>
              <div className="Equip_action">
                <span>
                  <span className="yellow"></span> Đang Hoạt động : <p>{countActionEq}</p>
                </span>
              </div>
              <div className="Equip_action">
                <span>
                  <span className="gray"></span> Ngưng hoạt động : <p>{countStopEq}</p>
                </span>
              </div>
            </div>
          </div>
          <div className="component_Service">
            <div></div>
            <div className="Service_count">
              <h1>{countSv}</h1>

              <p>
                {" "}
                <img src={service} alt="" /> Dịch vụ{" "}
              </p>
            </div>
            <div>
              <div className="Equip_action">
                <span>
                  <span className="blue"></span> Đang Hoạt động : <p>{countActionSv}</p>
                </span>
              </div>
              <div className="Equip_action">
                <span>
                  <span className="gray"></span> Ngưng hoạt động : <p>{countStopSv}</p>
                </span>
              </div>
            </div>
          </div>
          <div className="component_Progression">
            <div></div>
            <div className="Progression_count">
              <h1>{count}</h1>

              <p>
                <img src={number} alt="" /> Cấp số
              </p>
            </div>
            <div>
              <div className="Equip_action">
                <span>
                  <span className="green"></span> Đã sử dụng : <p>{countUse}</p>
                </span>
              </div>
              <div className="Equip_action">
                <span>
                  <span className="gray"></span> Đang chờ : <p>{countWait}</p>
                </span>
              </div>
              <div className="Equip_action">
                <span>
                  <span className="pink"></span> bỏ qua : <p>{countBack}</p>
                </span>
              </div>
            </div>
          </div>
          <div className="Date_picker">
            <Calendar
              // inline
              // showPopperArrow={false}
              value={date}
              onChange={handleDateChange}

              // dateFormat="dd/MM/yyyy" // Specify the desired date format
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;