import React, {Component} from 'react'
import {IndexLink} from 'react-router'

import NavLink from 'common/NavLink'
import './header.less'

class Header extends Component {
    render() {
        return (
            <header>
                <section>我是页眉</section>
                <nav>
                    <ul>
                        <li><NavLink to="/home">首页</NavLink></li>
                        <li><NavLink to="/forHer">寻ta</NavLink></li>
                        <li><NavLink to="/personalCenter">个人中心</NavLink></li>
                        <li><NavLink to="/counter">counter</NavLink></li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header