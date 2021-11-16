import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";

const AdminRegister = () => {
  const history = useHistory();

  const truereg = true;
  const falsereg = false;

  const [users, setUsers] = useState([]);

  const init = async () => {
    const response = await fetch("/all_users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    // console.log(data);
    setUsers(data.users);
  };

  useEffect(() => {
    if (localStorage.getItem("isadmin") == "false") {
      history.replace("/login");
    }

    init();
  }, []);

  return (
    <div className="admin_register">
      <div className="admin_register_title">Voter Registration</div>
      <div className="admin_register_box">
        <div className="admin_register_table">
          <Table responsive hover>
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Account Address</th>
                <th>Is Registered</th>
              </tr>
            </thead>
            <tbody>
              {/* agg[0].usermapping[0].accountaddress */}

              {users.map((user, index) => (
                <>
                  <tr
                    data-toggle={"collapse"}
                    data-target={".multi-collapse" + index}
                    aria-controls={"multiCollapseExample" + index}
                  >
                    <td>{index + 1}</td>
                    <td>{user.usermapping[0].accountaddress}</td>
                    <td
                      className={
                        user.isregister
                          ? "admin_register_bool_true"
                          : "admin_register_bool_false"
                      }
                    >
                      <span>{user.isregister ? "Yes" : "No"}</span>
                    </td>
                  </tr>
                  <tr
                    className={"collapse" + " multi-collapse" + index + " specialrow"}
                    id={"multiCollapseExample" + index}
                  >
                    <td>Name - {user.name}</td>
                    <td>Aadhar - {user.aadhar}</td>
                    <td>Email - {user.email}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
        </div>
        {/* <div className="admin_register_input">
          <form method="post">
            <input
              className="admin_register_input"
              type="text"
              name="accountaddress"
              placeholder="Enter Account Address"
            />
            <button type="submit" className="admin_register_btn">
              Register
            </button>
          </form>
        </div> */}
      </div>
    </div>
  );
};

export default AdminRegister;
