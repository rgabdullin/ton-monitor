import { Grid, Typography } from "@mui/material";
import React from "react";
import { InfoBlockItemProps } from "../types";
import styles from "./InfoBlock.module.scss";
import { getText } from "../helpers";
import cx from "classnames";
const InfoBlockItem: React.FC<InfoBlockItemProps> = (
  props: InfoBlockItemProps
) => {
  const {
    value,
    labelKey,
    isSplitted,
    splitedArray,
    renderComponent,
    customClass,
    ...other
  } = props;
  return (
    <>
      {renderComponent ? (
        <Grid item {...other}>
          <div
            className={cx(
              styles.infoBlockItem,
              customClass && styles[`infoBlockItem_${customClass}`]
            )}
          >
            {renderComponent}
          </div>
        </Grid>
      ) : !isSplitted ? (
        <Grid item {...other}>
          <div className={styles.infoBlockItem}>
            <Typography variant="h4">{value}</Typography>
            <Typography variant="body1">{getText(labelKey)}</Typography>
          </div>
        </Grid>
      ) : (
        <Grid item {...other}>
          <div className={styles.infoBlockItem}>
            <Typography variant="h6">{getText(labelKey)}</Typography>
            <div className={styles.splittedBlock}>
              {splitedArray?.map((item) => (
                <div className={styles.splittedBlockItem} key={item.labelKey}>
                  <Typography variant="body1">{item.value}</Typography>
                  <Typography variant="body2">
                    {getText(item.labelKey)}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </Grid>
      )}
    </>
  );
};

export default InfoBlockItem;
