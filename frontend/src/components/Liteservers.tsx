import { Box } from "@mui/material";
import React from "react";
import { getLiteServers } from "../api/Api";
import { TColumn, LiteServer } from "./types";
import DataGrid from "./ui/DataGrid/DataGrid";

const Liteservers: React.FC = () => {
  const [liteServers, setLiteServers] = React.useState<LiteServer[]>([]);
  console.log("Liteservers updated");
  const updateState: () => void = () =>
    getLiteServers().then((data: LiteServer[]) => setLiteServers(data));
  React.useEffect(() => {
    updateState();
    let timer = setInterval(() => updateState(), 5000);
    console.log("%ctimer mounted", "color: #8B4513");
    return () => {
      console.log("%ctimer unmounted", "color: #8B4513");
      clearInterval(timer);
    };
  }, [setLiteServers]);
  const columns: TColumn[] = [
    { name: "Index", type: "string", key: "index" },
    { name: "IP", type: "string", key: "ip" },
    { name: "Response time", type: "ping", key: "response_time" },
    { name: "Syncronized", type: "boolean", key: "syncronized" },
    { name: "Active", type: "boolean", key: "working" },
  ];

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {liteServers.length && <DataGrid columns={columns} data={liteServers} />}
    </Box>
  );
};

export default Liteservers;
