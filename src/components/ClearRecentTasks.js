import React, { useState, useEffect } from "react";
import { connectAdvanced } from "react-redux";

import UserService from "../services/user.service";


const ClearRecentTasks = () => {
    const [content, setContent] = useState([]);
    useEffect(() => {
        UserService.listRecentTasks().then(
          (response) => {
            setContent(response.data);
          },
          (error) => {
            const _content =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
    
            setContent(_content);
          }
        );
      }, []);
    return (
        content
    )
}

export default ClearRecentTasks
