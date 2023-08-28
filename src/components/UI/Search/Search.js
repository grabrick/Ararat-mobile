import { Image, View, TextInput, StyleSheet, SafeAreaView, Button } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import SearchLoop from '../../../../assets/images/Search.png'
import { openedChatCheck } from "../../../redux/slices/contextMenuSlice";
import { useDispatch } from "react-redux";

export const Search = ({setCategoryActive, categoryActive}) => {
    const dispatch = useDispatch()
    const dump = () => {
        dispatch(openedChatCheck(false))
    }
    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <View style={styles.container}>
                <LinearGradient
                    colors={['#CCC', '#FFF', '#C8C8C8', '#FFF', '#C4C4C4']}
                    locations={[0, 0.2292, 0.5208, 0.7813, 1]}
                    start={[0.5, 0]}
                    end={[0.5, 1]}
                    style={styles.LinearGradient}
                >
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                        />
                        <Image style={styles.img} source={SearchLoop} />
                    </View>

                    <View style={styles.buttonWrapper}>
                        <LinearGradient
                            colors={categoryActive === "Чат"
                            ? ['rgba(183, 151, 90, 0.85)', '#8A6E3E', '#E7C173', '#E7C173', '#8A6E3E']
                            : ['rgba(51, 51, 51, 0.85)', '#000', '#333', '#333', '#000']
                            }
                            locations={categoryActive === "Чат" ? [0, 0.2292, 0.5208, 0.7813, 1] : null}
                            start={[0, 1]}
                            end={[0, 0]}
                            style={styles.gradientButton}
                        >
                            <Button color={categoryActive === "Чат" ? '#353535' : '#FFFFFF' } onPress={() => setCategoryActive("Чат")} title="Чат" style={styles.button}></Button>
                        </LinearGradient>
                        <LinearGradient
                            colors={categoryActive === "Звонки"
                            ? ['rgba(183, 151, 90, 0.85)', '#8A6E3E', '#E7C173', '#E7C173', '#8A6E3E']
                            : ['rgba(51, 51, 51, 0.85)', '#000', '#333', '#333', '#000'] 
                            }
                            locations={categoryActive === "Звонки" ? [0, 0.0771, 0.4937, 0.749, 1] : null}
                            start={[0, 1]}
                            end={[0, 0]}
                            style={styles.gradientButton}
                        >
                            <Button color={categoryActive === "Звонки" ? '#353535' : '#FFFFFF' } onPress={() => {setCategoryActive("Звонки"); dump()}} title="Звонки" style={styles.button}></Button>
                        </LinearGradient>
                    </View>
                </LinearGradient>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    SafeAreaView: {
        // flex: 1,
    },
    container: {
        // flex: 1,
    },
    LinearGradient: {
        // width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10,
        // height: 80,
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center'
    },
    inputWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        paddingRight: 10,
        backgroundColor: '#fff',
        gap: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10
    },
    button: {
        width: 150,
    },
    gradientButton: {
        width: 160,
        borderRadius: 20
    },
    buttonWrapper: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
    },
    input: {
        backgroundColor: '#fff',
        flex: 1,
        // margin: 10,
        padding: 7,
        fontSize: 15,
        borderRadius: 10
    },
    img: {
        width: 20,
        height: 20
    }
});