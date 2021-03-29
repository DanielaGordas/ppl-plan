import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";

export const configureCircularEconomyChart = (chartData, chart)=>{
    // Create series
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "Answer";
    categoryAxis.fontSize = 10;
    categoryAxis.renderer.labels.template.rotation = 20;
    
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Times Selected";
    
    let seriesNow = chart.series.push(new am4charts.ColumnSeries());
    seriesNow.name = "Now";
    seriesNow.columns.template.tooltipText = "({categoryX}) Now: {valueY}";
    seriesNow.strokeWidth = 0;
    seriesNow.columns.template.fill = am4core.color("#727171");
    seriesNow.dataFields.valueY = "Now";
    seriesNow.dataFields.categoryX = "Answer";

    let seriesFuture = chart.series.push(new am4charts.ColumnSeries());
    seriesFuture.name = "Future";
    seriesFuture.columns.template.tooltipText = "({categoryX}) Future: {valueY}";
    seriesFuture.strokeWidth = 0;
    seriesFuture.columns.template.fill = am4core.color("#343a40");
    seriesFuture.dataFields.valueY = "Future";
    seriesFuture.dataFields.categoryX = "Answer";

    let seriesNever = chart.series.push(new am4charts.ColumnSeries());
    seriesNever.name = "Never";
    seriesNever.columns.template.tooltipText = "({categoryX}) Never: {valueY}";
    seriesNever.strokeWidth = 0;
    seriesNever.columns.template.fill = am4core.color("#284690");
    seriesNever.dataFields.valueY = "Never";
    seriesNever.dataFields.categoryX = "Answer";
    
    // Add data
    chart.data = chartData
    
    // And, for a good measure, let's add a legend
    chart.legend = new am4charts.Legend();
    }