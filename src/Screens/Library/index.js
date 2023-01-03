import React from 'react';
import { 
  StatusBar, 
  Text, 
  View,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  TextInput } from 'react-native';
import styled from 'styled-components/native';

import { Colors, Images, Metrics } from '../../Constants'
import { McText, McImage, PlayButton } from '../../Components'
import { dummyData } from '../../Mock'
import BottomBar from './BottomBar';
 
const Library = ({navigation}) => {

  const _renderItem = ({item, index}) => {
    return (
      <View>
        <View style={{
          marginTop: 16,
          marginLeft: index === 0 ? 24 : 0,
          marginRight: index === dummyData.Playlists.length - 1 ? 0 : 24
        }}>

          <McImage source={item.thumbnail} key={index} style={{marginBottom: 12}}/>

          <McText semi size={16} color={Colors.grey5}>{ item.name }</McText>

          <McText 
            medium 
            size={12} 
            color={Colors.grey3}
            style={{marginTop: 4}}
          >
            { item.songs } {`song${item.songs > 1 ? 's' : ''}`}
          </McText>
        </View>
      </View>
    )
  }

  return (
    <Container>
      <StatusBar barStyle={'light-content'} />

      <McText 
        bold 
        size={28} 
        color={Colors.primary}
        style={{
          marginLeft: Metrics.padding,
          marginTop: 12,
        }}
        >
          Library
      </McText>
      <SearchSection>
        <McImage 
          source={Images.search} 
          style={{ marginLeft: 16, marginRight: 12 }}  
        />
        <TextInput 
          placeholder='Song or Artist' 
          placeholderTextColor={Colors.grey3} 
          style={{
            color: Colors.grey4
          }}  
        />
      </SearchSection>

      <TitleSection>
          <McText medium size={20} color={Colors.grey4}>Playlists</McText>

          <TouchableWithoutFeedback>
            <McImage source={Images.chevronBlue} />
          </TouchableWithoutFeedback>
      </TitleSection>

      <View>
        <FlatList 
          keyExtractor={(item) => 'playlist_' + item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{}}
          data={dummyData.Playlists}
          renderItem={_renderItem}
        />
      </View>

      <TitleSection>
          <McText medium size={20} color={Colors.grey4}>Favorite</McText>

          <TouchableWithoutFeedback>
            <McImage source={Images.chevronBlue} />
          </TouchableWithoutFeedback>
      </TitleSection>

      <View>
        <ScrollView
          contentContainerStyle={{marginTop: 14, height: 200 }}
          style={{}}
        >
          {
            dummyData.Favorite.map((item, index) => {
              return (
                <FavoriteItemView key={index}>

                  <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate('Player', {selectedMusic: item})
                  }}>

                    <View style={{flexDirection: 'row'}}>
                      <MusicCircle>
                        <McImage source={Images.musicIcon} />
                      </MusicCircle>

                      <View style={{marginLeft: 12}}>
                        <McText semi size={14} color={Colors.grey5}>{item.title}</McText>
                        <McText medium size={12} color={Colors.grey3} style={{marginTop: 4}}>{item.artist}</McText>
                      </View>

                    </View>
                  </TouchableWithoutFeedback>

                  <McImage source={Images.like} />
                </FavoriteItemView>
              )
            })
          }
        </ScrollView>
      </View>

      <BottomSection>
        <BottomBar>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
            marginHorizontal: 16,
            marginVertical: 12
          }}>

            <View style={{ 
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <McImage 
                source={Images.thumb1} 
                style={{
                  width: 38,
                  height: 38
                }}  
              />
              <View style={{marginLeft: 12}}>
                <McText bold size={16} color={Colors.grey5}>Thunder</McText>
                <McText medium size={12} color={Colors.grey3} style={{
                  marginTop: 4
                }}>Imagine Dragons</McText>
              </View>

            </View>

            <PlayButton size={46} circle={41.28} icon={Images.pause}></PlayButton>

          </View>
        </BottomBar>
      </BottomSection>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.background};
`;

const SearchSection = styled.View`
  width: 90%;
  height: 52px;
  border-radius: 30px;
  background-color: ${Colors.secondary};
  margin: 20px 24px 0px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const TitleSection = styled.View`
  margin: 20px 24px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FavoriteItemView = styled.View`
  margin: 10px 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const MusicCircle = styled.View`
  width: 42px;
  height: 42px;
  border-radius: 42px;
  background-color: ${Colors.secondary};
  align-items: center;
  justify-content: center;
`;

const BottomSection = styled.View`
  margin: 0px 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  position: absolute;
  bottom: 50px;
  left: 0px;
  z-index: 1;
`;
export default Library;