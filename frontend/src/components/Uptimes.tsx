import { Grid } from "@mui/material";
import React from "react";

import { getTonApisStats } from "../api/Api";
import InfoBlockItem from "./InfoBlock/InfoBlockItem";
import { Point, UptimesDataType, GraphProps } from "./types";
import Graph from "./ui/Graph";

const accessors = {
  xAccessor: (d: any) => d.x,
  yAccessor: (d: any) => d.y,
};

const Uptimes: React.FC = (...props) => {
  const [uptime, setUptime] = React.useState<UptimesDataType[]>([]);
  let graphData: GraphProps[] = [];
  const getApisData = () => {
    console.log("%cmockData updated ", "color: #008000");
    getTonApisStats()
      .then((data) => setUptime(data))
      .then(() => console.log("%cgetTonApisStats called ", "color: #008000"));
  };
  React.useEffect(() => {
    getApisData();
    let timer = setInterval(() => getApisData(), 5000);
    console.log("timer mounted");
    return () => {
      console.log("timer unmounted");
      clearInterval(timer);
    };
  }, []);
  uptime.length &&
    uptime.forEach((element) => {
      const { service_name, available, timestamp, response_time } = element;
      let firstData: Point[] = [];
      let secondData: Point[] = [];
      if (available && available.length)
        for (let i = 0; i < available.length; i++) {
          const date = new Date(timestamp[i] * 1000);
          firstData[i] = {
            x: date.toLocaleTimeString(),
            y: available[i] * 100,
          };
          secondData[i] = {
            x: date.toLocaleTimeString(),
            y: response_time[i],
          };
        }
      graphData.push({
        title: service_name,
        firstGraph: firstData,
        secondGraph: secondData,
        accessors: accessors,
      });
    });
  return (
    <>
      <Grid container columnSpacing="25px" rowSpacing="15px">
        {graphData.map((item, index) => (
          <InfoBlockItem
            xs={12}
            md={4}
            labelKey={item.title}
            key={index}
            renderComponent={<Graph {...item} />}
            customClass="uptime"
          />
        ))}
      </Grid>
    </>
  );
};

export default Uptimes;
