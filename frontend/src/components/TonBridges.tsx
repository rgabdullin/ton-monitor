import { Grid, Link, Typography } from "@mui/material";
import React from "react";
import { getText } from "./helpers";
import { TonBridgesItem, TonBridgesProps } from "./types";

const TonBridges: React.FC<TonBridgesProps> = (props: TonBridgesProps) => {
  const { model } = props;
  return (
    <>
      <Typography variant="h4">{getText("tonbridges.title")}</Typography>
      {model.map((item: TonBridgesItem) => (
        <>
          <Typography variant="h6" className="title">
            <Link
              href={item.url}
              underline="none"
              variant="body1"
              rel="noopener"
              target="_blank"
            >
              {item.name}
            </Link>
            <span className="status">
              {item.web_page_available[item.web_page_available.length - 1] > 0.5
                ? "Available"
                : "Not available"}
            </span>
          </Typography>
        </>
      ))}
    </>
  );
};

export default TonBridges;
