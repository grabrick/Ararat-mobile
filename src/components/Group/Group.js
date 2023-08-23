import { View, StyleSheet } from "react-native"
import { AllChat } from "./AllChat/AllChat"
import { Search } from "../UI/Search/Search";


export const Group = () => {
    return (
        <View style={styles.container}>
            <Search />
            <AllChat />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    text: {
        color: '#fff'
    }
});