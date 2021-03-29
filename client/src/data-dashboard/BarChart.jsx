import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { configureCircularEconomyChart } from "./circularEconomyChartConfig";
import { configureBarChart } from "./barChartConfig";

const BarChart = ({ chartData, game }) => {

  let chart = am4core.create("chartdiv", am4charts.XYChart);

  if (game !== "Circular Economy") {
    configureBarChart(chartData, chart);
  } else {
    configureCircularEconomyChart(chartData, chart);
  }

  return (
    <div
      id="chartdiv"
      style={{ height: "50vh", fontSize: "15px", width: "75vw" }}
    ></div>
  );
};

export default BarChart;
