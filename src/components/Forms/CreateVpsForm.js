import * as React from 'react';
import { NameAndRegion } from './CreateVps/NameAndRegion';

import MultiStep from './MultiStep';

const steps = [
  { component: <NameAndRegion /> },
]

const CreateVpsForm = () => {
  const steps = [
    {title: 'Name and Region', component: <NameAndRegion/>},
    ];
  
  return (
  <NameAndRegion activeStep={1} showNavigation={true} steps={steps}/>

  )
};

export default CreateVpsForm