const TPS = {
  name: "TPS",
  method: "get",
  url: "getTPS",
};

const getUptime = {
  name: "uptime",
  method: "get",
  url: "getUptime",
};

const getGovernance = {
  name: "governance",
  method: "get",
  url: "getGovernance",
};

const getLiteservers = {
  name: "liteservers",
  method: "get",
  url: "getLiteservers",
};

const getBasicOnChainStats = {
  name: "basicOnChainStats",
  method: "get",
  url: "getBasicOnChainStats",
};

const exported = {
  name: "get",
  url: "/api/",
  children: [
    TPS,
    getUptime,
    getLiteservers,
    getBasicOnChainStats,
    getGovernance,
  ],
};

export default exported;
