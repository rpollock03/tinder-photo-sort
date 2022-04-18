import React, {useState, useRef} from "react"
import {View, Animated, PanResponder} from "react-native"
import {pets as petsArray} from './data'

import {styles} from './styles'

import Footer from '../Footer'
import Card from "../Card"


const Main = () => {

    const [pets, setPets] = useState(petsArray)

    const swipe = useRef(new Animated.ValueXY({x:0, y:0})).current
    
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (event,gesture) => {
            swipe.setValue({x: gesture.dx, y: gesture.dy})
        },
        onPanResponderRelease: (event, gesture) => {
            Animated.spring(swipe, {
                toValue: {
                    x:0,
                    y:0
                }, 
                useNativeDriver: true,
                friction: 5
            }).start()
        }
    })

    return (
        <View style={styles.container}>
            {pets.map(({name, source}, index)=>{
                
                const isFirst = index==0
                const dragHandlers = isFirst ? panResponder.panHandlers : {}
                
                return <Card 
                        key = {name}
                        name = {name}
                        source={source}
                        isFirst={isFirst}
                        swipe={swipe}
                      //  x={swipe.x}
                     //   y={swipe.y}
                        {...dragHandlers}
                    />   
            }).reverse()}

            <Footer/>
        </View>
    )
}


export default Main