import React, { Component } from 'react'
import { ThemeContext } from 'contexts/Context';

export default class ThemeChoiceProvider extends Component {
    state = {
        isDark: false
    }

    changeTheme = () => { this.setState({ isDark: !isDark }) }

    render() {
        return (
            <ThemeContext.Provider
                value={{
                    state: this.state,
                    changeTheme: this.changeTheme
                }}
            />
        )
    }
}

