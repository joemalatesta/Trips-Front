import React, { Component } from 'react'
import TripCard from '../TripCard'

export default class TripCardList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="CardContainer">
                {
                    this.props.trips.map(trip =>
                        <TripCard name={trip.trip_name} date={trip.trip_date} description={trip.about_trip} />)
                }
            </div>
        )
    }
}
