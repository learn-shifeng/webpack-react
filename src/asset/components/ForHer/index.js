import React, {Component} from 'react'
import {connect} from 'react-redux'

import * as ARList from './action-reducer.js'
let componentKey = 'foher'

class ForHer extends Component {
	render() {
		return <div>ForHer</div>
	}
}

module.exports = (injectReducer) => {
    injectReducer(componentKey, ARList.reducer)
    return connect((state) => state[componentKey], ARList.action)(ForHer)
}