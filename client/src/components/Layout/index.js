import React, { Component } from 'react'

import NavBar from 'components/NavBar';
import Body from 'components/Body';




export default class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <Body />
            </React.Fragment>
        )
    }
}


