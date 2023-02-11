import React from 'react';
import { View, Text, Icon, Image, Button } from '@Components';
import Theme from '@Theme';
import { navigate, getCurrentRoute, popToTop } from '@NavigationAction';
import { useTranslation } from 'react-i18next';
import jobhere_img from '@Assets/Images/logo_no_text.png';
import personal_img from '@Assets/Images/user.png';

const TABS = [
  { name: 'HomeScreen', icon: false, displayName: 'jh.home' },
  {
    name: 'MessageScreen',
    icon: 'chatbubble-ellipses',
    displayName: 'jh.message'
  },
  {
    name: 'NotificationScreen',
    icon: 'notifications',
    displayName: 'jh.notifycation'
  },
  { name: 'PersonalScreen', icon: false, displayName: 'jh.personal' }
];

const Tabbar = (props) => {
  const { t } = useTranslation();

  const onPress = (name) => () => {
    if (name === 'HomeScreen') {
      navigate('BottomNavigation', {
        screen: 'JobHereNavigation'
        // params: { screen: 'CommonNavigation', params: { screen: 'HomeScreen' } }
      });
    } else {
      navigate('BottomNavigation', { screen: name });
    }
  };

  return (
    <View.Row
      style={{
        alignItems: 'center',
        height: 60,
        backgroundColor: Theme.colors.white_color,
        shadowColor: Theme.colors.black_color,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
      }}
    >
      {_.map(TABS, ({ name, icon, displayName }, index) => {
        let current_route = getCurrentRoute().name;
        let is_current_route = current_route === name;

        return (
          <View.Col
            key={index}
            style={{
              width: '25%',
              height: '100%',
              justifyContent: 'center',
              borderTopWidth: 3,
              borderColor: is_current_route
                ? Theme.colors.primary_color
                : Theme.colors.white_color
            }}
          >
            <Button.ButtonPreventDouble
              onPress={onPress(name)}
              activeOpacity={0.5}
            >
              <View.Col
                style={{ justifyContent: 'center', alignItems: 'center' }}
              >
                {!!icon ? (
                  <Icon.VectorIcon
                    name={icon}
                    size={28}
                    color={
                      is_current_route
                        ? Theme.text_colors.primary_text_color
                        : Theme.text_colors.secondary_text_color
                    }
                  />
                ) : (
                  <Image.ImageCircle
                    source={name === 'HomeScreen' ? jobhere_img : personal_img}
                    size={30}
                    style={{
                      borderWidth: name === 'HomeScreen' ? 0 : 0.5,
                      borderColor: Theme.colors.dark_gray_color
                    }}
                  />
                )}
                <Text.SubBodyBold
                  style={{
                    color:
                      name === current_route
                        ? Theme.text_colors.primary_text_color
                        : Theme.text_colors.secondary_text_color,
                    fontSize: 12
                  }}
                >
                  {t(displayName)}
                </Text.SubBodyBold>
              </View.Col>
            </Button.ButtonPreventDouble>
          </View.Col>
        );
      })}
    </View.Row>
  );
};

export default Tabbar;
