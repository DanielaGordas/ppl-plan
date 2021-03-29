import React, { useState } from "react";
import "./Dashboard.css";

const FilterFormParticipationData = ({
  participationDataRequestHandler,
  councils,
}) => {
  const [filters, setFilters] = useState({});

  const participationFilters = [
      {text: "Participation by Age", value: "age"},
      {text: "Participation by Gender", value: "gender"},
      {text: "Participation by Ethnicity", value: "What is your ethnicity?"},
      {text: "Have participants have engaged in a policy consultation before?", value: "Have you ever engaged with a policy consultation run by your council before?"},
      {text: "Do participants feel they have an opportunity to shape local climate policy?", value: "Do you feel you have an opportunity to shape local climate policy?"}
  ];

  const filterAssignment = (value, filter) => {
    setFilters((prevState) => {
      const newState = { ...prevState };
      delete newState[filter];
      return newState;
    });
    if (value !== "Nationwide" && value !== "Select Participation Filter") {
      setFilters((prevState) => {
        return { ...prevState, [filter]: value };
      });
    }
  };

  const handleClick = (filters) => {
    if (filters.hasOwnProperty("participationFilter")) {
      participationDataRequestHandler(filters)
    }
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "20vw",
        marginRight: "10px",
      }}
    >
      <select
        onChange={(event) => filterAssignment(event.target.value, "council")}
        className="filterForm"
      >
        <option defaultValue="Nationwide" key="Nationwide">
          Nationwide
        </option>
        {councils &&
          councils.map((council) => {
            return (
              <option value={council} key={council}>
                {council}
              </option>
            );
          })}
      </select>
      <br></br>
      <select
        onChange={(event) =>
          filterAssignment(event.target.value, "participationFilter")
        }
        className="filterForm"
      >
        <option
          defaultValue="Select Participation Filter"
          key="Select Participation Filter"
          disabled
          selected
          hidden
        >
          Select Participation Filter
        </option>
        {participationFilters.map((filter) => {
          return (
            <option value={filter.value} key={filter.value}>
              {filter.text}
            </option>
          );
        })}
      </select>
      <br></br>
      <button
        style={{ width: "200px", display: "block", margin: "20px auto" }}
        className="filterForm"
        onClick={(event) => {
          event.preventDefault();
          handleClick(filters);
        }}
      >
        {" "}
        View Participation Data
      </button>
    </form>
  );
};

export default FilterFormParticipationData;
