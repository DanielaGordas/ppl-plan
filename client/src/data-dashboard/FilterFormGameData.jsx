import React, { useState } from "react";
import "./Dashboard.css"

const FilterFormGameData = ({
  callAnswersWithNoFilters,
  fetchUsersThatComplyWithFilters,
  councils
}) => {
  const [filters, setFilters] = useState({});
  const games = [
    "Low Carbon Travel",
    "Circular Economy",
    "Retrofit Homes",
    "Nature",
    "Clean Energy",
    "Sustainable Food System - Food Waste",
    "Sustainable Food System - Animal Agriculture & Diet",
    "Sustainable Food System - Localised Food System",
    "Research and Development"
  ];

  const filterAssignment = (value, filter) => {
    setFilters((prevState) => {
      const newState = { ...prevState };
      delete newState[filter];
      return newState;
    });
    if (
      value !== "Nationwide" &&
      value !== "All Genders" &&
      value !== "All Ages" &&
      value !== "All Ethnicities"
    ) {
      setFilters((prevState) => {
        return { ...prevState, [filter]: value };
      });
    }
  };

  const handleClick = (filters) => {
    if (filters.hasOwnProperty("game")) {
      if (
        filters.hasOwnProperty("council") ||
        filters.hasOwnProperty("age") ||
        filters.hasOwnProperty("gender") ||
        filters.hasOwnProperty("ethnicity") 
      ) {
        fetchUsersThatComplyWithFilters(filters)
      }
      else {
        callAnswersWithNoFilters(filters["game"])
      }
    }
  };

  return (
      <form style={{display: "flex", flexDirection: "column", height: "100vh", width: "20vw", marginRight: "10px"}}>
        <select
          onChange={(event) => filterAssignment(event.target.value, "game")}
          className="filterForm"
        >
          <option
            defaultValue="Select Game"
            key="Select Game"
            disabled
            selected
            hidden
          >
            Select Game
          </option>
          {games.map((game) => {
            return (
              <option value={game} key={game}>
                {game}
              </option>
            );
          })}
        </select>
        <br></br>
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
          onChange={(event) => filterAssignment(event.target.value, "gender")}
          className="filterForm"
        >
          <option defaultValue="All Genders" key="All Genders">
            All Genders
          </option>
          <option value="Man" key="Man">
            Male Users
          </option>
          <option value="Woman" key="Woman">
            Female Users
          </option>
        </select>
        <br></br>
        <select
          onChange={(event) => filterAssignment(event.target.value, "age")}
          className="filterForm"
        >
          <option defaultValue="All Ages" key="All Ages">
            All Ages
          </option>
          <option value="16-24" key="16-24">
            16-24
          </option>
          <option value="25-34" key="25-34">
            25-34
          </option>
          <option value="35-44" key="35-44">
            35-44
          </option>
          <option value="45-54" key="45-54">
            45-54
          </option>
          <option value="55-64" key="55-64">
            55-64
          </option>
          <option value="65+" key="65+">
            65+
          </option>
        </select>
        <br></br>
        <select
          onChange={(event) =>
            filterAssignment(event.target.value, "ethnicity")
          }
          className="filterForm"
        >
          <option defaultValue="All Ethnicities" key="All Ethnicities">
            All Ethnicities
          </option>
          <option value="White: English, Welsh, Scottish, Northern Irish or British">
            White: English, Welsh, Scottish, Northern Irish or British
          </option>
          <option value="White: Irish">White: Irish</option>
          <option value="White: Gypsy or Irish Traveller">
            White: Gypsy or Irish Traveller
          </option>
          <option value="Any other White background">
            Any other White background
          </option>
          <option value="Mixed: White and Black Caribbean">
            Mixed: White and Black Caribbean
          </option>
          <option value="Mixed: White and Black African">
            Mixed: White and Black African
          </option>
          <option value="Mixed: White and Asian">Mixed: White and Asian</option>
          <option value="Any other Mixed or Multiple ethnic background">
            Any other Mixed or Multiple ethnic background
          </option>
          <option value="Indian">Indian</option>
          <option value="Pakistani">Pakistani</option>
          <option value="Bangladeshi">Bangladeshi</option>
          <option value="Chinese">Chinese</option>
          <option value="Any other Asian background">
            Any other Asian background
          </option>
          <option value="African">African</option>
          <option value="Caribbean">Caribbean</option>
          <option value="Any other Black, African or Caribbean background">
            Any other Black, African or Caribbean background
          </option>
          <option value="Arab">Arab</option>
        </select>
        <button
        style={{width: "200px", display: "block", margin: "20px auto"}}
        className="filterForm"
        onClick={(event) => {
          event.preventDefault();
          handleClick(filters);
        }}
      >
        {" "}
        View Game Data
      </button>
      </form>
  );
};

export default FilterFormGameData;
