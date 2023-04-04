import React, { useState } from 'react';
import { LayoutAnimation } from 'react-native';
import { View, Text, Icon, Button } from '@Components';
import Theme from '@Theme';
import AutoHeightImage from 'react-native-auto-height-image';
import { useTranslation } from 'react-i18next';
import { navigate, getCurrentRoute } from '@NavigationAction';
import logo_group from '@Assets/Images/logo_group.png';

const MENU = [
  {
    name: 'jh.home',
    route: 'HomeScreen',
    type: 1
  },
  {
    name: 'jh.jobs',
    children: [
      {
        name: 'jh.appliedJob',
        route: 'AppliedJobScreen',
        type: 0
      },
      { name: 'jh.savedJob', route: 'SavedJobScreen', type: 0 },
      { name: 'jh.searchJob', route: 'SearchJobScreen', type: 1 }
    ]
  },
  {
    name: 'jh.profileAndCV',
    children: [
      {
        name: 'jh.cvManage',
        route: 'CVManageScreen',
        type: 0
      }
    ]
  },
  {
    name: 'jh.companies',
    children: [{ name: 'jh.companyList', route: 'CompanyListScreen', type: 1 }]
  }
];

const DrawerContent = ({ isSignIn }) => {
  const { t } = useTranslation();
  const [showChildren, setShowChildren] = useState({});

  const onPressSignIn = () => {
    navigate('AuthenticationNavigation', { screen: 'SignInScreen' });
  };

  const onPressSignUp = () => {
    navigate('AuthenticationNavigation', { screen: 'SignUpScreen' });
  };

  const renderMenuItem = (item, index) => {
    let noChild = !item?.children;

    const onToggleShowChildren = () => {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(200, 'easeInEaseOut', 'opacity')
      );
      setShowChildren({
        ...showChildren,
        [index]: noChild ? false : !showChildren[index]
      });
    };

    const onPressNoChild = () => {
      let currentRoute = getCurrentRoute().name;
      if (item.route !== currentRoute) {
        navigate('JobHereNavigation', {
          screen: 'CommonNavigation',
          params: { screen: item.route }
        });
      }
    };

    return (
      <View.Col key={index}>
        <Button.ButtonPreventDouble
          onPress={noChild ? onPressNoChild : onToggleShowChildren}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 8,
            borderRadius: 10,
            backgroundColor: showChildren[index]
              ? Theme.background_colors.box_background_color
              : null
          }}
        >
          <Text.BodyBold fontSize={18} secondary>
            {t(item.name)}
          </Text.BodyBold>
          {!noChild && (
            <Icon.VectorIcon
              name={
                showChildren[index]
                  ? 'chevron-down-outline'
                  : 'chevron-up-outline'
              }
              size={20}
            />
          )}
        </Button.ButtonPreventDouble>
        {showChildren[index] && (
          <View.Col style={{ marginLeft: 15, marginVertical: 4 }}>
            {_.map(item.children, (child, idx) => {
              return renderMenuChild(child, idx);
            })}
          </View.Col>
        )}
      </View.Col>
    );
  };

  const renderMenuChild = (child, index) => {
    const onPressChild = () => {
      let currentRoute = getCurrentRoute().name;
      if (child.route !== currentRoute) {
        if (child.type === 0) {
          navigate('JobHereNavigation', { screen: child.route });
        } else if (child.type === 1) {
          navigate('JobHereNavigation', {
            screen: 'CommonNavigation',
            params: { screen: child.route }
          });
        }
      }
    };

    return (
      <View.Col key={index} style={{ marginVertical: 4 }}>
        <Button.ButtonPreventDouble
          onPress={onPressChild}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Text.Body fontSize={16} secondary>
            {t(child.name)}
          </Text.Body>
        </Button.ButtonPreventDouble>
      </View.Col>
    );
  };

  return (
    <View.Col style={{ padding: 10 }}>
      <View.Row style={{ justifyContent: 'center', marginBottom: 10 }}>
        <AutoHeightImage source={logo_group} width={160} />
      </View.Row>
      <View.Col>
        <View.Col
          style={{
            borderTopWidth: 1,
            borderColor: Theme.colors.black_color,
            marginBottom: 10
          }}
        />
        {isSignIn ? (
          <View.Col>
            {_.map(MENU, (item, index) => {
              return renderMenuItem(item, index);
            })}
          </View.Col>
        ) : (
          <View.Col>
            <Button.Button onPress={onPressSignIn}>
              <Text.BodyBold>{t('jh.signIn')}</Text.BodyBold>
            </Button.Button>
            <Button.Button
              onPress={onPressSignUp}
              secondary
              style={{ marginTop: 8 }}
            >
              <Text.BodyBold primary>{t('jh.signUp')}</Text.BodyBold>
            </Button.Button>
          </View.Col>
        )}
      </View.Col>
    </View.Col>
  );
};

export default DrawerContent;
