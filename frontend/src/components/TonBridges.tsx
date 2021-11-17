import { Grid, Link, Typography } from "@mui/material";
import React from "react";
import { getText } from "./helpers";
import { TonBridgesItem, TonBridgesProps } from "./types";
import DataGrid from "./ui/DataGrid/DataGrid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

const TonBridges: React.FC<TonBridgesProps> = (props: TonBridgesProps) => {
  const { model } = props;
  return (
    <>
      <Typography variant="h4">{getText("tonbridges.title")}</Typography>
      {model.map((item: TonBridgesItem) => (
        <Grid container>
          <Grid item xs={1}>
            {item.web_page_status === "available" ? (
              <CheckCircleIcon style={{ fill: "green" }} />
            ) : (
              <DoNotDisturbOnIcon style={{ fill: "red" }} />
            )}
          </Grid>
          <Grid item xs={4}>
            <Link href={item.url} underline="none" variant="body1">
              <Typography variant="h5">{item.name}</Typography>
            </Link>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default TonBridges;
