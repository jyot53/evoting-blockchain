import React , {useEffect} from "react";
import Table from "react-bootstrap/Table";
import {useHistory} from 'react-router-dom';
import { Bar } from "react-chartjs-2";
const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 15, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)"
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)"
      ],
      borderWidth: 2,
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const UserResult = () => {

  const history = useHistory();
  // const [{user}, dispatch] = useStateValue();
  useEffect(()=>{
      if(!localStorage.getItem('username') || !localStorage.getItem('useremail')){
          history.replace('/login');
      }

  } , []);

  return (
    <div className="user_result">
      <div className="admin_register_title">Voting Results</div>
      <div className="admin_register_box">
        <div className="admin_register_table">
          <Table responsive hover>
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Name</th>
                <th>Age</th>
                <th>Party</th>
                <th>Qualification</th>
                <th>Votes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0</td>
                <td>jyot</td>
                <td>19</td>
                <td>BJP</td>
                <td>B.Tech</td>
                <td>2</td>
              </tr>
              <tr>
                <td>1</td>
                <td>jyot</td>
                <td>19</td>
                <td>BJP</td>
                <td>B.Tech</td>
                <td>2</td>
              </tr>
              <tr>
                <td>2</td>
                <td>jyot</td>
                <td>19</td>
                <td>BJP</td>
                <td>B.Tech</td>
                <td>2</td>
              </tr>
              <tr>
                <td>3</td>
                <td>jyot</td>
                <td>19</td>
                <td>BJP</td>
                <td>B.Tech</td>
                <td>2</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="voting-graph">
            <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default UserResult;
