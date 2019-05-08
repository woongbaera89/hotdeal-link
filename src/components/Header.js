import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div className="ph3 pv1">
        <div className="flex justify-between items-center nowrap ">
          <Link to="/" className="no-underline black">
            <h1>핫딜링크</h1>
          </Link>
        </div>
        <div className="flex flex-fixed black">
          <Link to="/" className="mr3 no-underline black">
            신규핫딜
          </Link>
          <Link to="/top" className="mr3 no-underline black">
            인기핫딜
          </Link>
          <Link to="/search" className="mr3 no-underline black">
            검색
          </Link>
          {authToken && (
            <div className="flex">
              <Link to="/create" className="mr3 no-underline black">
                등록
              </Link>
            </div>
          )}
          {authToken ? (
            <div
              className="ml1 pointer black"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN)
                this.props.history.push(`/`)
              }}
            >
              로그아웃
            </div>
          ) : (
            <Link to="/login" className="mr3 no-underline black">
              <h3 className="black-60">로그인</h3>
            </Link>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Header)