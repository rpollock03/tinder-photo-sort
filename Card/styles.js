import {StyleSheet} from 'react-native'
import {CARD} from '../utils/constants'


export const styles = StyleSheet.create({
    container: {
        position: 'absolute'
    },
    image:{
        width: CARD.WIDTH,
        height: CARD.HEIGHT,
        borderRadius: CARD.BORDER_RADIUS
    }


})