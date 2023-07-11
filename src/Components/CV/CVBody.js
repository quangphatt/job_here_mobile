import React, { useEffect, useState } from 'react';
import { View, Loading } from '@Components';
import {
  CVAward,
  CVContact,
  CVEducation,
  CVExperience,
  CVHobby,
  CVImage,
  CVOverall,
  CVSkill,
  CVTitle
} from '@Components/CV';
import Theme from '@Theme';
import { CVStyle } from './CVStyle';

const CVBody = ({ cvData, templateData }) => {
  const [_templateData, setTemplateData] = useState({});
  const [pending, setPending] = useState(true);
  const cv_style = CVStyle?.[templateData.className] ?? {};

  useEffect(() => {
    if (templateData?.structure) {
      const templateDataRe = templateData;
      templateDataRe._structure = JSON.parse(templateDataRe.structure || '');
      setTemplateData(templateDataRe);
      setPending(false);
    }
  }, []);

  const getExactElement = ({ cvDetailType, index, left = true }) => {
    const element_style = left ? cv_style.left_style : cv_style.right_style;

    switch (cvDetailType) {
      case 'CONTACT':
        if (cvData['CONTACT'])
          return (
            <CVContact
              key={index}
              cvData={cvData['CONTACT']}
              elementStyle={element_style}
            />
          );
        return null;
      case 'OVERALL':
        if (cvData['OVERALL'])
          return (
            <CVOverall
              key={index}
              cvData={cvData['OVERALL']}
              elementStyle={element_style}
            />
          );
        return null;
      case 'IMAGE':
        return <CVImage key={index} cvData={cvData['IMAGE']} />;
      case 'EXPERIENCE':
        if (cvData['EXPERIENCE'])
          return (
            <CVExperience
              key={index}
              cvData={cvData['EXPERIENCE']}
              elementStyle={element_style}
            />
          );
        return null;
      case 'SKILL':
        if (cvData['SKILL'])
          return (
            <CVSkill
              key={index}
              cvData={cvData['SKILL']}
              elementStyle={element_style}
            />
          );
        return null;
      case 'EDUCATION':
        if (cvData['EDUCATION'])
          return (
            <CVEducation
              key={index}
              cvData={cvData['EDUCATION']}
              elementStyle={element_style}
            />
          );
        return null;
      case 'TITLE':
        if (cvData['TITLE'])
          return (
            <CVTitle
              key={index}
              cvData={cvData['TITLE']}
              elementStyle={element_style}
            />
          );
        return null;
      case 'HOBBY':
        if (cvData['HOBBY'])
          return (
            <CVHobby
              key={index}
              cvData={cvData['HOBBY']}
              elementStyle={element_style}
            />
          );
        return null;
      case 'AWARD':
        if (cvData['AWARD'])
          return (
            <CVAward
              key={index}
              cvData={cvData['AWARD']}
              elementStyle={element_style}
            />
          );
        return null;
      default:
        return null;
    }
  };

  if (pending) return <Loading />;

  return (
    <View.Row
      style={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Theme.border_colors.secondary_border_color,
        overflow: 'hidden',
        minHeight: 540
      }}
    >
      <View.Col
        style={[{ width: '42%', padding: 10 }, cv_style?.left_side ?? {}]}
      >
        {_templateData?._structure?.left.map((cvDetailType, index) =>
          getExactElement({ cvDetailType, index })
        )}
      </View.Col>
      <View.Col
        style={[{ width: '58%', padding: 10 }, cv_style?.right_side ?? {}]}
      >
        {_templateData?._structure?.right.map((cvDetailType, index) =>
          getExactElement({ cvDetailType, index, left: false })
        )}
      </View.Col>
    </View.Row>
  );
};

export default CVBody;
