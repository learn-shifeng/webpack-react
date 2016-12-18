import React, {Component} from 'react'
import {combineReducers, connect} from 'react-redux'
// import {Link} from 'react-router'

import * as ARList from './action-reducer.js'
import NavLink from 'common/NavLink'
import './personalCenter.less'

const componentKey = 'personalCenter'

class PersonalCenter extends Component {
    render() {
        return (
            <section className='personalCenter'>
                <ul className='sidebar'>
                    <li><NavLink to="/personalCenter/mainPage">个人中心主页</NavLink></li>
                    <li><NavLink to="/personalCenter/myForHer">我的寻ta</NavLink></li>
                    <li><NavLink to="/personalCenter/myTransaction">我的二手</NavLink></li>
                </ul>
                {this.props.children}
            </section>
        )
    }
}

module.exports = (injectReducer) => {
    injectReducer(componentKey, ARList.reducerList)
    return connect((state) => state[componentKey], ARList.actionList)(PersonalCenter)
}