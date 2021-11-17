import api from './ApiTools';

export const getNetworkStats = async() => {
    const { response } = await api.get.networkStats();
    return response;
}

export const getTonApis = async() => {
    const { response } = await api.get.tonApis();
    return response;
}

export const getTonBridges = async() => {
    const { response } = await api.get.tonBridges();
    return response;
}

export const getGovernance = async() => {
    const { response } = await api.get.governance();
    return response;
}

export const getLiteServers = async() => {
    const { response } = await api.get.liteServers();
    return response;
}

export const getBasicOnChainStats = async() => {
    const { response } = await api.get.basicOnChainStats();
    return response;
}

export default api;