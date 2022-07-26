import { Dimensions } from 'react-native';


const { height, width } = Dimensions.get('screen')


export const CARD = {
    WIDTH: width * 0.9,
    HEIGHT: height * 0.68, //0.78 is tinder dimension
    BORDER_RADIUS: 20,
    OUT_OF_SCREEN: width + 0.5 * width
}

export const COLORS = {
    keep: '#00eda6',
    delete: '#ff006f'
}

export const ACTION_OFFSET = 100