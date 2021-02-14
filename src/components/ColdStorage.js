import React from 'react';
import { Segment } from 'semantic-ui-react'
import Host from './Host';
import HostList from './HostList'


const ColdStorage = (props) => (

  <Segment.Group className="HQComps">
    <Segment compact>
      <h3 className="labels">ColdStorage</h3>
    </Segment>
    <Segment compact>

      {/* Cold Storage contains hosts....but how? Directly? Or is there something else we could use to contain them... */}
        <HostList handleHostSelection={props.handleHostSelection} hosts={props.hosts} />
        {/* {props.hosts.map((host,index) => <Host key={index} host={host} />)} */}
    </Segment>
  </Segment.Group>
)

export default ColdStorage
