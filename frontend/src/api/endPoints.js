const getNetworkStats = {
  name: "networkStats",
  method: "get",
  url: "getNetworkStats",
};

const getTonBridges = {
  name: "tonBridges",
  method: "get",
  url: "getTonBridges",
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

const getTonApis = {
  name: "tonApis",
  method: "get",
  url: "getTonApis",
};

const exported = {
  name: "get",
  url: "/api/",
  children: [
    getNetworkStats,
    getTonBridges,
    getLiteServers,
    getTonApis,
    getGovernance,
  ],
};

export default exported;
