import React , {useEffect} from "react";
import Table from "react-bootstrap/Table";
import {useHistory} from 'react-router-dom';
const AdminRegister = () => {
  const history = useHistory();

  useEffect(() => {
    if(localStorage.getItem('isadmin') == 'false'){
      history.replace('/login');
    }
  },[])

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
              <tr>
                <td>0</td>
                <td>0x5d6973c68B91ec5af7d11D455906a46499Ac4254</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>2</td>
                <td>0x5d6973c68B91ec5af7d11D455906a46499Ac4254</td>
                <td>No</td>
              </tr>
              <tr>
                <td>3</td>
                <td>0x5d6973c68B91ec5af7d11D455906a46499Ac4254</td>
                <td>No</td>
              </tr>
              <tr>
                <td>0</td>
                <td>0x5d6973c68B91ec5af7d11D455906a46499Ac4254</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>0</td>
                <td>0x5d6973c68B91ec5af7d11D455906a46499Ac4254</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>0</td>
                <td>0x5d6973c68B91ec5af7d11D455906a46499Ac4254</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="admin_register_input">
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
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
