import React, { Component } from 'react'
import { ThemeChoiceContext } from 'contexts/Context';

export default class ThemeChoiceProvider extends Component {
    state = {
        isDark: false
    }

    changeTheme = () => { this.setState({ isDark: !this.state.isDark }) }

    render() {
        return (
            <ThemeChoiceContext.Provider
                value={{
                    state: this.state,
                    changeTheme: this.changeTheme
                }}
            >
                {this.props.children}
            </ThemeChoiceContext.Provider>
        )
    }
}

