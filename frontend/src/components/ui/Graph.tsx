import React from "react";
import {
  AnimatedAxis, // any of these can be non-animated equivalents
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  AreaSeries,
  Tooltip,
} from "@visx/xychart";
import { LinearGradient } from "@visx/gradient";
import { ThemeConfig } from "@visx/xychart/lib/theme/buildChartTheme";
import { curveMonotoneX } from "@visx/curve";

import { Divider, Grid, Typography } from "@mui/material";
import { GraphProps } from "../types";

const Graph: React.FC<GraphProps> = (props: GraphProps) => {
  const { firstGraph, secondGraph, accessors, title } = props;

  return (
    <>
      <Typography variant="h6" align="center">
        {title}
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <XYChart
            height={180}
            xScale={{ type: "band" }}
            yScale={{ type: "radial" }}
          >
            <LinearGradient
              id="area-gradient"
              from="#109CF1"
              to="#109CF1"
              toOpacity={0.1}
            />
            <AreaSeries
              dataKey="Uptime"
              data={firstGraph}
              fillOpacity={0.4}
              xAccessor={accessors.xAccessor}
              yAccessor={accessors.yAccessor}
              fill="url(#area-gradient)"
              stroke="url(#area-gradient)"
              curve={curveMonotoneX}
              renderLine={false}
            />
            <AnimatedAxis orientation="left" tickValues={[50, 100]} />
            <AnimatedAxis orientation="bottom" numTicks={4} />
            <Tooltip
              snapTooltipToDatumX
              snapTooltipToDatumY
              showVerticalCrosshair
              showSeriesGlyphs
              renderTooltip={({ tooltipData }) =>
                tooltipData?.nearestDatum && (
                  <div>
                    {tooltipData.nearestDatum.key}=
                    {accessors.yAccessor(tooltipData.nearestDatum.datum)} at{" "}
                    {accessors.xAccessor(tooltipData.nearestDatum.datum)}
                  </div>
                )
              }
            />
          </XYChart>
        </Grid>
        <Grid item xs={12}>
          <XYChart
            height={180}
            xScale={{ type: "band" }}
            yScale={{ type: "linear" }}
          >
            <AnimatedAxis orientation="bottom" numTicks={4} />
            <AnimatedAxis orientation="left" numTicks={2} />
            <LinearGradient
              id="area-gradient"
              from="#109CF1"
              to="#109CF1"
              toOpacity={0.1}
            />
            <AreaSeries
              dataKey="Response time"
              data={secondGraph}
              fillOpacity={0.4}
              xAccessor={accessors.xAccessor}
              yAccessor={accessors.yAccessor}
              fill="url(#area-gradient)"
              stroke="url(#area-gradient)"
              curve={curveMonotoneX}
              renderLine={false}
            />
            <Tooltip
              snapTooltipToDatumX
              snapTooltipToDatumY
              showVerticalCrosshair
              showSeriesGlyphs
              renderTooltip={({ tooltipData }) =>
                tooltipData?.nearestDatum && (
                  <div>
                    <div>
                      {tooltipData.nearestDatum.key}=
                      {accessors.yAccessor(tooltipData.nearestDatum.datum)} at{" "}
                      {accessors.xAccessor(tooltipData.nearestDatum.datum)}
                    </div>
                  </div>
                )
              }
            />
          </XYChart>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default Graph;
