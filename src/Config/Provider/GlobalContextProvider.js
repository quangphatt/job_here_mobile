import React, { Component, createContext, forwardRef } from 'react';
import { Keyboard } from 'react-native';
import ModalAction from '@Components/Modal/ModalAction';

const GlobalContext = createContext({});

export class GlobalContextProvider extends Component {
  static componentInstance;

  constructor(props) {
    super(props);
    this.state = {
      isSignIn: true,
      listModal: []
    };

    GlobalContextProvider.componentInstance = this;
  }

  updateState = (stateName, data) => {
    switch (stateName) {
      case 'isSignIn':
        this.setState({
          ...this.state,
          isSignIn: data
        });
        break;
      default:
        break;
    }
  };

  static _showModal = params => {
    GlobalContextProvider.componentInstance.showModal(params);
  };

  static _hideModal = params => {
    GlobalContextProvider.componentInstance.hideModal(params);
  };

  static _hideAllModal = params => {
    GlobalContextProvider.componentInstance.hideAllModal(params);
  };

  showModal = params => {
    Keyboard.dismiss();
    GlobalContextProvider.componentInstance = this;
    let index = this.state.listModal.length;
    this.state.listModal.push(
      <ModalAction
        key={`modalAction_${index}`}
        ref={ref => (this[`modalActionRef_${index}`] = ref)}
      />
    );
    this.setState({ listModal: this.state.listModal }, () => {
      requestAnimationFrame(() => {
        this[`modalActionRef_${index}`].showModal(params);
      });
    });
  };

  hideModal = params => {
    GlobalContextProvider.componentInstance = this;
    let index = this.state.listModal.length - 1;
    if (index >= 0) {
      this[`modalActionRef_${index}`].hideModal(params);
      requestAnimationFrame(() => {
        this.state.listModal.pop();
        this.setState({ listModal: this.state.listModal });
      });
    }
  };

  hideAllModal = params => {
    GlobalContextProvider.componentInstance = this;
    let last_index = this.state.listModal.length - 1;
    for (let i = last_index; i >= 0; i--) {
      this[`modalActionRef_${i}`].hideModal(params);
    }
    requestAnimationFrame(() => {
      this.setState({ listModal: [] });
    });
  };

  resetState = stateName => {
    switch (stateName) {
      case 'isSignIn':
        this.setState({
          ...this.state,
          isSignIn: false
        });
        break;
      default:
        this.setState({
          isSignIn: false
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
          resetState: this.resetState
        }}
      >
        {this.props.children}
        {_.map(this.state.listModal, modal => modal)}
      </GlobalContext.Provider>
    );
  }
}

export default GlobalContextProvider;

export const withGlobalContext = ChildComponent =>
  forwardRef((props, ref) => (
    <GlobalContext.Consumer>
      {context => <ChildComponent {...props} global={context} ref={ref} />}
    </GlobalContext.Consumer>
  ));
