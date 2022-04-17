import React, {useState} from "react"
import {View} from "react-native"
import {pets as petsArray} from './data'

import Card from "../Card"

const Main = () => {

    const [pets, setPets] = useState(petsArray)

    return (
        <View>
            {pets.map(({name, source})=>{
                return <Card 
                        key = {name}
                        name = {name}
                        source={source}
                    />   
            }).reverse()}
        </View>
    )
}


export default Main