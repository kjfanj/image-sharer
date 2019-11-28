import React, { Component } from 'react';
import { ThemeChoiceContext } from 'contexts/Context';
import Layout from 'components/Layout';
import { ThemeProvider } from 'styled-components';
import { dark, light } from 'style/palette';
class App extends Component {



  renderBackgroundColor = (isDark) => {
    if (isDark) {
      document.body.style = `background-color: ${dark.background};`;
    } else {
      document.body.style = `background-color: ${light.background};`;

    }
  }


  render() {
    return (
      <React.Fragment>
        <ThemeChoiceContext.Consumer>
          {(context) => (
            <ThemeProvider theme={context.state.isDark ? dark : light}>
              {this.renderBackgroundColor(context.state.isDark)}
              <Layout>

              </Layout>
            </ThemeProvider>
          )}
        </ThemeChoiceContext.Consumer>
      </React.Fragment>

    );
  }
}

export default App;
