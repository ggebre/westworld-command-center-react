import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage'
import LogPanel from './LogPanel'
import HostInfo from './HostInfo'

class Headquarters extends Component {
  // Remember, there's many ways to do this. This doesn't have to be a class component. It's up to you.
  // state = {
  //   toggle: false
  // }
  anyHostsDeactivated = () => this.props.hosts.length > 0 

  render(){
    
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>
          <ColdStorage handleHostSelection={this.props.handleHostSelection} hosts={this.props.hosts}/>
        {/* Something goes here.... */}

        </Grid.Column>
        <Grid.Column width={5}>
          {this.props.host 
                ?
                <HostInfo handleHostActivityChange={this.props.handleHostActivityChange} handleAreaChange={this.props.handleAreaChange} host={this.props.host}/>
                
                :
                <Details />
          }
        </Grid.Column>
        <Grid.Column width={3}>
            <LogPanel 
              messages = {this.props.messages}
              anyDeactivatedHost={this.props.anyDeactivatedHost}
              handleActivationDeactivationAll={this.props.handleActivationDeactivationAll}/>
        {/* and here. Take visual cues from the screenshot/video in the Readme. */}

        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
