import React from "react";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Grid,
  Typography,
} from "@mui/material";
import { TDataGrid } from "../../types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import styles from "./DataGrid.module.scss";

const DataGrid: React.FC<TDataGrid> = ({ data, columns }) => {
  const getRenderValue = (value: string | boolean | number, types: number) => {
    const type = columns[types] ? columns[types].type : "string";
    switch (type) {
      case "string":
        return value;
      case "ping":
        const intValue: number = parseInt(String(value)) || 0;
        return intValue ? (
          `${intValue} ms`
        ) : (
          <DoNotDisturbOnIcon style={{ fill: "red" }} />
        );
      case "boolean":
        return value ? (
          <CheckCircleIcon style={{ fill: "green" }} />
        ) : (
          <DoNotDisturbOnIcon style={{ fill: "red" }} />
        );
      default:
        return String(value);
    }
  };
  return (
    <Grid container className={styles.tableContainer} spacing={"10px"}>
      <Grid item xs={12}>
        <TableContainer className={styles.table}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  return (
                    <TableCell key={column.key}>
                      <Typography variant="body1">{column.name}</Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((dataItem, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell key={index} width="30px">
                      <Typography variant="body2">{index}</Typography>
                    </TableCell>
                    {Object.entries(dataItem).map((entry, newIndex) => {
                      return (
                        <TableCell key={entry[0]}>
                          <Typography variant="body2">
                            {getRenderValue(entry[1], newIndex + 1)}
                          </Typography>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default DataGrid;
