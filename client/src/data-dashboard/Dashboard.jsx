import React, { useEffect, useState } from "react";
import FilterFormGameData from "./FilterFormGameData";
import FilterFormParticipationData from "./FilterFormParticipationData";
import BarChart from "./BarChart";
import Description from "./Description";
import "./Dashboard.css";
import classes from "../styles/pages/home.module.scss";
import axios from "axios";
import answerData from "./answerData";

const Dashboard = () => {
  const [dataForChart, setDataForChart] = useState([]);
  const [game, setGame] = useState("");
  const [guests, setGuests] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [councils, setCouncils] = useState([]);
  const [everyUniqueGuestID, setEveryUniqueGuestID] = useState([]);
  const [totalNumberOfUsers, setTotalNumberOfUsers] = useState(null);

  //CALL DATA AND SAVE TO STATE ON PAGE LOAD
  useEffect(() => {
    const fetchData = async (url, hook) => {
      try {
        const response = await axios.get(url);
        hook(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData("https://game.peoplesplan.org/api/guests", setGuests);
    fetchData("https://game.peoplesplan.org/api/answers", setAnswers);
    fetchData("https://game.peoplesplan.org/api/questions", setQuestions);

    axios.get("http://api.tracmobility.com/test/vehicles?page=0&size=10")
    .then((response) => {
      console.log(response.data)
    })
  }, []);

  useEffect(() => {
    let arrayOfCouncils = [];
    let arrayOfEveryUniqueGuestID = [];
    guests.forEach((guest) => {
      if (arrayOfCouncils.includes(guest.council) === false) {
        if (guest.council !== null) {
          arrayOfCouncils.push(guest.council);
        }
      }
      if (arrayOfEveryUniqueGuestID.includes(guest["id"]) === false) {
        arrayOfEveryUniqueGuestID.push(guest["id"]);
      }
    });
    arrayOfCouncils.sort();
    setCouncils(arrayOfCouncils);
    setEveryUniqueGuestID(arrayOfEveryUniqueGuestID);
  }, [guests]);

  //SORTING DATA AND APPLYING FILTERS
  const gameDataRequestHandler = (filters) => {
    setGame(filters["game"]);
    if (
      filters.hasOwnProperty("council") ||
      filters.hasOwnProperty("age") ||
      filters.hasOwnProperty("gender") ||
      filters.hasOwnProperty("ethnicity")
    ) {
      const userIDs = fetchRequestedUsers(filters);
      callCorrectChart(userIDs, filters["game"]);
    } else {
      callCorrectChart(everyUniqueGuestID, filters["game"]);
    }
  };

  const fetchRequestedUsers = (filters) => {
    const filtersInUse = { ...filters };
    delete filtersInUse["game"];
    delete filtersInUse["ethnicity"];
    delete filtersInUse["participationFilter"];
    const arrayOfFilters = Object.keys(filtersInUse);
    const desiredUserIds = [];
    guests.forEach((guest) => {
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
    if (filters.hasOwnProperty("ethnicity")) {
      if (desiredUserIds.length === 0) {
        const arrayOfUsersWithFilteredEthnicity = [];
        questions.forEach((guestObject) => {
          if (guestObject["answer"] === filters["ethnicity"]) {
            arrayOfUsersWithFilteredEthnicity.push(guestObject["guest_id"]);
          }
        });
        return arrayOfUsersWithFilteredEthnicity;
      } else {
        const arrayOfUsersWithFilteredEthnicity = [];
        questions.forEach((guestObject) => {
          if (
            desiredUserIds.includes(guestObject["guest_id"]) &&
            guestObject["answer"] === filters["ethnicity"]
          ) {
            arrayOfUsersWithFilteredEthnicity.push(guestObject["guest_id"]);
          }
        });
        return arrayOfUsersWithFilteredEthnicity;
      }
    } else {
      return desiredUserIds;
    }
  };

  const callCorrectChart = (userIds, game) => {
    if (
      game === "Low Carbon Travel" ||
      game === "Nature" ||
      game === "Research and Development"
    ) {
      simpleBarChart(userIds, game);
    } else if (game === "Retrofit Homes") {
      retrofitBarChart(userIds);
    } else if (game === "Clean Energy") {
      cleanEnergy(userIds);
    } else if (
      game === "Sustainable Food System - Food Waste" ||
      game === "Sustainable Food System - Animal Agriculture & Diet" ||
      game === "Sustainable Food System - Localised Food System"
    ) {
      sustainableFoodSystem(userIds, game);
    } else if (game === "Circular Economy") {
      circularEconomy(userIds);
    }
  };

  const simpleBarChart = (userIds, game) => {
    const answerObject = { ...answerData[game] };
    const answersKeys = Object.keys(answerObject);
    const totalNumberOfUsers = [];
    answers.forEach((answer) => {
      if (
        answer["game"] === game &&
        userIds.includes(answer["guest_id"]) &&
        answersKeys.includes(answer["name"])
      ) {
        answerObject[answer["name"]] = answerObject[answer["name"]] + 1;
        if (totalNumberOfUsers.includes(answer["guest_id"]) === false) {
          totalNumberOfUsers.push(answer["guest_id"]);
        }
      }
    });
    setTotalNumberOfUsers(totalNumberOfUsers.length);
    formatAnswers(answerObject);
  };

  const retrofitBarChart = (userIds) => {
    const answerObject = { ...answerData["Retrofit Homes"] };
    const answerObjectKeys = Object.keys(answerObject);
    const totalNumberOfUsers = [];
    answers.forEach((answer) => {
      if (
        answer["game"] === "Retrofit Homes" &&
        userIds.includes(answer["guest_id"]) &&
        answerObjectKeys.includes(answer["name"])
      ) {
        let points = 10 - parseInt(answer["column"]);
        answerObject[answer["name"]] = answerObject[answer["name"]] + points;
        if (totalNumberOfUsers.includes(answer["guest_id"]) === false) {
          totalNumberOfUsers.push(answer["guest_id"]);
        }
      }
    });
    setTotalNumberOfUsers(totalNumberOfUsers.length);
    formatAnswers(answerObject);
  };

  const cleanEnergy = (userIds) => {
    const answerObject = { ...answerData["Clean Energy"] };
    const answerObjectKeys = Object.keys(answerObject);
    const totalNumberOfUsers = [];
    answers.forEach((answer) => {
      if (
        answer["game"] === "Clean Energy" &&
        userIds.includes(answer["guest_id"]) &&
        answerObjectKeys.includes(answer["column"])
      ) {
        answerObject[answer["column"]] = answerObject[answer["column"]] + 1;
        if (totalNumberOfUsers.includes(answer["guest_id"]) === false) {
          totalNumberOfUsers.push(answer["guest_id"]);
        }
      }
    });
    setTotalNumberOfUsers(totalNumberOfUsers.length);
    formatAnswers(answerObject);
  };

  const sustainableFoodSystem = (userIds, game) => {
    const sustainableFSSubCategory = {
      "Sustainable Food System - Food Waste": "food waste",
      "Sustainable Food System - Animal Agriculture & Diet":
        "animal agriculture & diet",
      "Sustainable Food System - Localised Food System":
        "localised food system",
    };
    const subCategory = sustainableFSSubCategory[game];
    const answerObject = {
      ...answerData["Sustainable Food System"][subCategory],
    };
    const answerObjectKeys = Object.keys(answerObject);
    const totalNumberOfUsers = [];
    answers.forEach((answer) => {
      if (
        answer["game"] === "Sustainable Food System" &&
        userIds.includes(answer["guest_id"]) &&
        answerObjectKeys.includes(answer["name"]) &&
        answer["category"] === subCategory
      ) {
        answerObject[answer["name"]] = answerObject[answer["name"]] + 1;
        if (totalNumberOfUsers.includes(answer["guest_id"]) === false) {
          totalNumberOfUsers.push(answer["guest_id"]);
        }
      }
    });
    setTotalNumberOfUsers(totalNumberOfUsers.length);
    formatAnswers(answerObject);
  };

  const circularEconomy = (userIds) => {
    const answerObject = { ...answerData["Circular Economy"] };
    const answerObjectKeys = Object.keys(answerObject);
    const totalNumberOfUsers = [];
    answers.forEach((answer) => {
      if (
        answer["game"] === "Circular Economy" &&
        userIds.includes(answer["guest_id"]) &&
        answerObjectKeys.includes(answer["name"])
      ) {
        const nowFutureOrNever = answer["column"];
        const answerName = answer["name"];
        answerObject[answerName][nowFutureOrNever] =
          answerObject[answerName][nowFutureOrNever] + 1;
        if (totalNumberOfUsers.includes(answer["guest_id"]) === false) {
          totalNumberOfUsers.push(answer["guest_id"]);
        }
      }
    });
    setTotalNumberOfUsers(totalNumberOfUsers.length);
    formatCircularEconomyAnswers(answerObject);
  };

  //PARTICIPATION DATA
  const participationDataRequestHandler = (filters) => {
    setGame("");
    if (filters.hasOwnProperty("council")) {
      const userIds = fetchRequestedUsers(filters);
      participationData(userIds, filters["participationFilter"]);
    } else {
      participationData(everyUniqueGuestID, filters["participationFilter"]);
    }
  };

  const participationData = (userIds, participationFilter) => {
    const answerObject = { ...answerData[participationFilter] };
    const answerObjectKeys = Object.keys(answerObject);
    const totalUserCount = [];
    if (
      participationFilter === "What is your ethnicity?" ||
      participationFilter ===
        "Have you ever engaged with a policy consultation run by your council before?" ||
      participationFilter ===
        "Do you feel you have an opportunity to shape local climate policy?"
    ) {
      questions.forEach((question) => {
        if (
          question["question"] === participationFilter &&
          answerObjectKeys.includes(question["answer"]) &&
          userIds.includes(question["guest_id"])
        ) {
          answerObject[question["answer"]] =
            answerObject[question["answer"]] + 1;
          totalUserCount.push(question["guest_id"]);
        }
      });
    } else {
      guests.forEach((guest) => {
        if (
          answerObjectKeys.includes(guest[participationFilter]) &&
          userIds.includes(guest["id"])
        ) {
          answerObject[guest[participationFilter]] =
            answerObject[guest[participationFilter]] + 1;
          totalUserCount.push(guest["id"]);
        }
      });
    }
    formatAnswers(answerObject);
    setTotalNumberOfUsers(totalUserCount.length);
  };

  //FORMAT DATA
  const formatAnswers = (answers) => {
    const formattedAnswers = [];
    const arrayOfAnswerNames = Object.keys(answers);
    arrayOfAnswerNames.forEach((name) => {
      formattedAnswers.push({
        Answer: name,
        "Times Selected": answers[name],
      });
    });
    setDataForChart(formattedAnswers);
  };

  const formatCircularEconomyAnswers = (answers) => {
    const formattedAnswers = [];
    const arrayOfAnswerNames = Object.keys(answers);
    arrayOfAnswerNames.forEach((name) => {
      formattedAnswers.push({
        Answer: name,
        Now: answers[name]["Now"],
        Future: answers[name]["Future"],
        Never: answers[name]["Never"],
      });
    });
    setDataForChart(formattedAnswers);
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
      <div style={{ display: "flex", padding: "20px" }}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "70vh" }}
        >
          <h2
            className={classes.Title}
            style={{
              fontSize: "20px",
              textAlign: "center",
              textDecoration: "underline",
              marginTop: "0px",
            }}
          >
            Select filters for game data:{" "}
          </h2>
          <FilterFormGameData
            gameDataRequestHandler={gameDataRequestHandler}
            councils={councils}
          />
          <h2
            className={classes.Title}
            style={{
              fontSize: "20px",
              textAlign: "center",
              textDecoration: "underline",
              marginTop: "0px",
            }}
          >
            Select filters for participation data:{" "}
          </h2>
          <FilterFormParticipationData
            participationDataRequestHandler={participationDataRequestHandler}
            councils={councils}
          />
        </div>
        <div>
          <h2
            className={classes.Title}
            style={{
              fontSize: "20px",
              textAlign: "center",
              textDecoration: "underline",
              margin: "0px",
            }}
          >
            {game} Results
          </h2>
          <BarChart chartData={dataForChart} game={game} />
          <p style={{ fontSize: "30px", textAlign: "center" }}>
            Total Users Represented in Chart: {totalNumberOfUsers}
          </p>
          <Description game={game} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
