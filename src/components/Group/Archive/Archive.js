import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    TouchableWithoutFeedback,
    StatusBar,
    Platform,
} from "react-native";
// import Back from '../../../../assets/images/back.png'
import BackLeft from '../../../../assets/images/arrow-left.png'
import { isActive } from "../../../redux/slices/otherFuncSlice";
import { useDispatch } from "react-redux";

export const Archive = ({setIsActiveArchive, navigation}) => {
    const dispatch = useDispatch()
    // const handleEmptyAreaPress = () => {
    //     dispatch(isActive(false))
    // }
    return (
        <SafeAreaView style={[styles.container, Platform.OS === 'android' ? {paddingTop: 50} : {}]}>
            <StatusBar
                translucent
                barStyle='dark-content'
            />
            <View style={styles.wrapper}>
                <View style={styles.navWrapper}>
                    <View style={styles.backWrapper}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image style={styles.backImg} source={BackLeft} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>В архиве можно хранить переписки</Text>
                </View>
                <>
                    <TouchableWithoutFeedback>
                        <View>

                        </View>
                    </TouchableWithoutFeedback>
                </>
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
    },
    navWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
    },
    backImg: {
        width: 40,
        height: 40,
    },
    backWrapper: {
        position: 'absolute',
        top: -7,
        left: 0,
        width: 40,
        height: 40,
    },
    title: {
        position: 'relative',
        fontSize: 18
    },
})