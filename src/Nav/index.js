import React, {Component} from 'react'
import { Menu } from 'semantic-ui-react'
import LoginUserForm from '../User/LoginUserForm'
import NewUserForm from '../User/NewUserForm'
import NewTripForm from '../Trip/NewTripForm'
import TitlePage from '../TitlePage'

export default class Nav extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: this.props.username,
      displayTitleScreen: true,
      displayLoginUserForm: false,
      displayRegisterUserForm: false,
      displayCreateTripForm: false
    }
  }


  toggleTitleScreen = () => {
    this.setState({
      displayTitleScreen: !this.state.displayTitleScreen
    })
  }


  toggleLoginUserForm = () => {
    this.setState({
      displayLoginUserForm: !this.state.displayLoginUserForm
    })
  }


  toggleRegisterUserForm = () => {
    this.setState({
      displayRegisterUserForm: !this.state.displayRegisterUserForm
    })
  }


  toggleCreateTripForm = () => {
    this.setState({
      displayCreateTripForm: !this.state.displayCreateTripForm
    })
  }


  render() {
    return (
      <Menu pointing secondary>
        {
          this.props.loggedIn
            ?
            <React.Fragment>
              <Menu.Item
                icon='box'
                name='All Trips'
                onClick={ this.props.seeAllTrips }
              />
              <Menu.Item
                icon='map'
                name='My Trips'
                onClick={ this.props.seeAllMyTrips}
              />
              <Menu.Item
                icon='edit'
                name='New Trip'
                onClick={this.toggleCreateTripForm}
              />
              <Menu.Item
                icon='user'
                name={this.props.currentUserName}
                position='right'
              />
              <Menu.Item
                icon='sign-out'
                name='Log Out'
                position='right'
                onClick={this.props.logoutUser}
              />
            </React.Fragment>
            :
            <React.Fragment>
              <Menu.Item
                icon='box'
                name='All Trips'
                onClick={ this.props.seeAllTrips }
              />
              <Menu.Item
                icon='sign-in'
                name='Log In'
                position='right'
                onClick={ this.toggleLoginUserForm }
              />
              <Menu.Item
                icon='compass'
                name='Register'
                onClick={ this.toggleRegisterUserForm }
              />
            </React.Fragment>
        }
        {
          this.state.displayLoginUserForm
          && <LoginUserForm
            loginUser={ this.props.loginUser }
            toggleLoginUserForm={ this.toggleLoginUserForm }
            displayLoginUserForm={ this.state.displayLoginUserForm }
          />
        }
        {
          this.state.displayRegisterUserForm
          && <NewUserForm
            createUser={ this.props.createUser }
            toggleRegisterUserForm={ this.toggleRegisterUserForm }
            displayRegisterUserForm={ this.state.displayRegisterUserForm }
          />
        }
        {
          this.state.displayCreateTripForm
          && <NewTripForm
            createTrip={ this.props.createTrip }
            toggleCreateTripForm={ this.toggleCreateTripForm }
            displayCreateTripForm={ this.state.displayCreateTripForm }
          />
        }
        {
          this.state.displayTitleScreen
          && <TitlePage
            titlePage={ this.props.showTitlePage }
            toggleTitleScreen={ this.toggleTitleScreen }
            displayTitleScreen={ this.state.displayTitleScreen }
          />
        }
      </Menu>
    )
  }
}
