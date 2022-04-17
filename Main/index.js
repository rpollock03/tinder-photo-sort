import React, {useState} from "react"
import {View} from "react-native"
import {pets as petsArray} from './data'

import {styles} from './styles'

import Card from "../Card"

const Main = () => {

    const [pets, setPets] = useState(petsArray)

    return (
        <View style={styles.container}>
            {pets.map(({name, source}, index)=>{
                
                const isFirst = index==0
                
                return <Card 
                        key = {name}
                        name = {name}
                        source={source}
                        isFirst={isFirst}
                    />   
            }).reverse()}
        </View>
    )
}


export default Main