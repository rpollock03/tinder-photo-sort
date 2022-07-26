import React, {useState, useEffect} from 'react'
import { Text, View, Button, SafeAreaView, Image, FlatList, ActivityIndicator, Pressable } from 'react-native';

import { Chip } from 'react-native-paper';

import * as MediaLibrary from 'expo-media-library'
import * as ImageManipulator from 'expo-image-manipulator';

import SplashScreen from '../SplashScreen'

const Home = ({navigation}) => {

    const [status, requestPermission] = MediaLibrary.usePermissions()

    const [albums, setAlbums] = useState([])

    const[isLoading, setIsLoading]= useState(true)

    // retrieve a list of all photo albums with 1 or more photos on app launch
   useEffect(()=>{
    const timeout = setTimeout(()=> setIsLoading(false),2000)
    return () => clearTimeout(timeout)
   },[])
   
    useEffect(async()=>{


        const getAllAlbums = async () => {

            // CAN PROBABLY IMPROVE THIS SECTION - DONT NEED THE IF STATEMENT, BETTER WAY OF FILTERING TO ENSURE ONLY ALBUMS WITH PHOTOGRAPHS RATHER THAN 'ASSETS' ARE RETURNED
            const getAlbums = await MediaLibrary.getAlbumsAsync({includeSmartAlbums: true})
            const albumsWithPhotos = getAlbums.filter((item)=>{
                return item.assetCount>0
            })
            
            for(let i=0; i<albumsWithPhotos.length; i++){
                //get the most recent photo in the album to use as cover

             const mostRecentPhoto = await MediaLibrary.getAssetsAsync({album: albumsWithPhotos[i].id, mediaType: 'photo', first: 1})
              
             if (typeof(mostRecentPhoto.assets[0]) == 'undefined'){
                continue;
             }
 

                    //get the local uri
                const updatedPhoto = await MediaLibrary.getAssetInfoAsync(mostRecentPhoto.assets[0].id)

                if(updatedPhoto){
                    const compressedImage = await ImageManipulator.manipulateAsync(updatedPhoto.localUri, [], { compress: 0.1 });
   
               
                    setAlbums(prevState => [...prevState, {
                        title: albumsWithPhotos[i].title,
                        assetCount: albumsWithPhotos[i].assetCount,
                        id: albumsWithPhotos[i].id,
                        preview: compressedImage.uri // updatedPhoto.localUri//MIGHT SLOW IT DOWN
                    }])      
                   
                    
                }
            }
        }

        const result = await getAllAlbums()
 
    }, [])
    

    if(isLoading){
        return <SplashScreen/>
    }

    return(
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
   
             <FlatList 
            data={albums}
            key={2}
            numColumns={2}
            renderItem={({item})=>{
              
                return (
                <Pressable style={{width:'50%', padding:10 }}onPress={()=>navigation.navigate('Main', {id: item.id})}>
                  <View style={{display: 'flex', backgroundColor:'blue', display:'flex', justifyContent:'center'}}>
                    <Image source = {{uri: item.preview}} style={{width:'100%', aspectRatio: 1/1}}/>
                    <Text>{item.title}: {item.assetCount} imgs</Text>
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