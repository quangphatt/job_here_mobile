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
import { CVStyle } from './CVStyle';

const CVBody = ({ cvData, templateData }) => {
  const [_templateData, setTemplateData] = useState({});
  const [pending, setPending] = useState(true);

  useEffect(() => {
    if (templateData?.structure) {
      const templateDataRe = templateData;
      templateDataRe._structure = JSON.parse(templateDataRe.structure || '');
      setTemplateData(templateDataRe);
      setPending(false);
    }
  }, []);

  const getExactElement = ({ cvDetailType, index }) => {
    switch (cvDetailType) {
      case 'CONTACT':
        if (cvData['CONTACT'])
          return <CVContact key={index} cvData={cvData['CONTACT']} />;
        return null;
      case 'OVERALL':
        if (cvData['OVERALL'])
          return <CVOverall key={index} cvData={cvData['OVERALL']} />;
        return null;
      case 'IMAGE':
        return <CVImage key={index} cvData={cvData['IMAGE']} />;
      case 'EXPERIENCE':
        if (cvData['EXPERIENCE'])
          return <CVExperience key={index} cvData={cvData['EXPERIENCE']} />;
        return null;
      case 'SKILL':
        if (cvData['SKILL'])
          return <CVSkill key={index} cvData={cvData['SKILL']} />;
        return null;
      case 'EDUCATION':
        if (cvData['EDUCATION'])
          return <CVEducation key={index} cvData={cvData['EDUCATION']} />;
        return null;
      case 'TITLE':
        if (cvData['TITLE'])
          return <CVTitle key={index} cvData={cvData['TITLE']} />;
        return null;
      case 'HOBBY':
        if (cvData['HOBBY'])
          return <CVHobby key={index} cvData={cvData['HOBBY']} />;
        return null;
      case 'AWARD':
        if (cvData['AWARD'])
          return <CVAward key={index} cvData={cvData['AWARD']} />;
        return null;
      default:
        return null;
    }
  };

  if (pending) return <Loading />;

  return (
    <View.Row>
      <View.Col style={{ width: '42%', padding: 5 }}>
        {_templateData?._structure?.left.map((cvDetailType, index) =>
          getExactElement({ cvDetailType, index })
        )}
      </View.Col>
      <View.Col style={{ width: '58%', padding: 5 }}>
        {_templateData?._structure?.right.map((cvDetailType, index) =>
          getExactElement({ cvDetailType, index })
        )}
      </View.Col>
    </View.Row>
  );
};

export default CVBody;
