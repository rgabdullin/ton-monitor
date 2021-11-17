import { Box, Grid } from "@mui/material";
import React from "react";
import { InfoBlockProps } from "../types";
import styles from "./InfoBlock.module.scss";
import { getRenderModel } from "../helpers";
import InfoBlockItem from "./InfoBlockItem";
const InfoBlock: React.FC<InfoBlockProps> = (props: InfoBlockProps) => {
  const { model } = props;
  const modelIsAvailable =
    model.blockRate.length &&
    Object.keys(model.tps).length &&
    Object.keys(model.validatorCounts).length;
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center" }}
      className={styles.infoBlock}
    >
      <Grid container columns={12} columnSpacing="25px">
        {modelIsAvailable &&
          getRenderModel(model).map((item) => (
            <InfoBlockItem {...item} key={item.labelKey} />
          ))}
      </Grid>
    </Box>
  );
};

export default InfoBlock;
