import React from 'react';
import { View, Text, Icon } from '@Components';
import { useTranslation } from 'react-i18next';

const CVContact = ({ cvData, elementStyle }) => {
  const { t } = useTranslation();
  const titleStyle = elementStyle?.title ?? {};
  const textStyle = elementStyle?.text ?? {};
  const iconStyle = elementStyle?.icon ?? {};

  return (
    <View.Col style={{ marginBottom: 5 }}>
      <Text.BodyBold fontSize={12} secondary style={[textStyle, titleStyle]}>
        {t('jh.contactInformation')}
      </Text.BodyBold>
      <ContactItem
        icon="mail"
        data={cvData.email}
        textStyle={textStyle}
        iconStyle={iconStyle}
      />
      <ContactItem
        icon="call"
        data={cvData.phone}
        textStyle={textStyle}
        iconStyle={iconStyle}
      />
      <ContactItem
        icon="calendar"
        data={cvData.dateOfBirth}
        textStyle={textStyle}
        iconStyle={iconStyle}
      />
    </View.Col>
  );
};

const ContactItem = ({ icon, data, textStyle, iconStyle }) => (
  <View.Row style={{ alignItems: 'center' }}>
    <Icon.VectorIcon
      name={icon}
      size={7}
      style={[{ marginRight: 3, marginTop: 3 }, iconStyle]}
    />
    <Text.Body fontSize={9} secondary style={textStyle}>
      {data}
    </Text.Body>
  </View.Row>
);

export default CVContact;
