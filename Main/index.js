import React, {useState, useRef, useCallback, useEffect} from "react"
import {View, Animated, PanResponder, ActivityIndicator} from "react-native"

import Footer from '../Footer'
import Card from "../Card"

import * as ImageManipulator from 'expo-image-manipulator';

import SplashScreen from '../SplashScreen'

import { CARD, ACTION_OFFSET } from "../utils/constants"

import {styles} from './styles'

import * as MediaLibrary from 'expo-media-library'

const Main = ({navigation, route}) => {

    const [status, requestPermission] = MediaLibrary.usePermissions()

    const [photos, setPhotos] = useState([])

    const[isLoading, setIsLoading]=useState(true)

    const swipe = useRef(new Animated.ValueXY({x:0, y:0})).current
    const tiltSign = useRef(new Animated.Value(1)).current

    //reset if all cards used
    /*useEffect(()=>{
        if(!pets.length){
            setPets(petsArray)
        }
    },[pets.length])
*/
    useEffect(async()=>{
        const getPhotos = await getAllPhotos(route.params.id)
        setPhotos(getPhotos)
        setIsLoading(false)
    },[])
    
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (event,gesture) => {
            swipe.setValue({x: gesture.dx, y: gesture.dy})
            tiltSign.setValue(gesture.y0 > CARD.HEIGHT / 2 ? 1: -1)
        },
        onPanResponderRelease: (event, gesture) => {

            const direction = Math.sign(gesture.dx)
            const isActionActive = Math.abs(gesture.dx)> ACTION_OFFSET

            if(isActionActive){
                Animated.timing(swipe, {
                    duration: 200,
                    toValue: {
                        x: direction * CARD.OUT_OF_SCREEN,
                        y: gesture.dy
                    },
                    useNativeDriver: true
                }).start(removeTopCard)

            }else{
                Animated.spring(swipe, {
                    toValue: {
                        x:0,
                        y:0
                    }, 
                    useNativeDriver: true,
                    friction: 5
                }).start()
            }
        }
    })

    const removeTopCard = useCallback(()=> {
        setPhotos((prevState) => prevState.slice(1)) 
        swipe.setValue({x:0, y:0})
    },[swipe])

    const handleChoice = useCallback((direction)=> {
        Animated.timing(swipe.x, {
            toValue: direction * CARD.OUT_OF_SCREEN,
            duration:400,
            useNativeDriver: true
        }).start(removeTopCard)
    }, [removeTopCard, swipe.x])

    const getAllPhotos = async (id) => {
        
        let album = await MediaLibrary.getAssetsAsync({album: id, mediaType: 'photo', first: 10, sortBy: ['creationTime']})
     
        const foundPhotos = album['assets']
        const updatedPhotos = []
        for (let i=0;i<foundPhotos.length;i++){
            const updatedPhoto = await MediaLibrary.getAssetInfoAsync(foundPhotos[i].id)
            const compressedImage = await ImageManipulator.manipulateAsync(updatedPhoto.localUri, [], { compress: 0.2 });
            updatedPhotos.push({
                creationTime: updatedPhoto['creationTime'],
                isFavorite: updatedPhoto['isFavorite'],
                localUri: compressedImage.uri,
                id: updatedPhoto['id']
            })
        }
        return updatedPhotos       
        //const photosArray = [...photos] NON STATE VERSION
    }


    if(isLoading){
        return <SplashScreen/>
    }

else   return (

        <View style={styles.container}>
            {photos.map(({id, localUri, creationTime}, index)=>{ 
                
                const isFirst = index==0
                const dragHandlers = isFirst ? panResponder.panHandlers : {}
                
                return <Card 
                        key = {id}
                        name = {creationTime}
                        source={localUri}
                        isFirst={isFirst}
                        swipe={swipe}
                        tiltSign={tiltSign}
                        {...dragHandlers}
                    />   
            }).reverse() }

            <Footer handleChoice={handleChoice}/>
        </View>
    )
}

export default Main