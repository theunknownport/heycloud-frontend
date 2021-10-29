import React from 'react'
import moment from 'moment';

const RecentTaskEntry = ({ message, createdAt }) => {
    return (
        <tr>
            <td>{message}</td>
            <td>
            {
            moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')
            }
            </td>
        </tr>
    )
}

export default RecentTaskEntry
