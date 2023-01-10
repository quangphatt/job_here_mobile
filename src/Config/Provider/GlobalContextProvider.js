import React, { Component, createContext } from 'react';

const GlobalContext = createContext({});

export class GlobalContextProvider extends Component {
  static componentInstance;

  constructor(props) {
    super(props);
    this.state = {
      isSignIn: false,
    };

    GlobalContextProvider.componentInstance = this;
  }

  updateState = (stateName, data) => {
    switch (stateName) {
      case 'isSignIn':
        this.setState({
          ...this.state,
          isSignIn: data,
        });
        break;
      default:
        break;
    }
  };

  resetState = stateName => {
    switch (stateName) {
      case 'isSignIn':
        this.setState({
          ...this.state,
          isSignIn: false,
        });
        break;
      default:
        this.setState({
          isSignIn: false,
        });
        break;
    }
  };

  render() {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          updateState: this.updateState,
          resetState: this.resetState,
        }}>
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

export default GlobalContextProvider;

export const withGlobalContext = ChildComponent =>
  React.forwardRef((props, ref) => (
    <GlobalContext.Consumer>
      {context => <ChildComponent {...props} global={context} ref={ref} />}
    </GlobalContext.Consumer>
  ));
