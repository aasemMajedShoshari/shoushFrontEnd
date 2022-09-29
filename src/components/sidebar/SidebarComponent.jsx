import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BadgeIcon from "@mui/icons-material/Badge";
// import TaskIcon from "@mui/icons-material/Task";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import InfoIcon from "@mui/icons-material/Info";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SummarizeIcon from "@mui/icons-material/Summarize";
import WorkIcon from "@mui/icons-material/Work";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

function Sidebar({ state, setState }) {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const className = `vacationsTabs animate`;

  const handleLoginLogout = (e) => {
    e.preventDefault();
    setState(!state);
    if (user) {
      dispatch({ type: "LOGOUT" });
    }
    navigate("/login");
  };

  const [show, setShow] = useState(false);
  return (
    <div className="sidebarc">
      <ul className="sidebarNav">
        <Link
          to="/"
          className="sidebarNavLinks"
          onClick={() => setState(!state)}
        >
          <InfoIcon className="icon" /> <p>About</p>
        </Link>
        <Link
          to="/employees"
          className="sidebarNavLinks"
          onClick={() => setState(!state)}
        >
          <BadgeIcon className="icon" /> <p>Employees</p>
        </Link>
        {/* <Link
          to="/projects"
          className="sidebarNavLinks"
          onClick={() => setState(!state)}
        >
          <TaskIcon className="icon" /> <p>Projects</p>
        </Link> */}
        <div
          className="vacationsTab"
          style={{ cursor: "pointer" }}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <div className="vacationTitle">
            <AccessibilityNewIcon className="icon" />
            <p>
              Vacations <i>{show ? "↓" : "→"}</i>
            </p>
            <div className={show ? className : "vacationsTabs"}>
              <Link
                to="/request-vacation"
                className="requestVacation"
                onClick={() => setState(!state)}
              >
                Request vacation
              </Link>
              <Link
                to="/vacations"
                className="vacationsTabHeadline"
                onClick={() => setState(!state)}
              >
                Vacations
              </Link>
            </div>
          </div>
        </div>

        <Link
          to="/salaries"
          className="sidebarNavLinks"
          onClick={() => setState(!state)}
        >
          <AttachMoneyIcon className="icon" /> <p>Salaries</p>
        </Link>
        <Link
          to="/reports"
          className="sidebarNavLinks"
          onClick={() => setState(!state)}
        >
          <SummarizeIcon className="icon" /> <p>Reports</p>
        </Link>
        <Link
          to="/careers"
          className="sidebarNavLinks"
          onClick={() => setState(!state)}
        >
          <WorkIcon className="icon" /> <p>Careers</p>
        </Link>
        <Link
          to="/contact"
          className="sidebarNavLinks"
          onClick={() => setState(!state)}
        >
          <PermContactCalendarIcon className="icon" /> <p>Contact us</p>
        </Link>
        <Link to="/" className="sidebarNavLinks" onClick={handleLoginLogout}>
          <ExitToAppIcon className="icon" />
          {user ? <p>Logout</p> : <p>Login</p>}
        </Link>
      </ul>
    </div>
  );
}

export default Sidebar;
