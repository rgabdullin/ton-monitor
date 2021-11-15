import React from "react";
import { API_URL } from "../api/ApiTools";
import api, { getTPS, getUptime } from "../api/Api";
import { TPSType } from "./types";
import { getText } from "./helpers";
import { Box, CircularProgress } from "@mui/material";
import NotMain from "./NotMain";
import InfoBlock from "./InfoBlock/InfoBlock";
const Main: React.FC = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [tps, setTps] = React.useState({} as TPSType);
  React.useEffect(() => {
    getTPS()
      .then((data) => setTps(data))
      .then(() => setIsLoaded(true));
  }, []);
  return (
    <div className="main">
      {!isLoaded ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <InfoBlock model={tps} />
      )}
      <NotMain />
    </div>
  );
};

export default Main;
