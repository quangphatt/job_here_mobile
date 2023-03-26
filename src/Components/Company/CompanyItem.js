import React from 'react';
import { View, Text, Image, Button } from '@Components';
import { navigatePush } from '@NavigationAction';
import Theme from '@Theme';
import company_default_img from '@Assets/Images/company_default_img.jpg';
import company_default_bg from '@Assets/Images/company_default_background.jpg';

const AVATAR_SIZE = 72;

const CompanyItem = ({ companyData }) => {
  const onPressItem = () => {
    navigatePush('CompanyInfoScreen', { companyId: companyData.companyId });
  };

  return (
    <Button.ButtonPreventDouble
      onPress={onPressItem}
      activeOpacity={0.8}
      style={{ borderRadius: 10, borderWidth: 0.5, overflow: 'hidden' }}
    >
      <View.Col>
        <Image.Image
          source={
            companyData?.backgroundUrl
              ? { uri: companyData.backgroundUrl }
              : company_default_bg
          }
          style={{ flex: 1, height: 100 }}
        />
      </View.Col>
      <View.Row style={{ minHeight: 60 }}>
        <View.Col
          style={{
            padding: 3,
            backgroundColor: Theme.colors.white_color,
            borderColor: Theme.border_colors.secondary_border_color,
            borderWidth: 1,
            borderRadius: (AVATAR_SIZE + 3 * 2) / 6,
            position: 'absolute',
            top: -(AVATAR_SIZE / 2),
            left: AVATAR_SIZE / 4
          }}
        >
          <Image.ImageSquare
            source={
              companyData?.avatarUrl
                ? { uri: companyData.avatarUrl }
                : company_default_img
            }
            size={AVATAR_SIZE}
            style={{
              borderColor: Theme.border_colors.primary_border_color,
              borderWidth: 1
            }}
          />
        </View.Col>
        <View.Col
          style={{
            marginLeft: (AVATAR_SIZE * 5) / 4 + 3 * 2 + 10,
            paddingRight: 5,
            paddingBottom: 5,
            flex: 1
          }}
        >
          <Text.BodyBold secondary fontSize={19}>
            {companyData.companyName}
          </Text.BodyBold>
        </View.Col>
      </View.Row>
    </Button.ButtonPreventDouble>
  );
};

export default CompanyItem;
