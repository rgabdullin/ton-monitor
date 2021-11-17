import { Grid } from "@mui/material";
import React from "react";

import { getTonApis } from "../api/Api";
import { mockUptime } from "./helpers";
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
  React.useEffect(() => {
    // getTonApis().then((data) => setUptime(data));
    setUptime(mockUptime);
  }, []);
  const getApisData = () => {
    setUptime(mockUptime);
    console.log("%cmockData updated ", "color: #008000");
    // getTonApis()
    //   .then((data) => setUptime(data))
    //   .then(() => console.log("%cgetTonApis called ", "color: #008000"));
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
    uptime.forEach((element, index) => {
      const { host, uptimes, timestamps, response_times } = element;
      let firstData: Point[] = [];
      let secondData: Point[] = [];
      if (uptimes && uptimes.length)
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
      <Grid container columnSpacing="25px">
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
