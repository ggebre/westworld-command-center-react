import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'


class HostInfo extends Component {
  
  state = {
    options: [
      // {key: "some_area", text: "Some Area", value: "some_area"},
      
    ],
    value: this.props.host.area,
    
    // active: this.props.host.active,
    host: this.props.host
    
    // This state is just to show how the dropdown component works.
    // Options have to be formatted in this way (array of objects with keys of: key, text, value)
    // Value has to match the value in the object to render the right text.

    // IMPORTANT: But whether it should be stateful or not is entirely up to you. Change this component however you like.
  }

  componentDidMount() {
    this.fetchAllAreas()
  }

  fetchAllAreas = () => {
    fetch(" http://localhost:4000/areas")
    .then(resp => resp.json())
    .then(areas => {
      areas.forEach(area => this.setState(pS => ({
        options: [...pS.options, {key: area.name, text: this.titleCaseText(area.name), value: area.name}]
      })))
    })
  }

  titleCaseText = (text) => text.split("_").map(word => word[0].toUpperCase()+ word.slice(1)).join(" ")
  formatText = (text) => text.toLowerCase().replace(" ", "_")

  handleChange = (e, {value}) => {
    
    const id = this.props.host.id 
    const area = this.formatText(value)
    this.props.handleAreaChange(id, area)

    this.setState({value})
    // change props.host.area = this.formatText(value) 
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
  }
  componentDidUpdate(previousProps, previousState) {
    if (previousProps.host.id !== this.props.host.id ) {
        this.setState({host: this.props.host})
    }
    
}

  // return the props.host back to the higher parent so that it can be updated
  toggle = () => {
    
    this.setState(pS => ({
      host: {...pS.host, active: !pS.host.active}
    }), () => this.props.handleHostActivityChange(this.state.host.id, this.state.host.active))
    
  }

  render(){
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={ this.props.host.imageUrl }
            floated='left'
            size='small'
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                {this.state.host.firstName} | { this.state.host.gender === "Male" ? <Icon name='man' /> : <Icon name='woman' />}
                { /* Think about how the above should work to conditionally render the right First Name and the right gender Icon */ }
              </Card.Header>
              <Card.Meta>
                <Radio 
                  
                  onChange={this.toggle}
                  label={this.state.host.active ? "Active" : "Decommissioned"}
                  // {/* Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */}
                  checked={this.state.host.active}
                  // {/* Checked takes a boolean and determines what position the switch is in. Should it always be true? */}
                  slider
                />
              </Card.Meta>

              <Divider />
              Current Area:
              <Dropdown
                onChange={this.handleChange}
                value={this.state.host.area}
                options={this.state.options}
                selection
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }
}

export default HostInfo
