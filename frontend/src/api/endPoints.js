const getValidators = {
  name: "validators",
  method: "get",
  url: "getValidators",
};

const getLocalValidatorStatus = {
  name: "localValidatorStatus",
  method: "get",
  url: "getLocalValidatorStatus",
};

const getTps = {
  name: "tps",
  method: "get",
  url: "getTps",
};

const getLastBlock = {
  name: "lastBlock",
  method: "get",
  url: "getLastBlock",
};

const getTransactionStats = {
  name: "transactionStats",
  method: "get",
  url: "getTransactionStats",
};

const getTonBridgeStats = {
  name: "tonBridgeStats",
  method: "get",
  url: "getTonBridgeStats",
};

const getGovernance = {
  name: "governance",
  method: "get",
  url: "getGovernance",
};

const getLiteServers = {
  name: "liteServers",
  method: "get",
  url: "getLiteServers",
};

const getTonApisStats = {
  name: "tonApisStats",
  method: "get",
  url: "getTonApisStats",
};

const getBlockRate = {
  name: "blockRate",
  method: "get",
  url: "getBlockRate",
};

const getValidatorCounts = {
  name: "validatorCounts",
  method: "get",
  url: "getValidatorCounts",
};

const exported = {
  name: "get",
  url: "/api/",
  children: [
    getValidators,
    getLocalValidatorStatus,
    getTransactionStats,
    getLastBlock,
    getTps,
    getTonBridgeStats,
    getLiteServers,
    getTonApisStats,
    getGovernance,
    getBlockRate,
    getValidatorCounts,
  ],
};

export default exported;
