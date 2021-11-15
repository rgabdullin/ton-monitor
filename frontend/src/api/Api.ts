import api from './ApiTools';

export const getTPS = async() => {
    const { response } = await api.get.TPS();
    return response;
}

export const getUptime = async() => {
    const { response } = await api.get.uptime();
    return response;
}

export const getGovernance = async() => {
    const { response } = await api.get.governance();
    return response;
}

export const getLiteservers = async() => {
    const { response } = await api.get.liteservers();
    return response;
}

export const getBasicOnChainStats = async() => {
    const { response } = await api.get.basicOnChainStats();
    return response;
}

export default api;