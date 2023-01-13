import React, { PureComponent } from 'react';
import debounce from 'lodash.debounce';

export const preventDoubleClick = WrappedComponent => {
  class PreventDoubleClick extends PureComponent {
    debouncedOnPress = () => {
      this.props.onPress && this.props.onPress();
    };

    onPress = debounce(this.debouncedOnPress, this.props.delay || 400, {
      leading: true,
      trailing: false
    });

    render() {
      return <WrappedComponent {...this.props} onPress={this.onPress} />;
    }
  }

  PreventDoubleClick.displayName = `withPreventDoubleClick(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return PreventDoubleClick;
};
