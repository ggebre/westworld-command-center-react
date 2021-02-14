import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import { Log } from './services/Log'
import Headquarters from './components/Headquarters'
import WestworldMap from './components/WestworldMap'

class App extends Component {
    state = {
      hosts: [],
      areas: [],
      host: null,
      messages: []
    }

  // As you go through the components given you'll see a lot of functional components.
  // But feel free to change them to whatever you want.
  // It's up to you whether they should be stateful or not.
  handleAreaChange = (id, area) => {
    // Notify: {first name of host} set in area {formatted area name}
    const hosts = [...this.state.hosts]
    const foundHost = hosts.find(host => host.id === parseInt(id))
    if (this.countHostsInArea(area)) {
      
      foundHost.area = area 
      const message = Log.notify(`${foundHost.firstName} set in area ${area}`)

      this.setState({hosts})
      this.setState(pS => ({
        messages: [...pS.messages, message]
      }))
    }else {
      const message = Log.error(`Too many hosts. Cannot add ${foundHost.firstName} to ${area}`)
      this.setState(pS => ({
        messages: [...pS.messages, message]
      }))
      
    }
  }
  handleHostActivityChange = (id, active) => {
//     ##### 2) Activating a host:
// `Warn: Activated {first name of host}`

    
    const hosts = [...this.state.hosts]
    const foundHost = hosts.find(host => host.id === parseInt(id))
    foundHost.active = active
    const message = Log.warn(`Activated ${foundHost.firstName}`)
    this.setState({hosts})
    this.setState(pS => ({
      messages: [...pS.messages, message]
    }))
  }
  componentDidMount () {
    this.fetchAllAreas()
    this.fetchAllHosts()
  } 

  handleHostSelection = (host=null) => {
    this.setState({host})
  }
  fetchAllHosts = () => {
    fetch(" http://localhost:4000/hosts")
      .then(resp => resp.json())
      .then(hosts => this.setState({hosts}))
  }
  fetchAllAreas = () => {
    fetch(" http://localhost:4000/areas")
    .then(resp => resp.json())
    .then(areas => this.setState({areas}))
  }

  countHostsInArea = (areaName) => {
    const area = this.state.areas.find(area => area.name === areaName)
    return this.state.hosts.filter(host => host.area === areaName).length < area.limit
  }

  handleActivationDeactivationAll = () => {
    // activate or deactivate all 
    const bool = this.anyDeactivatedHost()
    const message = bool ?  Log.warn("Activating all hosts!") :  Log.notify("Decommissiong all hosts.")
    const hosts = this.updateAllHosts(bool)
    this.setState({hosts})
    this.setState(pS => ({
      messages: [...pS.messages, message]
    }))
  }

  updateAllHosts = (bool) => {
    const hosts = [...this.state.hosts]
    hosts.forEach(host => host.active = bool ) 
    console.log(hosts)
    return hosts 
  }
  decommissinedHosts = () => this.state.hosts.filter(host => !host.active)

  anyDeactivatedHost = () => this.decommissinedHosts().length > 0
  
  render(){
    
    return (
      <Segment id='app'>
        <WestworldMap 
            handleHostSelection={this.handleHostSelection} 
            host={this.state.host} areas={this.state.areas} 
            hosts ={this.state.hosts.filter(host => host.active)}/>
        <Headquarters 
          messages ={this.state.messages}
          handleHostActivityChange={this.handleHostActivityChange} 
          handleAreaChange={this.handleAreaChange} 
          handleHostSelection={this.handleHostSelection} 
          host={this.state.host} 
          hosts ={this.state.hosts.filter(host => !host.active)}
          handleActivationDeactivationAll={this.handleActivationDeactivationAll}
          anyDeactivatedHost={this.anyDeactivatedHost()}/>
        {/* What components should go here? Check out Checkpoint 1 of the Readme if you're confused */}
      </Segment>
    )
  }
}

export default App;
