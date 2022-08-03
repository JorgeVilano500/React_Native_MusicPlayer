import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, Image, FlatList, Animated } from 'react-native'
import React, { useEffect, useState, useRef } from 'react';
import Slider from '@react-native-community/slider'
import { Ionicons } from '@expo/vector-icons';
import songs from '../model/data';
import { Audio } from 'expo-av';
import TrackPlayer, {Capability, Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents} from 'react-native-track-player';

const {width, height} = Dimensions.get('window') // Dimensions is able to get the px size for each screeen

const togglePlayback = async (playbackState) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if(currentTrack != null) {
        if(playbackState == State.Paused){
            await TrackPlayer.play()
        } else {
            await TrackPlayer.pause()
        }
    }
}


const setUpPlayer = async () => {
    try{
        await TrackPlayer.setupPlayer();
        await TrackPlayer.add(songs)
    }
    catch(e){
        console.log(e)
    }
//     try{
//     console.log('Loading Sound');
// const { sound } = await Audio.Sound.createAsync(
//    require('../assets/audio/StopBreathing.mp3')
// );
// setSound(sound);

// console.log('Playing Sound');
// await sound.playAsync();
// }
// catch(e) {
//     console.log(e);
// }
}



const MusicPlayer = () => {
    const playBackState = usePlaybackState();
    
    const [songIndex, setSongIndex] = useState(0);
    const [sound, setSound] = useState()

    const scrollX = useRef(new Animated.Value(0)).current;// we are getting the value and gettin ghte current reference of the scroll x value in the present x screen.

    useEffect(() => {
        scrollX.addListener(({value}) => {
            // console.log(`ScrollX: ${value} | Devide Width: ${width}`);
            const index = Math.round(value / width);
            // console.log(index)// returns the index of the picture in the list
            setSongIndex(index);
        });
    }, [])

    
    const renderSongs = ({item, index}) => {
        return (
            <Animated.View style={style.mainImageWrapper}>
            <View style={[style.imageWrapper, style.elevation]}>
            <Image 
            source={ item.artwork}
            style={style.musicImage}
            />
        </View>
        </Animated.View>
        )
    } 


    // useEffect(() => {
    //     return sound
    //     ? () => {
    //         console.log('Unloading Sound');
    //         sound.unloadAsync(); }
    //     : undefined;
    // }, [sound]
    // )

   


  return (
      <SafeAreaView style={style.container}>
            <View style={style.mainContainer}>
                {/* Image */}
                <Animated.FlatList
                renderItem={renderSongs}
                data={songs}
                keyExtractor={item=>item.id}// use item id to make each component unique
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: scrollX
                                }
                            }
                        }
                    ],
                    {useNativeDriver: true}
                )}
                
                />
                {/* Song Content */}
                <View>
                    <Text style={[style.songTitle, style.songContent]}>{songs[songIndex].title}</Text>
                    <Text style={[style.songArtist, style.songContent]}>{songs[songIndex].artist}</Text>

                </View>

                {/* Progess Slider */}
                <View>
                    <Slider 
                        style={style.progressBar}
                        value={10}
                        minimumValue={0}
                        maximumValue={100}
                        thumbTintColor='#FFD369'
                        minimumTrackTintColor='##FFD369'
                        maximumTrackTintColor='#fff'
                        onSlidingComplete={() => {}}
                    />
                    {/* music progress durations */}
                    <View style={style.progressLevelDuration}>
                        <Text style={style.progressLabelText}>00:00</Text>
                        <Text style={style.progressLabelText}>00:00</Text>
                    </View>
                </View>
                




                {/* Music Controls */}
            <View style={style.musicControlsContainer}>
                 <TouchableOpacity onPress={() =>{}}>
                   { <Ionicons name='play-skip-back-outline' size={30} color='#FFD369' /> }{/**Will need to add touchable opacity for this to be interactive */}
                   {/**If there is no text inside of Touchable Opacity Wrap inside of {} */}
                </TouchableOpacity> 
                <TouchableOpacity onPress={() => togglePlayback(playBackState)}>
                   { <Ionicons name={playBackState === State.Playing ? 'ios-play-circle' : 'ios-pause-circle'} size={75} color='#FFD369' /> }{/**Will need to add touchable opacity for this to be interactive */}
                   {/**If there is no text inside of Touchable Opacity Wrap inside of {} */}
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{}}>
                   { <Ionicons name='play-skip-forward-outline' size={35} color='#FFD369' /> }{/**Will need to add touchable opacity for this to be interactive */}
                   {/**If there is no text inside of Touchable Opacity Wrap inside of {} */}
                </TouchableOpacity>
            </View>


                
            </View>
            <View style={style.bottomContainer}>
                <View style={style.bottomIconWrapper}>
                <TouchableOpacity onPress={() =>{}}>
                   { <Ionicons name='heart-outline' size={30} color='#888888' /> }{/**Will need to add touchable opacity for this to be interactive */}
                   {/**If there is no text inside of Touchable Opacity Wrap inside of {} */}
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() =>{}}>
                   { <Ionicons name='repeat' size={30} color='#888888' /> }{/**Will need to add touchable opacity for this to be interactive */}
                   {/**If there is no text inside of Touchable Opacity Wrap inside of {} */}
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{}}>
                   { <Ionicons name='share-outline' size={30} color='#888888' /> }{/**Will need to add touchable opacity for this to be interactive */}
                   {/**If there is no text inside of Touchable Opacity Wrap inside of {} */}
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{}}>
                   { <Ionicons name='ellipsis-horizontal' size={30} color='#888888' /> }{/**Will need to add touchable opacity for this to be interactive */}
                   {/**If there is no text inside of Touchable Opacity Wrap inside of {} */}
                </TouchableOpacity>
                </View>
            </View>

      </SafeAreaView>
    
  )
}

export default MusicPlayer

const style = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#222831',
    },
    mainContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    bottomContainer: {
        width: width,
        alignItems: 'center', 
        paddingVertical: 15, 
        borderTopColor: '#393E46',
        borderWidth: 1,

    },
    bottomIconWrapper: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        width: '80%'

    },
    mainImageWrapper: {
        width: width, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    imageWrapper: {
        width: 300, 
        height: 340, 
        marginBottom: 25,
        marginTop: 20
    },
    musicImage: {
        width: '100%', 
        height: '100%',
        borderRadius: 15
    },
    elevation: {
        elevation: 5, 

        shadowColor: '#ccc',
        shadowOffset: {
            width: 5, 
            height: 5
        },
        shadowOpacity: 0.5, 
        shadowRadius: 3.84
    },
    songContent: {
        textAlign: 'center', 
        color: '#EEEEEE'
    
    },
    songTitle: {
        fontSize: 18, 
        fontWeight: '600', 
        },
    songArtist: {
        fontSize: 16, 
        fontWeight: '300'
    },
    progressBar: {
        width: 350, 
        height: 40, 
        marginTop: 25, 
        flexDirection: 'row'
    },
    progressLevelDuration: {
        width: 340, 
        flexDirection: 'row', 
        justifyContent: 'space-between',

    },
    progressLabelText: {
        color: '#fff', 
        fontWeight: '500',
    },
    musicControlsContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        width: '60%',
        marginTop: 10, 

    },

})