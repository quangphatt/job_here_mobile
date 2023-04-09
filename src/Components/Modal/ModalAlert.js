import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { magicModal } from 'react-native-magic-modal';
import { View, Text, Icon, Button } from '@Components';
import theme from '@Theme';

const ActionType = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary'
};

const AlertType = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  DANGER: 'danger'
};

const show = ({
  title = '',
  body = '',
  button_primary = false,
  button_secondary = false,
  type = AlertType.INFO,
  action
}) => {
  magicModal.show(
    <ModalAlert
      title={title}
      body={body}
      button_primary={button_primary}
      button_secondary={button_secondary}
      alertType={type}
      onAction={action}
    />,
    {
      animationIn: 'fadeIn',
      animationOut: 'fadeOut',
      style: {
        alignItems: 'center',
        justifyContent: 'center'
      },
      propagateSwipe: true
    }
  );
};

const hide = () => {
  magicModal.hide();
};

const ModalAlert = ({
  title = '',
  body = '',
  button_primary = false,
  button_secondary = false,
  alertType = AlertType.INFO,
  onAction
}) => {
  let { width, height } = Dimensions.get('window');

  const alert_color = () => {
    switch (alertType) {
      case AlertType.SUCCESS:
        return theme.colors.success;
      case AlertType.INFO:
        return theme.colors.info;
      case AlertType.WARNING:
        return theme.colors.warning;
      case AlertType.DANGER:
        return theme.colors.danger;
    }
  };

  const alert_icon = () => {
    switch (alertType) {
      case AlertType.SUCCESS:
        return 'ios-checkmark-circle-outline';
      case AlertType.WARNING:
        return 'warning-outline';
      case AlertType.DANGER:
        return 'ios-close-circle-outline';
    }
  };

  const onPress = (type) => () => {
    if (typeof onAction === 'function') onAction(type);
    else magicModal.hide();
  };

  return (
    <View.Col
      style={{
        width: width / 1.2,
        ...styles.alert_container
      }}
    >
      <View.Col style={styles.alert_header}>
        {alertType !== AlertType.INFO && (
          <Icon.VectorIcon
            size={60}
            name={alert_icon()}
            color={alert_color()}
          />
        )}
        {!!title && (
          <Text.H3_Bold
            color={alertType === AlertType.INFO ? '#1D232E' : alert_color()}
            style={{ marginBottom: 10 }}
          >
            {title}
          </Text.H3_Bold>
        )}
        {!!body && (
          <Text.Body
            testID="alert_message"
            secondary
            style={{ marginBottom: 10 }}
          >
            {body}
          </Text.Body>
        )}
      </View.Col>
      <View.Row style={styles.alert_footer}>
        {button_secondary && (
          <Button.Button
            secondary
            onPress={onPress(ActionType.SECONDARY)}
            style={[styles.alert_button, { borderColor: alert_color() }]}
          >
            <Text.H4 primary color={alert_color()} numberOfLines={1}>
              {button_secondary}
            </Text.H4>
          </Button.Button>
        )}
        {button_primary && button_secondary && (
          <View.Col style={{ width: 10 }} />
        )}
        {button_primary && (
          <Button.Button
            style={[
              styles.alert_button,
              {
                borderColor: alert_color(),
                backgroundColor: alert_color()
              }
            ]}
            onPress={onPress(ActionType.PRIMARY)}
          >
            <Text.H4 numberOfLines={1}>{button_primary}</Text.H4>
          </Button.Button>
        )}
      </View.Row>
    </View.Col>
  );
};

const styles = StyleSheet.create({
  alert_container: {
    maxWidth: 600,
    backgroundColor: theme.colors.white_color,
    position: 'absolute',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 16
  },
  alert_header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  alert_footer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  alert_button: {
    flex: 1,
    maxWidth: '50%'
  }
});

export default { show, hide, ActionType, AlertType };
