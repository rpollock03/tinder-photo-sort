import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, View, Dimensions, Image, Animated} from 'react-native'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

import * as MediaLibrary from 'expo-media-library'

import * as ImageManipulator from 'expo-image-manipulator';


const New = ({navigation, route}) => {

const [status, requestPermission] = MediaLibrary.usePermissions()

const [photos, setPhotos] = useState([])
const [isLoading, setIsLoading]=useState(true)

useEffect(async()=>{
    const getPhotos = await getAllPhotos(route.params.id)
    setPhotos(getPhotos)
    cacheImages(photos)
    setIsLoading(false)
},[])

const cacheImages = async (srcArray)=>{
    const promises = await srcArray.map((src)=>{
        return new Promise(function (resolve, reject){
            const img = new Image()

            img.src = src.uri,
            img.onload = resolve()
            img.onerror=reject() 

        })
    })
    await Promise.all(promises)
}

const getAllPhotos = async (id) => {
        
    let album = await MediaLibrary.getAssetsAsync({album: id, mediaType: 'photo', first: 20})
 
    const foundPhotos = album['assets']
    const updatedPhotos = []
    for (let i=0;i<foundPhotos.length;i++){
        const updatedPhoto = await MediaLibrary.getAssetInfoAsync(foundPhotos[i].id)
        const compressedImage = await ImageManipulator.manipulateAsync(updatedPhoto.localUri, [], { compress: 0.2 });
        updatedPhotos.push({
            uri: compressedImage.uri,
            id: updatedPhoto['id']
        })
    }
    return updatedPhotos       
}


const renderUsers = () => {
    

    return photos.map((item, i)=>{
        return(
            <Animated.View key={item.id} style={{height: SCREEN_HEIGHT -120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'}}>
            <Image source={{uri: item.uri}} style={{flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20}}/>
        </Animated.View>
        )
    }).reverse()
}


return (
<View style={{flex:1}}>
    {isLoading ? <Text>Loading</Text> : null}
    <View style={{height:60}}>
    </View>
    <View style={{flex:1}}>
       {!isLoading && renderUsers()}
    </View>
    <View style={{height:60}}>
    </View>
</View>
)

}

export default New