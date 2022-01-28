import React from 'react'
import moment from 'moment';

const RegionEntry = ({ fullName, shortName, proxHost, proxPort, proxUser, createdAt }) => {
    return (
        <tr>
            <td>{fullName}</td>
            <td>{shortName}</td>
            <td>{proxHost}</td>
            <td>{proxPort}</td>
            <td>{proxUser}</td>
            <td>
            {
            moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')
            }
            </td>
        </tr>
    )
}

export default RegionEntry
