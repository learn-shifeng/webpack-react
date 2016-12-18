import React from 'react'
import ReactDOM from 'react-dom'

import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider, connect} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import {Router, hashHistory} from 'react-router'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'


// Add the reducer to your store on the `routing` key
const store = createStore(
	combineReducers({routing: routerReducer}),
	applyMiddleware(thunkMiddleware) // 中间件, 允许我们使用dispatch
)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store)

// 自定义属性, replaceReducers时用
store.asyncReducers = {}
store.rootReducer = {routing: routerReducer}

var routes = require('./routes.js').default // 等价于import routes from './routes.js'

ReactDOM.render(
	<Provider store={store}>
		<Router history={history} routes={routes(store)}/>
	</Provider>,
    document.getElementById('root')
)

// store = {
// 	rootReducer: {
// 		routing: routerReducer
// 	},
// 	asyncReducers: {
// 		layout: {},
// 		home: {},
// 		Welfare: {},
// 		forHer: {}
// 	}
// }
