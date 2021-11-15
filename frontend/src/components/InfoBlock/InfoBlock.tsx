import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { InfoBlockProps, TPSType } from "../types";
import styles from "./InfoBlock.module.scss";
import { getText } from "../helpers";
import cx from "classnames";
import { type } from "os";
const InfoBlock: React.FC<InfoBlockProps> = (props: InfoBlockProps) => {
  const { model } = props;
  console.log(model);
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center" }}
      className={styles.infoBlock}
    >
      <Grid container columns={10}>
        <Grid item xs={5} md={2} className={styles.infoBlockItem}>
          <Typography variant="h4">{model.tps}</Typography>
          <Typography variant="body1">{getText("tps.tps")}</Typography>
        </Grid>
        <Grid item xs={5} md={2} className={styles.infoBlockItem}>
          <Typography variant="h4">{model.shardchains}</Typography>
          <Typography variant="body1">{getText("tps.shardchains")}</Typography>
        </Grid>
        <Grid item xs={10} md={2} className={styles.infoBlockItem}>
          <Typography variant="h6">{getText("tps.validators")}</Typography>
          <div className={styles.validatorsBlock}>
            <div className={styles.validatorsBlockItem}>
              <Typography variant="body1">{model.validators.online}</Typography>
              <Typography variant="body2">
                {getText("tps.validators.online")}
              </Typography>
            </div>
            <div className={styles.validatorsBlockItem}>
              <Typography variant="body1">{model.validators.total}</Typography>
              <Typography variant="body2">
                {getText("tps.validators.total")}
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={5} md={2} className={styles.infoBlockItem}>
          <Typography variant="h4">{model.block_rate.basechain}</Typography>
          <Typography variant="body1">
            {getText("tps.block_rate.basechain")}
          </Typography>
        </Grid>

        <Grid item xs={5} md={2} className={styles.infoBlockItem}>
          <Typography variant="h4">{model.block_rate.masterchain}</Typography>
          <Typography variant="body1">
            {getText("tps.block_rate.masterchain")}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InfoBlock;
