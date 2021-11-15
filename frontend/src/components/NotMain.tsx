import { Grid } from "@mui/material";
import React from "react";

import { getUptime } from "../api/Api";
import { Point, UptimesDataType, GraphProps } from "./types";
import Graph from "./ui/Graph";

const accessors = {
  xAccessor: (d: any) => d.x,
  yAccessor: (d: any) => d.y,
};

const NotMain: React.FC = (...props) => {
  const [uptime, setUptime] = React.useState<UptimesDataType[]>([]);
  let graphData: GraphProps[] = [];
  React.useEffect(() => {
    getUptime().then((data) => setUptime(data));
  }, []);
  uptime.forEach((element, index) => {
    const { host, uptimes, timestamps, response_times } = element;
    let firstData: Point[] = [];
    let secondData: Point[] = [];

    for (let i = 0; i < uptimes.length; i++) {
      var date = new Date(timestamps[i] * 1000);
      firstData[i] = {
        x: date.toLocaleTimeString(),
        y: uptimes[i] * 100,
      };
      secondData[i] = {
        x: date.toLocaleTimeString(),
        y: response_times[i],
      };
    }
    graphData.push({
      title: host,
      firstGraph: firstData,
      secondGraph: secondData,
      accessors: accessors,
    });
  });
  return (
    <>
      <Grid container>
        {graphData.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Graph {...item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default NotMain;
