import { Grid, Box } from "@mui/material";
import React from "react";
import { getValidators } from "../api/Api";
import { TColumn, Validator } from "./types";
import DataGrid from "./ui/DataGrid/DataGrid";

const Validators: React.FC = () => {
  const [validators, setValidators] = React.useState<Validator[]>([]);
  console.log("Validators updated");
  const updateState: () => void = () =>
    getValidators().then((data: Validator[]) => setValidators(data));
  React.useEffect(() => {
    updateState();
    // let timer = setInterval(() => updateState(), 5000);
    console.log("%ctimer mounted", "color: #8B4513");
    return () => {
      console.log("%ctimer unmounted", "color: #8B4513");
      //   clearInterval(timer);
    };
  }, [getValidators, setValidators]);
  const columns: TColumn[] = [
    { name: "Index", type: "string", key: "index" },
    { name: "ADNL address", type: "string", key: "adnlAddr" },
    { name: "Efficiency", type: "number", key: "efficiency" },
    { name: "Online", type: "boolean", key: "online" },
    { name: "Weight", type: "number", key: "weight" },
  ];
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {validators.length && <DataGrid columns={columns} data={validators} />}
    </Box>
  );
};

export default Validators;
