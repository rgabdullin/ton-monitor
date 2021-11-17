import React from "react";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Grid,
} from "@mui/material";
import { TDataGrid } from "../../types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import styles from "./DataGrid.module.scss";

const DataGrid: React.FC<TDataGrid> = ({ data, columns }) => {
  const getRenderValue = (value: string | boolean | number, type?: string) => {
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
                  return <TableCell key={column.key}>{column.name}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((dataItem, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell key={index} width="30px">
                      {index}
                    </TableCell>
                    {Object.entries(dataItem).map((entry, index) => {
                      return (
                        <TableCell key={entry[0]}>
                          {getRenderValue(entry[1], columns[index + 1].type)}
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
      {/* <Grid item xs={6}>
        <TableContainer className={styles.table}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  return <TableCell key={column.key}>{column.name}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((dataItem, index) => {
                return (
                  <TableRow key={index}>
                    {Object.entries(dataItem).map((entry) => {
                      return (
                        <TableCell key={entry[0]}>{String(entry[1])}</TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid> */}
    </Grid>
  );
};

export default DataGrid;
