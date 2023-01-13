import React, { PureComponent, createRef } from 'react';
import { StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { View, Text, Icon } from '@Components';
import theme from '@Theme';
import Global from '@Global';

class ModalAction extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isScroll: false,
      isShowHeader: true,
      panGestureEnabled: false,
      label: '',
      component: null,
      footerComponent: null,
      withReactModal: false,
      closeOnOverlayTap: false
    };
    this.params;
    this.modalActionRef = createRef();
    this.on_close = null;
  }

  showModal = params => {
    this.on_close = params.on_close;
    this.setState({
      isShowHeader: params?.isShowHeader ?? true,
      isScroll: params?.isScroll ?? false,
      label: params.label,
      component: params.component,
      footerComponent: params.footerComponent,
      panGestureEnabled: params?.panGestureEnabled ?? false,
      withReactModal: params?.withReactModal ?? false,
      closeOnOverlayTap: params?.closeOnOverlayTap ?? false
    });
    this.modalActionRef.current.open();
  };

  hideModal = params => {
    this.params = params;
    this.modalActionRef.current.close();
  };

  onClosed = () => {
    if (typeof this.on_close === 'function') {
      this.params?.persist?.();
      this.on_close(this.params);
      this.params = null;
    }
  };

  onHideModal = () => {
    Global._hideModal();
  };

  renderHeader = () => {
    const { isShowHeader } = this.state;
    if (isShowHeader) {
      return (
        <View.Row style={styles.headerContainer}>
          <Text.H4_Bold style={{ flex: 1 }} numberOfLines={1}>
            {this.state.label}
          </Text.H4_Bold>
          <TouchableOpacity onPress={this.onHideModal}>
            <Icon.VectorIcon
              name={'close'}
              xboss
              size={20}
              color={theme.colors.white_color}
              paddingLeft={10}
            />
          </TouchableOpacity>
        </View.Row>
      );
    }
    return null;
  };

  renderFooter = () => {
    const { footerComponent } = this.state;
    if (footerComponent) {
      return footerComponent;
    }
    return null;
  };

  customRender = () => {
    return <Animated.View>{this.state.component}</Animated.View>;
  };

  render() {
    return (
      <Modalize
        ref={this.modalActionRef}
        adjustToContentHeight
        onClosed={this.onClosed}
        HeaderComponent={this.renderHeader}
        FooterComponent={this.renderFooter}
        customRenderer={this.state.isScroll && this.customRender}
        panGestureEnabled={this.state.panGestureEnabled}
        withReactModal={this.state.withReactModal}
        closeOnOverlayTap={this.state.closeOnOverlayTap}
        handleStyle={{ backgroundColor: 'transparent' }}
      >
        {!this.state.isScroll && this.state.component}
        {this.props.children}
      </Modalize>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: theme.colors.primary_color,
    paddingVertical: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 1000
  }
});

export default ModalAction;
