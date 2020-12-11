import React, { Component } from 'react'
import CommentCard from '../CommentCard'

export default class CommentContainer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="CommentContainer">
                {
                    this.props.comments.map(trip =>
                        <Comments name={this.props.comments.comments}  />)
                }
            </div>
        )
    }
}
