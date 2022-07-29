import React, { useState } from "react";
import "../App.css";
import MockData from "../MOCK_DATA.json";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();
  const [logout, setLogout] = React.useState(false);
  const [data, setdata] = useState(MockData);
  const [order, setorder] = useState("ASC");
  const [searchTerm, setsearchTerm] = useState("");

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setdata(sorted);
      setorder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setdata(sorted);
      setorder("ASC");
    }
  };

  React.useEffect(() => {
    if (!localStorage.getItem("auth")) history.push("/login");
  }, [logout]);

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth");
    setLogout(true);
  };

  return (
    <>
      <button
        onClick={logoutHandler}
        className="btn btn-primary text-right"
        style={{ marginTop: 20, marginLeft: 50 }}
      >
        Logout
      </button>
      <input
        type="text"
        placeholder="Search..."
        className="form-control"
        style={{
          marginTop: 10,
          marginBottom: 20,
          marginLeft: 1000,
          width: "20%",
        }}
        onChange={(e) => {
          setsearchTerm(e.target.value);
        }}
      />
      <hr />
      <div className="container">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <th onClick={() => sorting("first_name")}>First Name</th>
            <th onClick={() => sorting("last_name")}>Last name</th>
            <th onClick={() => sorting("email")}>Email</th>
          </thead>
          <tbody>
            {data
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.first_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  val.last_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  val.email.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((d) => (
                <tr onKeyPress={d.id}>
                  <td>{d.first_name}</td>
                  <td>{d.last_name}</td>
                  <td>{d.email}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
