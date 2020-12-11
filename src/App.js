import './App.css'
import React, { Component } from 'react'
import Nav from './Nav'
import Body from './Body'


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      trips: [],
      loggedIn: false,
      showTrip: false,
      currentUserId: '',
      tripIdToEdit: -1,
    }
  }


  getTrips = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/api/trips/all"
      const tripsResponse = await fetch(url)
      const tripsJson = await tripsResponse.json()
      this.setState({
        trips: tripsJson.data
      })
      } catch(err) {
      console.log("ERROR RETRIEVING Trip DATA.", err)
    }
  }


  getTrip = async (idOfTrip) => {
    try {
      const url = process.env.REACT_APP_API_URL + "/api/trips/" + idOfTrip
      console.log(url)
      const tripResponse = await fetch(url)
      const tripJson = await tripResponse.json()
      this.setState({
        trip: tripJson.data,
        showTrip: !this.state.showTrip
      })
      console.log(this.state.trips)
    } catch(err) {
      console.log("ERROR RETRIEVING TRIP DATA.", err)
    }
  }


  getMyTrips = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/api/trips/"
      const tripsResponse = await fetch(url, { credentials: 'include' })
      const tripsJson = await tripsResponse.json()
      this.setState({
        trips: tripsJson.data,
        showTrips: !this.state.showTrips
      })
    } catch(err) {
      console.log("Error getting trip data.", err)
    }
  }


  createTrip = async (tripToCreate) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/api/trips/'
      const createTripResponse = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(tripToCreate),
        headers: {
          'Content-Type': 'application/json'
        },
         credentials: 'include'
      })
      const createTripJson = await createTripResponse.json()
      if (createTripResponse.status === 200 || createTripResponse.status === 201) {
        console.log('Trip CREATED')
        this.setState({
          trips: [...this.state.trips, createTripJson.data]
        })
      }
      this.seeAllTrips()
    } catch(err) {
      console.log('ERROR CREATING Trip', err)
    }
  }


  removeTrip = (tripId) => {
    console.log(this.state.trips)
    console.log(tripId)
    this.setState({
        trips: this.state.trips.filter(trip => tripId !== trip.id),
        showTrip: false

    })
  }


  createUser = async (userToAdd) => {
    console.log(userToAdd)
    try {
      const url = process.env.REACT_APP_API_URL + '/api/users/register'
      const createUserResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userToAdd)
      })

      const createUserJson = await createUserResponse.json()
      if (createUserResponse.status === 200 || createUserResponse.status === 201) {
        console.log('CREATED USER', createUserJson.data)
      }
    } catch(err) {
      console.log('ERROR CREATING USER', err)
    }
    alert('Please sign in to confirm your username and Password')
  }


  loginUser = async (userToLogin) => {
    console.log(userToLogin)
    try {
      const url = process.env.REACT_APP_API_URL + '/api/users/login'
      const loginUserResponse = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(userToLogin),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const loginUserJson = await loginUserResponse.json()
      if (loginUserResponse.status === 200 || loginUserResponse.status === 201) {
        console.log('USER LOGGED IN')
        this.setState({
          loggedIn: !this.state.loggedIn,
          currentUserId: loginUserJson.data.id,
          currentUserName: loginUserJson.data.username
        })
      }
    } catch(err) {
      console.log('ERROR LOGGING IN', err)
    }
  }


  logoutUser = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/api/users/logout"
      const logoutResponse = await fetch(url, {
        credentials: 'include'
      })
      const logoutJson = await logoutResponse.json()
      if(logoutResponse.status === 200) {
        this.setState({
          loggedIn: !this.state.loggedIn,
          currentUserId:'',
          currentUserName:'',
        })
      }
    } catch(err) {
      console.error("ERROR LOGGING OUT", err)
    }
    this.seeAllTrips()
  }


  seeAllTrips = () => {
    this.setState({
      showTrip: false
    })
    this.getTrips()
  }


  seeAllMyTrips = () => {
    this.setState({
      showTrip: false
    })
    this.getMyTrips()
  }


  componentDidMount() {
    this.getTrips()
  }


  render() {
    return (
      <div className='App'>
        <Nav
          trip_name={ this.state.trip_name }
          trip_date={ this.state.trip_date }
          user_posts={ this.state.user_posts }
          trip_pics={ this.state.trip_pics }
          trips={ this.state.trips }
          trip={ this.state.trip }
          currentUserName={ this.state.currentUserName }
          showTrip={ this.state.showTrip }
          loggedIn={ this.state.loggedIn }
          getTrips={ this.getTrips}
          getTrip={this.getTrip}
          getMyTrips={ this.getMyTrips }
          createTrip={ this.createTrip }
          createUser={ this.createUser }
          loginUser={ this.loginUser }
          logoutUser={ this.logoutUser }
          seeAllTrips={ this.seeAllTrips }
          seeAllMyTrips={ this.seeAllMyTrips }
          updateTrip={ this.updateTrip }
        />
        <Body
          trip_name={ this.state.trip_name }
          trip_date={ this.state.trip_date }
          user_posts={ this.state.user_posts }
          trip_pics={ this.state.trip_pics }
          trips={ this.state.trips }
          trip={ this.state.trip }
          showTrip={ this.state.showTrip }
          loggedIn={ this.state.loggedIn }
          currentUserId={ this.state.currentUserId }
          getTrips={ this.getTrips }
          getTrip={ this.getTrip }
          deleteTrip={ this.deleteTrip }
          removeTrip={ this.removeTrip }
          updateTrip={ this.updateTrip }
          tripIdToEdit={ this.tripIdToEdit }
          seeAllTrips={ this.seeAllTrips }
          getMyTrips={ this.getMyTrips }
          createTrip={ this.createTrip }
        />
      </div>
    )
  }
}
