import React, { useEffect, useState } from "react";
import FilterForm from "./FilterForm";
import PieChart from "./PieChart";
import "./Dashboard.css";
import classes from "../styles/pages/home.module.scss";
import axios from "axios";
import answerData from "./Answers/answerData";

const Dashboard = () => {
  const [answers, setAnswers] = useState([]);
  const [totalNumberOfUsers, setTotalNumberOfUsers] = useState();
  const [game, setGame] = useState();

  const fetchUsersThatComplyWithFilters = (filters) => {
    axios
      .get("http://people-s-plan.herokuapp.com/api/guests")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        const filtersInUse = { ...filters };
        delete filtersInUse["game"];
        const arrayOfFilters = Object.keys(filtersInUse);
        const desiredUserIds = [];
        data.forEach((guest) => {
          let count = 0;
          arrayOfFilters.forEach((filter) => {
            if (guest[filter] === filtersInUse[filter]) {
              count += 1;
              if (count === arrayOfFilters.length) {
                desiredUserIds.push(guest["id"]);
              }
            }
          });
        });
        callAnswersWithFilters(desiredUserIds, filters);
      });
  };

  const callAnswersWithFilters = (userIds, filters) => {
    setTotalNumberOfUsers(userIds.length);
    axios
      .get("http://people-s-plan.herokuapp.com/api/answers")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        const answers = { ...answerData[filters["game"]] };
        const formattedAnswers = [];
        data.forEach((answer) => {
          if (
            answer["game"] === filters["game"] &&
            userIds.includes(answer["guest_id"])
          ) {
            answers[answer["name"]] = answers[answer["name"]] + 1;
          }
        });
        const arrayOfNames = Object.keys(answers);
        arrayOfNames.forEach((name) => {
          formattedAnswers.push({
            Answer: name,
            "Times Selected": answers[name],
          });
        });
        setAnswers(formattedAnswers);
      });
  };

  const callAnswersWithNoFilters = (game) => {
    axios
      .get("http://people-s-plan.herokuapp.com/api/answers")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        const listOfTotalUsers = [];
        const answers = { ...answerData[game] };
        const formattedAnswers = [];
        data.forEach((answer) => {
          if (listOfTotalUsers.includes(answer["guest_id"]) == false) {
            listOfTotalUsers.push(answer["guest_id"]);
          }
          if (answer["game"] == game) {
            answers[answer["name"]] = answers[answer["name"]] + 1;
          }
        });
        setTotalNumberOfUsers(listOfTotalUsers.length);
        const arrayOfNames = Object.keys(answers);
        arrayOfNames.forEach((name) => {
          formattedAnswers.push({
            Answer: name,
            "Times Selected": answers[name],
          });
        });
        setAnswers(formattedAnswers);
      });
  };

  return (
    <div
      className="dashboard-background"
      style={{ paddingTop: "20px", display: "block", margin: "0 auto" }}
    >
      <h1
        className={classes.Title}
        style={{ fontSize: "50px", textAlign: "center" }}
      >
        {" "}
        People's Plan Data Dashboard
      </h1>
      <div style={{ display: "flex", padding: "50px" }}>
        <div>
          <h2
            className={classes.Title}
            style={{
              fontSize: "30px",
              textAlign: "center",
              textDecoration: "underline",
              marginTop: "0px",
            }}
          >
            Select your filters:{" "}
          </h2>
          <FilterForm
            callAnswersWithNoFilters={callAnswersWithNoFilters}
            fetchUsersThatComplyWithFilters={fetchUsersThatComplyWithFilters}
          />
        </div>
        <div>
          <h2
            className={classes.Title}
            style={{
              fontSize: "30px",
              textAlign: "center",
              textDecoration: "underline",
              margin: "0px",
            }}
          >
            Results
          </h2>
          <PieChart chartData={answers} />
          <p style={{ fontSize: "30px", textAlign: "center" }}>
            Total Users: {totalNumberOfUsers}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
