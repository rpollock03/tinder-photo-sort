import { Dimensions } from 'react-native';


const { height, width } = Dimensions.get('screen')


export const CARD = {
    WIDTH: width * 0.9,
    HEIGHT: height * 0.78,
    BORDER_RADIUS: 20
}

export const COLORS = {
    like: '#00eda6',
    nope: '#ff006f'
}