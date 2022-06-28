import {View, Text, Image, Animated} from 'react-native'
import React, {useCallback} from 'react'
import {LinearGradient} from 'expo-linear-gradient'
import {styles} from './styles'

import Choice from "../Choice"

import {ACTION_OFFSET} from '../utils/constants'

const Card = ({name, source, isFirst, swipe, tiltSign, ...rest}) =>{


const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
    inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
    outputRange: ['8deg', '0deg', '-8deg']
})

const likeOpacity =swipe.x.interpolate({
    inputRange: [25, ACTION_OFFSET],
    outputRange: [0,1],
    extrapolate: 'clamp'
})

const nopeOpacity =swipe.x.interpolate({
    inputRange: [-ACTION_OFFSET, -25],
    outputRange: [1,0],
    extrapolate: 'clamp'
})


const cardPositionStyle = {
   transform: [{translateX: swipe.x}, {translateY: swipe.y}, {rotate}]
}

const renderChoice = useCallback(()=>{

    return (
        <>
        <Animated.View style={[styles.choiceContainer, styles.likeContainer, {opacity: likeOpacity}]}>
            <Choice type="like"/>
        </Animated.View>
        <Animated.View style={[styles.choiceContainer, styles.nopeContainer, {opacity: nopeOpacity}]}>
          <Choice type="nope"/>
      </Animated.View>
      </>
    )
}, [likeOpacity, nopeOpacity])

return (
    <Animated.View style ={[styles.container, isFirst && cardPositionStyle]} {...rest}>
        <Image source = {{uri: source}} style = {[styles.image]}/>
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.9)']} style={styles.gradient} />
        <Text style={styles.name}>{name}</Text>

        {
            isFirst && renderChoice()
        }

    </Animated.View>
)
}



export default Card