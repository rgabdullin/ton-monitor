import { Grid, Link, Typography } from "@mui/material";
import React from "react";
import { getText } from "./helpers";
import { TransactionStatsType, TransactionStatsProps } from "./types";

const TransactionStats: React.FC<TransactionStatsProps> = (
  props: TransactionStatsProps
) => {
  const { model } = props;
  const modelIsAvailable = model.length > 0;
  return (
    <>
      {modelIsAvailable ? (
        <>
          <Typography variant="h4">
            {getText("transactionstats.title")}
          </Typography>
          {model.map((item) => (
            <Typography variant="h6" key={item.transaction_type}>
              {item.transaction_type}: {item.total}
            </Typography>
          ))}
        </>
      ) : (
        <p>Service unavailable</p>
      )}
    </>
  );
};

export default TransactionStats;
