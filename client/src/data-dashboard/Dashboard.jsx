import React, { useEffect, useState } from "react";
import FilterFormGameData from "./FilterFormGameData";
import FilterFormParticipationData from "./FilterFormParticipationData";
import BarChart from "./BarChart";
import CircularEconomyBC from "./CircularEconomyBC";
import Description from "./Description";
import "./Dashboard.css";
import classes from "../styles/pages/home.module.scss";
import axios from "axios";
import answerData from "./answerData";
import * as am4core from "@amcharts/amcharts4/core";

const Dashboard = () => {
  const [dataForChart, setDataForChart] = useState([]);
  const [totalNumberOfUsers, setTotalNumberOfUsers] = useState();
  const [game, setGame] = useState("");
  const [guests, setGuests] = useState();
  const [answers, setAnswers] = useState();
  const [questions, setQuestions] = useState();
  const [councils, setCouncils] = useState();

  //CALL DATA AND SAVE TO STATE ON PAGE LOAD
  useEffect(() => {
    axios
      .get("https://game.peoplesplan.org/api/guests")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setGuests(data);
        let arrayOfCouncils = [];
        data.forEach((guest) => {
          if (arrayOfCouncils.includes(guest.council) === false) {
            if (guest.council !== null) {
              arrayOfCouncils.push(guest.council);
            }
          }
        });
        arrayOfCouncils.sort();
        setCouncils(arrayOfCouncils);
      });
    axios
      .get("https://game.peoplesplan.org/api/answers")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setAnswers(data);
      });
    axios
      .get("https://game.peoplesplan.org/api/questions")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setQuestions(data);
      });
  }, []);

  //SORTING DATA AND APPLYING FILTERS
  const fetchUsersThatComplyWithFilters = (filters) => {
    setGame(filters["game"]);
    const filtersInUse = { ...filters };
    delete filtersInUse["game"];
    delete filtersInUse["ethnicity"];
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
        setTotalNumberOfUsers(arrayOfUsersWithFilteredEthnicity.length);
        callCorrectChart(arrayOfUsersWithFilteredEthnicity, filters["game"]);
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
        setTotalNumberOfUsers(arrayOfUsersWithFilteredEthnicity.length);
        callCorrectChart(arrayOfUsersWithFilteredEthnicity, filters["game"]);
      }
    } else {
      setTotalNumberOfUsers(desiredUserIds.length);
      callCorrectChart(desiredUserIds, filters["game"]);
    }
  };

  const callCorrectChart = (desiredUserIds, game) => {
    setTotalNumberOfUsers(desiredUserIds.length);
    if (
      game === "Low Carbon Travel" ||
      game === "Nature" ||
      game === "Research and Development"
    ) {
      simpleBarChartWithFilters(desiredUserIds, game);
    } else if (game === "Retrofit Homes") {
      retrofitBarChartWithFilters(desiredUserIds);
    } else if (game === "Clean Energy") {
      cleanEnergyWithFilters(desiredUserIds);
    } else if (
      game === "Sustainable Food System - Food Waste" ||
      game === "Sustainable Food System - Animal Agriculture & Diet" ||
      game === "Sustainable Food System - Localised Food System"
    ) {
      sustainableFoodSystemWithFilters(desiredUserIds, game);
    } else if (game === "Circular Economy") {
      circularEconomyWithFilters(desiredUserIds);
    }
  };

  const simpleBarChartWithFilters = (userIds, game) => {
    const answerObject = { ...answerData[game] };
    const answersKeys = Object.keys(answerObject);
    answers.forEach((answer) => {
      if (
        answer["game"] === game &&
        userIds.includes(answer["guest_id"]) &&
        answersKeys.includes(answer["name"])
      ) {
        answerObject[answer["name"]] = answerObject[answer["name"]] + 1;
      }
    });
    formatAnswers(answerObject);
  };

  const retrofitBarChartWithFilters = (userIds) => {
    const answerObject = { ...answerData["Retrofit Homes"] };
    const answerObjectKeys = Object.keys(answerObject);
    answers.forEach((answer) => {
      if (
        answer["game"] === "Retrofit Homes" &&
        userIds.includes(answer["guest_id"]) &&
        answerObjectKeys.includes(answer["name"])
      ) {
        let points = 10 - parseInt(answer["column"]);
        answerObject[answer["name"]] = answerObject[answer["name"]] + points;
      }
    });
    formatAnswers(answerObject);
  };

  const cleanEnergyWithFilters = (userIds) => {
    const answerObject = { ...answerData["Clean Energy"] };
    const answerObjectKeys = Object.keys(answerObject);
    answers.forEach((answer) => {
      if (
        answer["game"] === "Clean Energy" &&
        userIds.includes(answer["guest_id"]) &&
        answerObjectKeys.includes(answer["column"])
      ) {
        answerObject[answer["column"]] = answerObject[answer["column"]] + 1;
      }
    });
    formatAnswers(answerObject);
  };

  const sustainableFoodSystemWithFilters = (userIds, game) => {
    const sustainableFSSubCategory = (game) => {
      if (game === "Sustainable Food System - Food Waste") {
        return "food waste";
      } else if (
        game === "Sustainable Food System - Animal Agriculture & Diet"
      ) {
        return "animal agriculture & diet";
      } else if (game === "Sustainable Food System - Localised Food System") {
        return "localised food system";
      }
    };
    const subCategory = sustainableFSSubCategory(game);
    const answerObject = {
      ...answerData["Sustainable Food System"][subCategory],
    };
    const answerObjectKeys = Object.keys(answerObject);
    answers.forEach((answer) => {
      if (
        answer["game"] === "Sustainable Food System" &&
        userIds.includes(answer["guest_id"]) &&
        answerObjectKeys.includes(answer["name"]) &&
        answer["category"] === subCategory
      ) {
        answerObject[answer["name"]] = answerObject[answer["name"]] + 1;
      }
    });
    formatAnswers(answerObject);
  };

  const circularEconomyWithFilters = (userIds) => {
    const answerObject = { ...answerData["Circular Economy"] };
    const answerObjectKeys = Object.keys(answerObject);
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
      }
    });
    formatCircularEconomyAnswers(answerObject);
  };

  //SORTING DATA WITHOUT APPLYING FILTERS
  const callAnswersWithNoFilters = (game) => {
    setGame(game);
    if (
      game === "Low Carbon Travel" ||
      game === "Nature" ||
      game === "Research and Development"
    ) {
      simpleBarChartWithoutFilters(game);
    } else if (game === "Retrofit Homes") {
      retrofitBarChartWithoutFilters();
    } else if (game === "Clean Energy") {
      cleanEnergyWithoutFilters();
    } else if (
      game === "Sustainable Food System - Food Waste" ||
      game === "Sustainable Food System - Animal Agriculture & Diet" ||
      game === "Sustainable Food System - Localised Food System"
    ) {
      sustainableFoodSystemWithoutFilters(game);
    } else if (game === "Circular Economy") {
      circularEconomyWithoutFilters("Circular Economy");
    }
  };

  const simpleBarChartWithoutFilters = (game) => {
    const listOfTotalUsers = [];
    const answerObject = { ...answerData[game] };
    const answerObjectKeys = Object.keys(answerObject);
    answers.forEach((answer) => {
      if (listOfTotalUsers.includes(answer["guest_id"]) === false) {
        listOfTotalUsers.push(answer["guest_id"]);
      }
      if (
        answer["game"] === game &&
        answerObjectKeys.includes(answer["name"])
      ) {
        answerObject[answer["name"]] = answerObject[answer["name"]] + 1;
      }
    });
    setTotalNumberOfUsers(listOfTotalUsers.length);
    formatAnswers(answerObject);
  };

  const retrofitBarChartWithoutFilters = () => {
    const listOfTotalUsers = [];
    const answerObject = { ...answerData["Retrofit Homes"] };
    const answerObjectKeys = Object.keys(answerObject);
    answers.forEach((answer) => {
      if (listOfTotalUsers.includes(answer["guest_id"]) === false) {
        listOfTotalUsers.push(answer["guest_id"]);
      }
      if (
        answer["game"] === "Retrofit Homes" &&
        answerObjectKeys.includes(answer["name"])
      ) {
        let points = 10 - parseInt(answer["column"]);
        answerObject[answer["name"]] = answerObject[answer["name"]] + points;
      }
    });
    setTotalNumberOfUsers(listOfTotalUsers.length);
    formatAnswers(answerObject);
  };

  const cleanEnergyWithoutFilters = () => {
    const listOfTotalUsers = [];
    const answerObject = { ...answerData["Clean Energy"] };
    const answerObjectKeys = Object.keys(answerObject);
    answers.forEach((answer) => {
      if (listOfTotalUsers.includes(answer["guest_id"]) === false) {
        listOfTotalUsers.push(answer["guest_id"]);
      }
      if (
        answer["game"] === "Clean Energy" &&
        answerObjectKeys.includes(answer["column"])
      ) {
        answerObject[answer["column"]] = answerObject[answer["column"]] + 1;
      }
    });
    setTotalNumberOfUsers(listOfTotalUsers.length);
    formatAnswers(answerObject);
  };

  const sustainableFoodSystemWithoutFilters = (game) => {
    const sustainableFSSubCategory = (game) => {
      if (game === "Sustainable Food System - Food Waste") {
        return "food waste";
      } else if (
        game === "Sustainable Food System - Animal Agriculture & Diet"
      ) {
        return "animal agriculture & diet";
      } else if (game === "Sustainable Food System - Localised Food System") {
        return "localised food system";
      }
    };
    const subCategory = sustainableFSSubCategory(game);
    const listOfTotalUsers = [];
    const answerObject = {
      ...answerData["Sustainable Food System"][subCategory],
    };
    const answerObjectKeys = Object.keys(answerObject);
    answers.forEach((answer) => {
      if (listOfTotalUsers.includes(answer["guest_id"]) === false) {
        listOfTotalUsers.push(answer["guest_id"]);
      }
      if (
        answer["game"] === "Sustainable Food System" &&
        answerObjectKeys.includes(answer["name"]) &&
        answer["category"] === subCategory
      ) {
        answerObject[answer["name"]] = answerObject[answer["name"]] + 1;
      }
    });
    setTotalNumberOfUsers(listOfTotalUsers.length);
    formatAnswers(answerObject);
  };

  const circularEconomyWithoutFilters = () => {
    const listOfTotalUsers = [];
    const answerObject = { ...answerData["Circular Economy"] };
    const answerObjectKeys = Object.keys(answerObject);
    answers.forEach((answer) => {
      if (listOfTotalUsers.includes(answer["guest_id"]) === false) {
        listOfTotalUsers.push(answer["guest_id"]);
      }
      if (
        answer["game"] === "Circular Economy" &&
        answerObjectKeys.includes(answer["name"])
      ) {
        const nowFutureOrNever = answer["column"];
        const answerName = answer["name"];
        answerObject[answerName][nowFutureOrNever] =
          answerObject[answerName][nowFutureOrNever] + 1;
      }
    });
    formatCircularEconomyAnswers(answerObject);
  };

  //PARTICIPATION DATA
  const participationDataNationWide = (participationFilter) => {
    setGame("");
    const answerObject = { ...answerData[participationFilter] };
    const answerObjectKeys = Object.keys(answerObject);
    const listOfTotalUsers = [];
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
          answerObjectKeys.includes(question["answer"])
        ) {
          answerObject[question["answer"]] =
            answerObject[question["answer"]] + 1;
          listOfTotalUsers.push(question["guest_id"]);
        }
      });
      setTotalNumberOfUsers(listOfTotalUsers.length);
      formatAnswers(answerObject);
    } else if (
      participationFilter === "age" ||
      participationFilter === "gender"
    ) {
      guests.forEach((guest) => {
        if (answerObjectKeys.includes(guest[participationFilter])) {
          answerObject[guest[participationFilter]] =
            answerObject[guest[participationFilter]] + 1;
          listOfTotalUsers.push(guest["id"]);
        }
      });
      setTotalNumberOfUsers(listOfTotalUsers.length);
      formatAnswers(answerObject);
    }
  };

  const participationDataSpecificCouncil = (filters) => {
    setGame("");
    const answerObject = { ...answerData[filters["participationFilter"]] };
    const answerObjectKeys = Object.keys(answerObject);
    const listOfTotalUsers = [];
    const guestIDs = [];
    if (
      filters["participationFilter"] === "What is your ethnicity?" ||
      filters["participationFilter"] ===
        "Have you ever engaged with a policy consultation run by your council before?" ||
      filters["participationFilter"] ===
        "Do you feel you have an opportunity to shape local climate policy?"
    ) {
      guests.forEach((guest) => {
        if (guest["council"] === filters["council"]) {
          guestIDs.push(guest["id"]);
        }
      });
      questions.forEach((question) => {
        if (
          question["question"] === filters["participationFilter"] &&
          answerObjectKeys.includes(question["answer"]) &&
          guestIDs.includes(question["guest_id"])
        ) {
          answerObject[question["answer"]] =
            answerObject[question["answer"]] + 1;
          listOfTotalUsers.push(question["guest_id"]);
        }
      });
      setTotalNumberOfUsers(listOfTotalUsers.length);
      formatAnswers(answerObject);
    } else if (
      filters["participationFilter"] === "age" ||
      filters["participationFilter"] === "gender"
    ) {
      guests.forEach((guest) => {
        if (
          answerObjectKeys.includes(guest[filters["participationFilter"]]) &&
          guest["council"] === filters["council"]
        ) {
          answerObject[guest[filters["participationFilter"]]] =
            answerObject[guest[filters["participationFilter"]]] + 1;
          listOfTotalUsers.push(guest["id"]);
        }
      });
      setTotalNumberOfUsers(listOfTotalUsers.length);
      formatAnswers(answerObject);
    }
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
    //am4core.disposeAllCharts();
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
    //am4core.disposeAllCharts();
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
            callAnswersWithNoFilters={callAnswersWithNoFilters}
            fetchUsersThatComplyWithFilters={fetchUsersThatComplyWithFilters}
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
            participationDataNationWide={participationDataNationWide}
            participationDataSpecificCouncil={participationDataSpecificCouncil}
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
         
          {game !== "Circular Economy" ? (
            <BarChart chartData={dataForChart} />
          ) : (
            <CircularEconomyBC chartData={dataForChart} />
          )}
          <p style={{ fontSize: "30px", textAlign: "center" }}>
            Total Users: {totalNumberOfUsers}
          </p>
          <Description game={game} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
