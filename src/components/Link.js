import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate } from '../utils'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`

class Link extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)

    return (
      <div className="mv3 ">
        <a href={this.props.link.url} target="_blank">
          <div style={{wordBreak :  'break-all'}}>  
            <span className="b">{this.props.index + 1}. </span>  
            {this.props.link.description} ({this.props.link.url})
          </div>
        </a>
        <div className="f6 mv2 gray f13">
          {timeDifferenceForDate(this.props.link.createdAt)},
          {authToken && (
            <Mutation
              mutation={VOTE_MUTATION}
              variables={{ linkId: this.props.link.id }}
              update={(store, { data: { vote } }) =>
                this.props.updateStoreAfterVote(store, vote, this.props.link.id)
              }
            >
              {voteMutation => (
                <span className="" onClick={voteMutation}>
                  좋아요 {this.props.link.votes.length} 
                </span>
              )}
            </Mutation>
          )}
        </div>
      </div>
    )
  }
}

export default Link