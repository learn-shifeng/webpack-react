import React from 'react'
import {combineReducers} from 'redux'
import {Route, IndexRoute} from 'react-router'

// containers 
import Layout from './layout'
import Home from './components/Home'
import ForHer from './components/ForHer'
import Counter from './components/Counter'

import PersonalCenter from './components/PersonalCenter'
import MainPage from './components/PersonalCenter/components/mainPage'
import MyForHer from './components/PersonalCenter/components/myForHer'
import MyTransaction from './components/PersonalCenter/components/myTransaction'

const routes = (store) => {
	// 更换一批改变状态的reducers
	const injectReducer = (componentKey, reducers) => {
		store.asyncReducers[componentKey] = combineReducers(reducers)
		store.replaceReducer(combineReducers({...store.rootReducer, ...store.asyncReducers}))
	}

	// 推荐写法: getComponent[s] same as component[s], but asynchronous, useful for code-splitting
	return {
		path: '/',
		getComponent(location, cb) {
			cb(null, require('./layout')(injectReducer))
		},
		// getIndexRoute(partialNextState, cb) {
		// 	cb(null, {component: require('./components/Home')(injectReducer)})
		// },
		indexRoute: {
			// component: Home(injectReducer),
			onEnter: (nextState, replace) => replace('/home'),
			onLeave: (prevState) => {}
		},
		childRoutes: [{
			path: 'home',
			getComponent: (location, cb) => {
				require.ensure([], () => {
					cb(null, require('./components/Home')(injectReducer))
				})
			},
			onEnter: (nextState, replace) => {},
			onLeave: (prevState) => {}
		}, {
			path: 'forHer',
			getComponent: (location, cb) => {
				require.ensure([], () => {
					cb(null, require('./components/ForHer')(injectReducer))
				})
			}
		}, {
			path: 'counter',
			getComponent: (location, cb) => {
			    require.ensure([], () => {
			    	cb(null, require('./components/Counter')(injectReducer))
			    })
			}
		}, {
			path: 'personalCenter',
			getComponent: (location, cb) => {
			    require.ensure([], () => {
			    	cb(null, require('./components/PersonalCenter')(injectReducer))
			    })
			},
			indexRoute: {
				// component: MainPage,
				onEnter: (nextState, replace) => replace('/personalCenter/mainPage')
			},
			childRoutes: [{
				path: '/personalCenter/mainPage',
				getComponent: (location, cb) => {
					require.ensure([], () => {
						cb(null, require('./components/PersonalCenter/components/mainPage').default)
					})
				}
			},{
				path: '/personalCenter/myForHer',
				getComponent: (location, cb) => {
					require.ensure([], () => {
						cb(null, require('./components/PersonalCenter/components/myForHer').default)
					})
				}
			}, {
				path: '/personalCenter/myTransaction',
				getComponent: (location, cb) => {
					require.ensure([], () => {
						cb(null, require('./components/PersonalCenter/components/myTransaction').default)
					})
				}
			}]
		}]
	}

	// PlainRoute, a plain javascript object route definition
	// return {
	// 	path: '/',
	// 	component: Layout(injectReducer),
	// 	indexRoute: {
	// 		// component: Home(injectReducer),
	// 		onEnter: (nextState, replace) => replace('/home')
	// 	},
	// 	childRoutes: [{
	// 		path: 'home',
	// 		component: Home(injectReducer)
	// 	}, {
	// 		path: 'forHer',
	// 		component: ForHer(injectReducer)
	// 	}, {
	// 		path: 'counter',
	// 		component: Counter(injectReducer)
	// 	}, {
	// 		path: 'personalCenter',
	// 		component: PersonalCenter(injectReducer),
	// 		indexRoute: {
	// 			// component: MainPage,
	// 			onEnter: (nextState, replace) => replace('/personalCenter/mainPage')
	// 		},
	// 		childRoutes: [{
	// 			path: '/personalCenter/mainPage',
	// 			component: MainPage
	// 		}, {
	// 			path: '/personalCenter/myForHer',
	// 			component: MyForHer
	// 		}, {
	// 			path: '/personalCenter/myTransaction',
	// 			component: MyTransaction
	// 		}]
	// 	}]
	// }
	
	// JSX格式的, 已不推荐
	// return (
	// 	<Route path='/' component={Layout(injectReducer)}>
	// 		<IndexRoute onEnter={(nextState, replace) => replace('/home')}/>
	// 		<Route path='/home' component={Home(injectReducer)}/>
	// 		<Route path='/forHer' component={ForHer(injectReducer)}/>
	// 		<Route path='/counter' component={Counter(injectReducer)}/>
	// 		<Route path='/personalCenter' component={PersonalCenter(injectReducer)}>
	// 			<IndexRoute onEnter={(nextState, replace) => replace('/personalCenter/mainPage')}/>
	// 			<Route path='/personalCenter/mainPage' component={MainPage}/>
	// 			<Route path='/personalCenter/myForHer' component={MyForHer}/>
	// 			<Route path='/personalCenter/myTransaction' component={MyTransaction}/>
	// 		</Route>
	// 	</Route>
	// )
}

export default routes