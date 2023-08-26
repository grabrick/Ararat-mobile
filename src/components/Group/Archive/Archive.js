import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
} from "react-native";
import Back from '../../../../assets/images/back.png'

export const Archive = ({setIsActiveArchive}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.navWrapper}>
                    <View style={styles.backWrapper}>
                        <TouchableOpacity onPress={() => setIsActiveArchive(false)}>
                            <Image style={styles.backImg} source={Back} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>В архиве можно хранить переписки</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    wrapper: {
        padding: 10,
        borderBottomColor: '#fff',
        borderBottomWidth: 2,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    navWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
    },
    backImg: {
        width: 30,
        height: 30,
    },
    backWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 30,
        height: 30,
    },
    title: {
        position: 'relative',
        fontSize: 18
    },
})