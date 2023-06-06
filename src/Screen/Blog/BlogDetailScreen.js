import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { View, Text, Common, Button, Loading } from '@Components';
import Theme from '@Theme';
import { BlogItem } from '@Components/Blog';
import { goBack } from '@NavigationAction';
import { useTranslation } from 'react-i18next';
import { blogBusiness } from '@Business';
import { convertToTimeString } from '@Config/Support/TimeSupport';

const BlogDetailScreen = ({ route }) => {
  const blogId = route.params.blogId;
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [stateData, setStateData] = useState({
    blogData: {},
    loading: true
  });
  const [__lastUpdate, setLastUpdate] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let res = await blogBusiness.getBlogById(blogId, true);
    if (res.data.httpCode === 200) {
      stateData.blogData = res.data.objectData;
    }
    stateData.loading = false;
    setLastUpdate(moment().format('x'));
  };

  return (
    <View.Row style={{ flex: 1 }}>
      <ScrollView stickyHeaderIndices={[0]} ref={listRef}>
        <Common.Header title={t('jh.blog')} actionLeft={goBack} />
        {stateData.loading ? (
          <Loading placeholder screen />
        ) : (
          <View.Col style={{ paddingHorizontal: 10 }}>
            <View.Col
              style={{
                backgroundColor: Theme.colors.white_color,
                padding: 10,
                borderRadius: 10,
                marginVertical: 10
              }}
            >
              <View.Row>
                <Text.Body
                  style={{
                    marginBottom: 5,
                    backgroundColor: Theme.colors.black_color,
                    paddingHorizontal: 5,
                    paddingBottom: 3,
                    borderRadius: 10
                  }}
                >
                  {stateData.blogData.industryName}
                </Text.Body>
              </View.Row>
              <Text.BodyBold secondary fontSize={22}>
                {stateData.blogData.blogName}
              </Text.BodyBold>
              <Text.Body secondary style={{ fontStyle: 'italic' }}>
                {convertToTimeString(stateData.blogData.createdDate, t)}
              </Text.Body>
              <Text.Body secondary style={{ marginTop: 5, marginBottom: 5 }}>
                {stateData.blogData.description}
              </Text.Body>
              <Common.RenderHTMLJobHere
                contentWidth={width}
                source={{ html: stateData.blogData?.content ?? ' ' }}
                tagsStyles={{
                  p: { margin: 0 }
                }}
              />
              <Text.BodyBold
                secondary
                style={{ fontStyle: 'italic', alignSelf: 'flex-end' }}
              >
                {stateData.blogData.userName}
              </Text.BodyBold>
            </View.Col>
            <View.Col>
              <Text.BodyBold
                secondary
                fontSize={18}
                style={{ alignSelf: 'center' }}
              >
                {t('jh.relateBlog')}
              </Text.BodyBold>
              {!!stateData.blogData?.blogRefs?.length && (
                <View.Col>
                  {_.map(stateData.blogData.blogRefs, (blog, index) => (
                    <View.Col key={index}>
                      <BlogItem blogData={blog} />
                    </View.Col>
                  ))}
                </View.Col>
              )}
            </View.Col>
          </View.Col>
        )}
      </ScrollView>
      {!stateData.loading && <Button.ButtonScrollToTop listRef={listRef} />}
    </View.Row>
  );
};

export default BlogDetailScreen;
