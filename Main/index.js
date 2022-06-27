import React, {useState, useRef, useCallback, useEffect} from "react"
import {View, Animated, PanResponder} from "react-native"

import {pets as petsArray} from './data'

import Footer from '../Footer'
import Card from "../Card"

import { CARD, ACTION_OFFSET } from "../utils/constants"

import {styles} from './styles'



const Main = ({navigation, route}) => {

    const [photos, setPhotos] = useState(route.params.updatedPhotos)
    console.log(photos)

    const swipe = useRef(new Animated.ValueXY({x:0, y:0})).current
    const tiltSign = useRef(new Animated.Value(1)).current

    //reset if all cards used
    /*useEffect(()=>{
        if(!pets.length){
            setPets(petsArray)
        }
    },[pets.length])
*/
    
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

    return (
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
            }).reverse()}

            <Footer handleChoice={handleChoice}/>
        </View>
    )
}

export default Main