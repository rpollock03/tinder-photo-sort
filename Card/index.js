import {View, Text, Image, Animated} from 'react-native'
import React, {useCallback} from 'react'
import {LinearGradient} from 'expo-linear-gradient'
import {styles} from './styles'

import Choice from "../Choice"

import {ACTION_OFFSET} from '../utils/constants'

const Card = ({date, source, isFirst, isFavorite, swipe, tiltSign, ...rest}) =>{


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

const getDate = (unixTimestamp)=> {

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const monthsOfYear =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const getSuffix = (day)=> {
        if([1,21,31].includes(day)) return 'st'
        else if([2,22].includes(day)) return 'nd'
        else if([3,23].includes(day)) return 'rd'
        else return 'th'
    }

    let date = new Date(unixTimestamp * 1000)
    let dayOfMonth = date.getDate()
    let dayOfWeek = daysOfWeek[date.getDay()]
    let month = monthsOfYear[date.getMonth()]
    let year = date.getFullYear()
    let suffix = getSuffix(dayOfMonth)

     return (`${dayOfWeek}, ${dayOfMonth}${suffix} ${month} ${year}`)
    
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
        <Text style={styles.name}>{date}</Text>

        {
            isFirst && renderChoice()
        }

    </Animated.View>
)
}



export default Card