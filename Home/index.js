import React, {useState, useEffect} from 'react'
import { Text, View, Button, SafeAreaView, Image, FlatList, ActivityIndicator, Pressable } from 'react-native';

import * as MediaLibrary from 'expo-media-library'

const Home = ({navigation}) => {

    const [status, requestPermission] = MediaLibrary.usePermissions()

    const [albums, setAlbums] = useState([])

    const[isLoading, setIsLoading]= useState(false)

    // retrieve a list of all photo albums with 1 or more photos on app launch
    useEffect(()=>{

            const getAllAlbums = async () => {
            const getAlbums = await MediaLibrary.getAlbumsAsync({includeSmartAlbums: true})
            const albumsWithPhotos = getAlbums.filter((item)=>{
                return item.assetCount>0
            })
            setAlbums(albumsWithPhotos)
        }

        getAllAlbums()
    }, [])
    
    return(
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>HOME SCREEN</Text>
            
            <FlatList 
            data={albums}
            renderItem={({item})=>{
                //CHANGE BACK TO MAIN
                return (
                <Pressable onPress={()=>navigation.navigate('Main', {id: item.id})}>
                    <View>
                        <Text>{item.title}: {item.assetCount} pictures</Text>
                    </View>
                </Pressable>
                )
            }}
            keyExtractor={(item)=>item.id}
        />
        <ActivityIndicator size="large" animating={isLoading}/>
       
        </SafeAreaView>
    )
}

export default Home