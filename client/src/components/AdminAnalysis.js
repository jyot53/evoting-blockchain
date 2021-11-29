import React, { useState, useEffect } from "react";
import Iframe from "react-iframe";
import "./styles/AdminAnalysis.css";
import { getContractCandidates, candidatesCount } from "../electionContract";
import { useHistory } from "react-router-dom";
import { Bar } from "react-chartjs-2";
const AdminAnalysis = () => {
  const history = useHistory();

  // const [candidateInfo, setCandidateInfo] = useState([]);
  const [names, setNames] = useState([]);
  const [votes, setVotes] = useState([]);
  const getCandidates = async (id) => {
    // console.log(details);
    let dummyArray = [];
    const totalCandidates = await candidatesCount();
    for (let i = 0; i < totalCandidates; i++) {
      const details = await getContractCandidates(i)
        .then(console.log())
        .catch((error) => console.error(error));
      dummyArray.push(details);
    }

    /* (2) [Result, Result]
    0: Result {0: '0', 1: 'pqr', 2: 'pqr', 3: '19', 4: 'this is description of pqr', 5: 'b.tech', 6: '1', id: '0', name: 'pqr', party: 'pqr', age: '19', description: 'this is description of pqr', …}
    1: Result {0: '1', 1: 'efg', 2: 'efg-party', 3: '21', 4: 'this is description of efg', 5: 'b.tech-efg', 6: '0', id: '1', name: 'efg', party: 'efg-party', age: '21', description: 'this is description of efg', …}
    length: 2 */
    // const newarray = [];
    // dummyArray.forEach((currele,index) => {
    //   newarray.push({name: currele.name,vote: currele.votecount});
    // });
    // console.log(newarray);
    // setCandidateInfo(newarray);

    const namearray = [];
    const votearray = [];
    dummyArray.forEach((currele, index) => {
      namearray.push(currele.name);
      votearray.push(currele.votecount);
    });

    setNames(namearray);
    setVotes(votearray);
  };

  const data = {
    labels: names,
    datasets: [
      {
        label: "# of Votes",
        data: votes,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Candidate Votes",
      },
    },
  };

  useEffect(() => {
    if (localStorage.getItem("isadmin") == "false") {
      history.replace("/login");
    }

    getCandidates();
  }, []);

  return (
    <div className="admin_anal">
      <div className="admin_anal_title">Admin Analysis</div>
      <div className="admin_anal_box">
        <div className="admin_anal_content">
          <div className="admin_anal_votegraph">
            <Bar data={data} options={options} />
          </div>
          <Iframe
            src="https://charts.mongodb.com/charts-e-voting-tzdid/embed/charts?id=3973a395-5582-44b8-bfaa-618d25cdc6e1&maxDataAge=10&theme=light&autoRefresh=true"
            width="640px"
            height="480px"
            className="admin_anal_iframe"
          />
          <Iframe
            className="admin_anal_iframe"
            src="https://charts.mongodb.com/charts-e-voting-tzdid/embed/charts?id=c7dda14d-d7df-4421-88cb-81c36e200b2f&maxDataAge=10&theme=light&autoRefresh=true"
            width="640px"
            height="480px"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAnalysis;
