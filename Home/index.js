import React, {useState} from 'react'
import { Text, View, Button, SafeAreaView, Image, FlatList, ActivityIndicator } from 'react-native';

import * as MediaLibrary from 'expo-media-library'

const Home = ({navigation}) => {

    const [status, requestPermission] = MediaLibrary.usePermissions()

    const [albums, setAlbums] = useState([])
    const [photos, setPhotos]= useState([])

    const[isLoading, setIsLoading]= useState(false)


    const getAllAlbums = async () => {
        const getAlbums = await MediaLibrary.getAlbumsAsync({includeSmartAlbums: true})
        const albumsWithPhotos = getAlbums.filter((item)=>{
            return item.assetCount>0
        })
        setAlbums(albumsWithPhotos)
    }

    const getAllPhotos = async () => {
        
        setIsLoading(true)

        let album = await MediaLibrary.getAssetsAsync({album: '946FE6D0-CC1D-4E3C-A07F-B19D312CC901', mediaType: 'photo', first: 20, sortBy: ['creationTime']})
     
        const foundPhotos = album['assets']
        const updatedPhotos = []
        for (let i=0;i<foundPhotos.length;i++){
            const updatedPhoto = await MediaLibrary.getAssetInfoAsync(foundPhotos[i].id)
            updatedPhotos.push({
                creationTime: updatedPhoto['creationTime'],
                isFavorite: updatedPhoto['isFavorite'],
                localUri: updatedPhoto['localUri'],
                id: updatedPhoto['id']
            })
        }
        
       // setPhotos(updatedPhotos)    
        setIsLoading(false)

        //const photosArray = [...photos]
        navigation.navigate('Main', {updatedPhotos})
    }

    return(
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>HOME SCREEN</Text>
            <Button title = 'get photos' onPress={getAllPhotos}/>
            <Button title='get Albums'onPress={getAllAlbums}/>
            <FlatList 
            data={albums}
            renderItem={({item})=>{
                return (
                <View>
                    <Text>{item.title}: {item.assetCount} pictures</Text>
                </View>
                )
            }}
            keyExtractor={(item)=>item.id}
        />
        <ActivityIndicator size="large" animating={isLoading}/>
       
        </SafeAreaView>
    )
}

export default Home