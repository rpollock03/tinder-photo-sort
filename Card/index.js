import {View, Text, Image} from 'react-native'
import React, {useCallback} from 'react'
import {LinearGradient} from 'expo-linear-gradient'
import {styles} from './styles'

import Choice from "../Choice"

const Card = ({name, source, isFirst}) =>{

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

return (
    <View style ={styles.container}>
        <Image source = {source} style = {styles.image}/>
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.9)']} style={styles.gradient} />
        <Text style={styles.name}>{name}</Text>

        {
            isFirst && renderChoice()
        }

    </View>
)
}



export default Card