import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const BarChart = ({chartData}) => {
    // Create chart instance
let chart = am4core.create("chartdiv", am4charts.XYChart);

// Create pie series
let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "Answer";
categoryAxis.fontSize = 10;
categoryAxis.renderer.labels.template.rotation = 20;

let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = "Times Selected";

let series = chart.series.push(new am4charts.ColumnSeries());
series.name = "Times Selected";
series.columns.template.tooltipText = "{categoryX}: {valueY}";
series.strokeWidth = 0;
series.columns.template.fill = am4core.color("#284690");
series.dataFields.valueY = "Times Selected";
series.dataFields.categoryX = "Answer";

// Add data
chart.data = chartData

// And, for a good measure, let's add a legend
chart.legend = new am4charts.Legend();

    return (
        <div>
            <div id="chartdiv" style={{height: "50vh", fontSize: "15px", width: "75vw"}} ></div>
        </div>
    );
};

export default BarChart;