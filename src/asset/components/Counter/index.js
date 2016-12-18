import React, {Component, PropTypes} from 'react'
import {combineReducers, connect} from 'react-redux'

import * as ARList from './action-reducer'

const componentKey = 'Counter'

class Counter extends Component {
    static propTypes = {
        // count: PropTypes.number.isRequired,
        onIncreaseClick: PropTypes.func.isRequired
    }

    render() {
        console.log('Counter render:', this.props)
        const {state, onDecreaseClick, onIncreaseClick, getUserInfo} = this.props
        return (
            <div>
                <span>{state.count}</span>
                <span>{state.userInfo.name}</span>
                <button onClick={onIncreaseClick}>Increase</button>
                <button onClick={onDecreaseClick}>Decrease</button>
                <button onClick={getUserInfo}>getUserInfo</button>
            </div>
        )
    }
}

// 方法一
module.exports = (injectReducer) => {
    injectReducer(componentKey, ARList.reducerList)
    return connect((state) => state[componentKey], ARList.actionList)(Counter)
}

// 方法二
// 使用connect方法生成容器组件, return function
// export let Counter = connect(mapStateToProps, mapDispatchToProps)(Counter)
// export default CounterContainer


