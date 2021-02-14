import React from 'react'
import { Card } from 'semantic-ui-react'
import Host from './Host'

const HostList = (props) => {
  
  
  
  return(
    <Card.Group itemsPerRow={9}>
      {props.hosts.map((host, index) => <Host handleHostSelection={props.handleHostSelection} key={index} host={host} />)}
    </Card.Group>
  )
}

export default HostList
