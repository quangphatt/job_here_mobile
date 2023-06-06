import React from 'react';
import { View, Text, Image, Button } from '@Components';
import Theme from '@Theme';
import { navigate } from '@NavigationAction';
import { useTranslation } from 'react-i18next';
import { convertToTimeString } from '@Config/Support/TimeSupport';

const BlogItem = ({ blogData }) => {
  const { t } = useTranslation();

  const onPressBlog = () => {
    navigate('BlogDetailScreen', { blogId: blogData.blogId });
  };

  return (
    <Button.ButtonPreventDouble
      onPress={onPressBlog}
      style={{
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        borderColor: Theme.colors.dark_gray_color,
        borderTopWidth: 1
      }}
    >
      <Image.ImageSquare
        source={{ uri: blogData.imageUrl }}
        size={80}
        style={{
          borderColor: Theme.border_colors.primary_border_color,
          borderWidth: 1,
          backgroundColor: Theme.colors.white_color,
          marginTop: 3
        }}
      />
      <View.Col style={{ flex: 1, marginLeft: 10 }}>
        <Text.BodyBold secondary fontSize={17}>
          {blogData.blogName}
        </Text.BodyBold>
        <Text.Body secondary style={{ fontStyle: 'italic' }}>
          {convertToTimeString(blogData.createdDate, t)}
        </Text.Body>
        <Text.Body secondary style={{ marginTop: 5, marginBottom: 5 }}>
          {blogData.description}
        </Text.Body>
        <Text.BodyBold
          secondary
          style={{ fontStyle: 'italic', alignSelf: 'flex-end' }}
        >
          {blogData.userName}
        </Text.BodyBold>
      </View.Col>
    </Button.ButtonPreventDouble>
  );
};

export default BlogItem;
