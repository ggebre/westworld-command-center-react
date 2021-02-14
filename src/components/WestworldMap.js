import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'

const WestworldMap = (props) => {
  // console.log(props.areas)
  return (
    <Segment id="map" >
      {props.areas.map((area, index) => <Area handleHostSelection={props.handleHostSelection} area={area} key={index} hosts={props.hosts.filter(host => host.area === area.name)}/>)}
    </Segment>
  )
}

export default WestworldMap
