import {View, Text, Image} from 'react-native'

import {styles} from './styles'

const Card = ({name, source}) =>{

return (
    <View style ={styles.container}>
        <Image source = {source} style = {styles.image}/>
        <Text>{name}</Text>
    </View>
)
}



export default Card