import React, { useRef } from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import PropTypes from "prop-types";

const ChartWrapper = styled.div`
  height: 100%;
  width:100%;
  background-color: #cccccc;
`;

const BarChart = (props) => {
  const ref = useRef("chart");

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.title,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.data,
      },
    ],
  };

  return (
    <ChartWrapper>
      <Bar ref={ref} data={data} />
    </ChartWrapper>
  );
};

BarChart.propTypes = {
  labels: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};


export default BarChart;
