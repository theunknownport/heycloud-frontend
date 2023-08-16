import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/admin";

const listRegions = () => {
  return axios.get(API_URL + "/regions", { headers: authHeader() });
};

const listRegionNodes = (regionID) => {
    return axios.get(API_URL + "/regions/nodes/" + regionID, { headers: authHeader() });
};

const addRegion = (fullName, shortName, proxHost, proxPort, password, proxUser) => {
    return axios.post(API_URL + "/regions", {
        full_name: fullName,
        short_name: shortName,
        prox_host: proxHost,
        prox_port: proxPort,
        password,
        prox_user: proxUser
    },
    {
    headers: authHeader()
    })
    .then((response) => {
  
      return JSON.stringify(response.data);
    });
};

const addNode = (nodeName, nodeIP, nodeUser, nodePort, regionID) => {
    return axios.post(API_URL + "/nodes", {
        node_name: nodeName,
        node_ip: nodeIP,
        node_user: nodeUser,
        node_port: nodePort,
        region_ID: regionID
    },
    {
    headers: authHeader()
    })
    .then((response) => {
  
      return JSON.stringify(response.data);
    });
};

const syncNode = (nodeID) => {
    return axios.post(API_URL + "/nodes/" + nodeID + "/sync", {  
    },
    {
    headers: authHeader()
    })
    .then((response) => {
  
      return JSON.stringify(response.data);
    });
};

export default {
  addRegion,
  listRegionNodes,
  listRegions,
  addNode,
  syncNode
};
