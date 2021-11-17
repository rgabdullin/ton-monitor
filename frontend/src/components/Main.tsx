import React from "react";
import { API_URL } from "../api/ApiTools";
import api, {
  getGovernance,
  getTps,
  getTonBridgeStats,
  getBlockRate,
  getValidatorCounts,
  getLastBlock,
} from "../api/Api";
import {
  BlockRateType,
  GovernanceProps,
  LastBlockType,
  TonBridgesItem,
  TonBridgesProps,
  TPSType,
  ValidatorCountsType,
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
  const [tps, setTps] = React.useState<TPSType>({} as TPSType);
  const [blockRate, setBlockRate] = React.useState<BlockRateType[]>(
    [] as BlockRateType[]
  );
  const [validatorCounts, setValidatorCounts] =
    React.useState<ValidatorCountsType>({} as ValidatorCountsType);
  const [governance, setGovernance] = React.useState<GovernanceProps>(
    {} as GovernanceProps
  );
  const [tonBridges, setTonBridges] = React.useState<TonBridgesItem[]>([]);
  const [lastBlock, setLastBlock] = React.useState<LastBlockType>(
    {} as LastBlockType
  );
  const getAllData = () => {
    getTps()
      .then((data) => setTps(data))
      .then(() => setIsLoaded(true))
      .then(() => console.log("%cgetTps called ", "color: #008000"));
    getBlockRate()
      .then((data) => setBlockRate(data))
      .then(() => setIsLoaded(true))
      .then(() => console.log("%cgetBlockRate called ", "color: #008000"));
    getValidatorCounts()
      .then((data) => setValidatorCounts(data))
      .then(() => setIsLoaded(true))
      .then(() => console.log("%cgetBlockRate called ", "color: #008000"));
    getGovernance()
      .then((data) => setGovernance(data))
      .then(() => setIsLoaded(true))
      .then(() => console.log("%cgetGovernance called ", "color: #008000"));
    getTonBridgeStats()
      .then((data) => setTonBridges(data))
      .then(() => setIsLoaded(true))
      .then(() => console.log("%cgetTonBridgeStats called ", "color: #008000"));
    getLastBlock()
      .then((data) => setLastBlock(data))
      .then(() => setIsLoaded(true))
      .then(() => console.log("%cgetLastBlock called ", "color: #008000"));
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
          {Object.keys(tps).length > 0 && (
            <InfoBlock
              model={{
                tps,
                blockRate,
                validatorCounts,
                shardchains: lastBlock.shards,
              }}
            />
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
