import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const PieChart = ({chartData}) => {
    // Create chart instance
let chart = am4core.create("chartdiv", am4charts.PieChart);
let title = chart.titles.create();
// title.text = "Pass title as props?";
// title.fontSize = 15;
// title.marginBottom = 1;

// Create pie series
let series = chart.series.push(new am4charts.PieSeries());
series.dataFields.value = "Times Selected";
series.dataFields.category = "Answer";

// Add data
chart.data = chartData

// And, for a good measure, let's add a legend
// chart.legend = new am4charts.Legend();

    return (
        <div>
            <div id="chartdiv" style={{height: "40vh", fontSize: "20px", width: "60vw"}} ></div>
        </div>
    );
};

export default PieChart;