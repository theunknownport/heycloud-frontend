import React, { useState, useEffect } from 'react'
import vpsService from '../../../services/vps.service'
import { RadioGroup, RadioButton } from '@progress/kendo-react-inputs';
export const NameAndRegion = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vpsName, setVpsName] = useState([]);
  const [reload, setReload] = useState(false);

  var i
  var a

  useEffect(() => {
    setLoading(true);
    vpsService.listRegionsUser().then(
      (response) => {
        setRegions(response.data)
        setLoading(false);
        setReload(false)

      },
      (error) => {
        const _content =
          (error.response &&
            error.response &&
            error.response.message) ||
          error.message ||
          error.toString();

        setRegions(_content);
      }
    );
  }, [reload]);
  return (
    <div>
      <div className='row'>
        <div className='six columns'>
          <label>VPS Name</label>
          <input
            className='u-full-width'
            placeholder='My super VPS'
            type='text'
            onChange={e => setVpsName(e.target.value)}
            value={vpsName}
            autoFocus
          />
        </div>
      </div>
      <div className='row'>
        <div className='six columns'>
        <RadioGroup
          size={24}
          thickness={2}
          color="#9575b2"
          highlightColor="#ccc8b9"
          selectedIndex={1}
          onSelect={regions => this._onSelect(regions, i++)}
          >
          {(() => {
            regions.map((region) => {
              return (
                <RadioButton value={region.shortName}>
                  {region.fullName}
                </RadioButton>)
              })
          })}
          <RadioButton value={regions[0]}>
                  {regions[0]}
          </RadioButton>
        </RadioGroup>
        </div>
      </div>
    </div>
  )
}

export default NameAndRegion