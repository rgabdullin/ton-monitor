import { Box, Grid } from "@mui/material";
import React from "react";
import { InfoBlockProps } from "../types";
import styles from "./InfoBlock.module.scss";
import { getRenderModel } from "../helpers";
import InfoBlockItem from "./InfoBlockItem";
const InfoBlock: React.FC<InfoBlockProps> = (props: InfoBlockProps) => {
  console.log("InfoBlock render");
  const { model } = props;
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center" }}
      className={styles.infoBlock}
    >
      <Grid container columns={12} columnSpacing="25px">
        {getRenderModel(model).map((item) => (
          <InfoBlockItem {...item} key={item.labelKey} />
        ))}
      </Grid>
    </Box>
  );
};

export default InfoBlock;
