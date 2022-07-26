import React, {useState, useEffect} from 'react'
import { Text, View, Button, SafeAreaView, Image, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
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
        if(albums.length==0){
            const result = await getAllAlbums()
        }
        
  
 
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
            renderItem={({item, index})=>{
              
                return (
                <Pressable style={{width:'50%', padding:10, position: 'relative' }} onPress={()=>navigation.navigate('Main', {id: item.id})}>
                  
                  
                  <View style={{display: 'flex', backgroundColor:'white', margin: 4, display:'flex', justifyContent:'center', position: 'relative', borderColor: 'grey', borderWidth: 1, borderRadius: 2,transform: [{ rotate: '-2deg'}] }}>
                    <Image source = {{uri: item.preview}} style={{width:'100%', borderColor: 'white', borderTopWidth:7,borderLeftWidth:7, borderRightWidth:7, aspectRatio: 1/1}}/>
                    <Ionicons name="trash" size={30} color="black" style={{position:'absolute', top:135, left:135, color:'red'}}/>
                    <Text style={{padding: 7}}><Ionicons name="camera-outline" size={20} color="black" /> {item.title} <Text style={{color:'grey', padding:2}}>[{item.assetCount}]</Text></Text>
                  </View>
                  <View style={{width:'100%', height: '100%',zIndex: '-1', margin: 12, backgroundColor: 'white', borderColor: 'grey', borderWidth: 1, position: 'absolute', borderRadius: 2, transform: [{ rotate: '3deg'}]}}>

                  </View>
                  <View style={{width:'100%', height: '100%',zIndex: '-2', margin: 12, backgroundColor: 'white', borderColor: 'grey', borderWidth: 1,position: 'absolute', borderRadius: 2, transform: [{ rotate: '5deg'}]}}>

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