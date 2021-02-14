import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = (props) => {

  return(
    <Card
      className="host selected"
      // {/* NOTE: The className "host selected" renders a different style than simply "host". */}
      onClick={ () => props.handleHostSelection(props.host)}
      image={props.host.imageUrl}
      raised
    />
  )
}

export default Host
