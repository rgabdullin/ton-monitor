import { Typography } from "@mui/material";
import React from "react";
import { getText } from "./helpers";
import { LastBlockType } from "./types";

const LastBlock: React.FC<LastBlockType> = (props: LastBlockType) => {
  const { masterchain, basechain } = props;
  return (
    <>
      <Typography variant="h4">{getText("lastblock.title")}</Typography>
      <Typography variant="h6">
        {getText("lastblock.masterchain")}: #{masterchain}
      </Typography>
      <Typography variant="h6">
        {getText("lastblock.basechain")}: #{basechain}
      </Typography>
    </>
  );
};

export default LastBlock;
