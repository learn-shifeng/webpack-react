import React, {Component} from 'react'
import {connect} from 'react-redux'

import 'normalize.css'

import Header from './components/header'
import Footer from './components/footer'
import * as ARList from './action-reducer.js'
import 'global/style/global.less'
let componentKey = 'layout'

class Layout extends Component {
    render() {
        // console.log('layout/index.js render', this.props)
        return (
            <div id='layout'>
                <Header/>
                <div id='main'>
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        )
    }
}

module.exports = function(injectReducer) {
    injectReducer(componentKey, ARList.reducerList)
    return connect((state) => state[componentKey], ARList.actionList)(Layout)
}