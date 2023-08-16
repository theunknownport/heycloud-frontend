import React from 'react'
import moment from 'moment';

const VpsPanelEntry = ({ name, type, power, is_creating, createdAt, ram, cpu, storage, costHourly }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{type}</td>
            <td>
                {(() => {
                    if (power){
                        return (
                            <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" className="bi bi-circle-fill border rounded-circle border-secondary" style={{'color': 'rgb(143,242,82)','border-width': '0px','border-color': 'rgb(0,0,0)','transform': 'scale(0.85)','margin-top': '-5px;'}}>
                                <circle cx="8" cy="8" r="8"></circle>
                            </svg>
                            <span>&nbsp;Running</span>
                            </>
                        )      
                    } else if (!power) {
                        return (
                            <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" className="bi bi-circle-fill border rounded-circle border-secondary" style={{'color': 'var(--bs-danger)','border-width': '0px','border-color': 'rgb(0,0,0)','transform': 'scale(0.85)','margin-top': '-5px'}}>                                
                            <circle cx="8" cy="8" r="8"></circle>
                            </svg>
                            <span>&nbsp;Stopped</span>
                            </>
                        )
                    } else if (is_creating) {
                        return (
                            <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" className="bi bi-circle-fill border rounded-circle border-secondary" style={{'color': 'var(--bs-warning)','border-width': '0px','border-color': 'rgb(0,0,0)','transform': 'scale(0.85)','margin-top': '-5px'}}>                                
                            <circle cx="8" cy="8" r="8"></circle>
                            </svg>
                            <span>&nbsp;Creating</span>
                            </>
                        )
                    }
                })()}
            </td>
            <td>{ram}</td>
            <td>{cpu}</td>
            <td>{storage}</td>
            <td>{costHourly}</td>
            <td>
            {
            moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')
            }
            </td>
        </tr>
    )
}

export default VpsPanelEntry
