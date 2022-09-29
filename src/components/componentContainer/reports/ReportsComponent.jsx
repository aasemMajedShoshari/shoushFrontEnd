import "../../../assets/common.css";
import { useState, useRef, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import jsreport from "@jsreport/browser-client";
jsreport.serverUrl = "http://localhost:8001";
function ReportsComponent() {
  const [err, setErr] = useState("");
  const name = useRef();
  const month = useRef();
  const year = useRef();
  const { employees } = useContext(AuthContext);
  const handleGo = async () => {
    if (
      year.current.value === "" ||
      year.current.value > new Date().getFullYear()
    ) {
      setErr("please enter a valid year");
    } else if (
      Number(month.current.value) > 12 ||
      Number(month.current.value) < 1
    ) {
      setErr("please enter a valid month");
    } else {
      const employee = {
        name: name.current.value,
        month: month.current.value,
        year: year.current.value,
      };
      const response = await fetch("http://localhost:8000/report", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      const data = await response.json();
      if (!data) {
        setErr("Report data not found in our system");
      } else {
        const report = await jsreport.render({
          template: {
            name: "/salary/salarySlipTemplate",
          },
          data: data,
        });
        report.download("report.pdf");
      }
    }
  };

  return (
    <div className="formContainer">
      <div>
        <p className="error">{err}</p>
      </div>
      <form className="form">
        <div className="row">
          <label> Name</label>
          <select ref={name}>
            {employees.map((emp) => (
              <option key={emp._id}>{Object.values(emp)[2]}</option>
            ))}
          </select>
        </div>

        <div className="row">
          <label> Month</label>
          <input type="text" ref={month} />
        </div>

        <div className="row">
          <label> Year</label>
          <input type="text" ref={year} />
        </div>

        <div className="row">
          <button type="button" onClick={handleGo}>
            GO
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReportsComponent;
