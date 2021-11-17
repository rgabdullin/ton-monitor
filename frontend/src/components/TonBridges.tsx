import { Grid, Link, Typography } from "@mui/material";
import React from "react";
import { getText } from "./helpers";
import { TonBridgesItem, TonBridgesProps } from "./types";

const TonBridges: React.FC<TonBridgesProps> = (props: TonBridgesProps) => {
  const { model } = props;
  const modelIsAvailable = model.length > 0;
  return (
    <>
      {modelIsAvailable ? (
        <>
          <Typography variant="h4">{getText("tonbridges.title")}</Typography>
          {model.map((item: TonBridgesItem) => (
            <span key={item.name}>
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
                  {getText(
                    `tonbridges.${
                      item.web_page_available[
                        item.web_page_available.length - 1
                      ] > 0.5
                        ? "available"
                        : "not_available"
                    }`
                  )}
                </span>
              </Typography>
            </span>
          ))}
        </>
      ) : (
        <p>Service unavailable</p>
      )}
    </>
  );
};

export default TonBridges;
