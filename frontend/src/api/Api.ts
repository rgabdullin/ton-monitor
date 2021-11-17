import api from './ApiTools';

export const getBlockRate = async() => {
    const { response } = await api.get.blockRate();
    return response;
}

export const getTps = async() => {
    const { response } = await api.get.tps();
    return response;
}

export const getLastBlock = async() => {
    const { response } = await api.get.lastBlock();
    return response;
}

export const getValidators = async() => {
    const { response } = await api.get.validatorStatus();
    return response;
}

export const getLocalValidatorStatus = async() => {
    const { response } = await api.get.localValidatorStatus();
    return response;
}

export const getTonApisStats = async() => {
    const { response } = await api.get.tonApisStats();
    return response;
}

export const getTonBridgeStats = async() => {
    const { response } = await api.get.tonBridgeStats();
    return response;
}

export const getTransactionStats = async() => {
    const { response } = await api.get.transactionStats();
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

export const getValidatorCounts = async() => {
    const { response } = await api.get.validatorCounts();
    return response;
}

export default api;