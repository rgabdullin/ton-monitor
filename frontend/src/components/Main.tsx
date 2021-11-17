import React from "react";
import { API_URL } from "../api/ApiTools";
import api, { getGovernance, getNetworkStats, getTonBridges } from "../api/Api";
import {
  GovernanceProps,
  TonBridgesItem,
  TonBridgesProps,
  TPSType,
} from "./types";
import { getText } from "./helpers";
import { Box, CircularProgress, Grid } from "@mui/material";
import Uptimes from "./Uptimes";
import InfoBlock from "./InfoBlock/InfoBlock";
import InfoBlockItem from "./InfoBlock/InfoBlockItem";
import Governance from "./Governance";
import TonBridges from "./TonBridges";
const Main: React.FC = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [networkStats, setNetworkStats] = React.useState<TPSType>(
    {} as TPSType
  );
  const [governance, setGovernance] = React.useState<GovernanceProps>(
    {} as GovernanceProps
  );
  const [tonBridges, setTonBridges] = React.useState<TonBridgesItem[]>([]);
  const getAllData = () => {
    getNetworkStats()
      .then((data) => setNetworkStats(data))
      .then(() => setIsLoaded(true))
      .then(() => console.log("%cgetNetworkStats called ", "color: #008000"));
    getGovernance()
      .then((data) => setGovernance(data))
      .then(() => setIsLoaded(true))
      .then(() => console.log("%cgetGovernance called ", "color: #008000"));
    getTonBridges()
      .then((data) => setTonBridges(data))
      .then(() => setIsLoaded(true))
      .then(() => console.log("%cgetTonBridges called ", "color: #008000"));
  };
  React.useEffect(() => {
    getAllData();
    let timer = setInterval(() => getAllData(), 5000);
    console.log("timer mounted");
    return () => {
      console.log("timer unmounted");
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="main">
      {!isLoaded ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {Object.keys(networkStats).length > 0 && (
            <InfoBlock model={networkStats} />
          )}
          <Uptimes />
          <Grid container columnSpacing="50px">
            <Grid item xs={12} md={6}>
              {Object.keys(governance).length > 0 && (
                <InfoBlockItem
                  xs={12}
                  labelKey="governance"
                  renderComponent={<Governance {...governance} />}
                  customClass="governance"
                />
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {Object.keys(tonBridges).length > 0 && (
                <InfoBlockItem
                  xs={12}
                  labelKey="tonBridges"
                  renderComponent={<TonBridges model={tonBridges} />}
                  customClass="tonBridges"
                />
              )}
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default Main;
