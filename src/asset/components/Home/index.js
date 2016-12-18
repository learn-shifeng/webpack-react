import React, {Component} from 'react'
import {connect} from 'react-redux'

import * as ARList from './action-reducer.js'
let componentKey = 'home'

class Home extends Component {
	render() {
		return <div>Home</div>
	}
}

module.exports = (injectReducer) => {
    injectReducer(componentKey, ARList.reducer)
    return connect((state) => state[componentKey], ARList.action)(Home)
}