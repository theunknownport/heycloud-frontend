import {
    ADD_NODE_FAIL,
    ADD_NODE_SUCCESS,
    ADD_REGION_FAIL,
    ADD_REGION_SUCCESS,
    SET_MESSAGE
} from "./types";

import adminService from "../services/admin.service";

export const addRegion = (fullName, shortName, proxHost, proxPort, password, proxUser) => (dispatch) => {
  return adminService.addRegion(fullName, shortName, proxHost, proxPort, password, proxUser).then(
    (response) => {
      dispatch({
        type: ADD_REGION_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = "Adding region failed!"

      dispatch({
        type: ADD_REGION_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const addNode = (nodeName, nodeIP, nodeUser, nodePort, regionID) => (dispatch) => {
    return adminService.addNode(nodeName, nodeIP, nodeUser, nodePort, regionID).then(
      (response) => {
        dispatch({
          type: ADD_NODE_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message = "Adding node failed!"
  
        dispatch({
          type: ADD_NODE_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
