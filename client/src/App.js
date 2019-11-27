import React from 'react';
import { ThemeChoiceContext } from 'contexts/Context';
const App = () => {
  console.log("asdf")
  return (
    <React.Fragment>
      <ThemeChoiceContext.Consumer>
        {(context) => (
          <p>current context {context.state.isDark ? "is dark" : "not dark"}</p>
        )}
      </ThemeChoiceContext.Consumer>
    </React.Fragment>

  );
}

export default App;
