import {View, Text, Image, Animated} from 'react-native'
import React, {useCallback} from 'react'
import {LinearGradient} from 'expo-linear-gradient'
import {styles} from './styles'

import Choice from "../Choice"

import {ACTION_OFFSET} from '../utils/constants'

const Card = ({name, source, isFirst, swipe, ...rest}) =>{


const renderChoice = useCallback(()=>{


    return (
        <>
        <View style={[styles.choiceContainer, styles.likeContainer]}>
            <Choice type="like"/>
        </View>
          <View style={[styles.choiceContainer, styles.nopeContainer]}>
          <Choice type="nope"/>
      </View>
      </>
    )
}, [])


const rotate = swipe.x.interpolate({
    inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
    outputRange: ['8deg', '0deg', '-8deg']
})

const cardPositionStyle = {
   // transform:[ {translateX: swipe.x}, {translateY: swipe.y}]
   transform: [{translateX: swipe.x}, {translateY: swipe.y}, {rotate}]
}


return (
    <Animated.View style ={[styles.container, isFirst && cardPositionStyle]} {...rest}>
        <Image source = {source} style = {styles.image}/>
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.9)']} style={styles.gradient} />
        <Text style={styles.name}>{name}</Text>

        {
            isFirst && renderChoice()
        }

    </Animated.View>
)
}



export default Card