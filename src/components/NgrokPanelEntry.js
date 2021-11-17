import React from 'react'
import moment from 'moment';

const NgrokPanelEntry = ({ name, createdAt, assingedController }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{assingedController}</td>
            <td>
            {
            moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')
            }
            </td>
        </tr>
    )
}

export default NgrokPanelEntry
