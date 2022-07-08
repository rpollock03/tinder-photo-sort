import React from 'react'
import {View} from 'react-native'
import RoundButton from '../RoundButton'
import { COLORS } from '../utils/constants'

import {styles} from './styles'

const Footer = ({handleChoice}) => {

    return (<View style={styles.container}>
        <RoundButton name='times' size={40} color={COLORS.delete} onPress={()=> handleChoice(-1)}/>
        <RoundButton name='heart' size={34} color={COLORS.keep} onPress={()=> handleChoice(1)}/>
        <RoundButton name='times' size={40} color={COLORS.delete} onPress={()=> console.log('button')}/>
        <RoundButton name='heart' size={34} color={COLORS.keep} onPress={()=> console.log('button')}/>
    </View>)
}

export default Footer