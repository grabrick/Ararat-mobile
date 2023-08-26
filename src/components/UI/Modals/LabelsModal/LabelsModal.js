import { 
    View,
    Text, 
    StyleSheet, 
    Image, 
    Button, 
    TextInput, 
    TouchableOpacity, 
    Modal } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import img1 from '../../../../../assets/images/Group613.png'
import smile from '../../../../../assets/images/smile.png'

export const LabelsModal = ({ isActive, setIsActive }) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalView}>
                    <View style={styles.content}>
                        <Text style={styles.text}>Добавить новый ярлык</Text>
                        <View style={styles.inputWrapper}>
                            <Image style={styles.img} source={img1} />
                            <View style={styles.inputWrap}>
                            <TextInput 
                                placeholder="Новый ярлык" 
                                style={styles.input}
                            />
                            <Image style={styles.smile} source={smile} />
                            </View>
                        </View>
                        <View style={styles.buttonWrapper}>
                            <LinearGradient
                                colors={['rgba(51, 51, 51, 0.85)', '#000', '#333', '#333', '#000']}
                                locations={[0, 0.0771, 0.4937, 0.749, 1]}
                                start={[0, 1]}
                                end={[0, 0]}
                                style={styles.saveButton}
                            >
                                <Button color='#FFFFFF' onPress={() => setIsActive(!isActive)} title="Отмена" style={styles.button}></Button>
                            </LinearGradient>
                            <LinearGradient
                                colors={['rgba(183, 151, 90, 0.85)', '#8A6E3E', '#E7C173', '#E7C173', '#8A6E3E']}
                                locations={[0, 0.0771, 0.4937, 0.7333, 1]}
                                start={[0, 1]}
                                end={[0, 0]}
                                style={styles.saveButton}
                            >
                                <Button color='#353535' title="Сохранить" style={styles.button}></Button>
                            </LinearGradient>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        width: '100%',
        height: '95%',
        marginTop: 20,
        position: 'absolute',
        marginLeft: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.77)'
    },
    saveButton: {
        borderRadius: 50,
        width: 130,
    },
    inputWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    smile: {
        width: 40,
        height: 40,
    },
    input: {
        width: 150,
        borderBottomColor: '#CCC',
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        backgroundColor: 'transparent',
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
        borderWidth: 2,
        fontSize: 16
    },
    img: {
        width: 50,
        height: 35
    },
    inputWrapper: {
        flexDirection: 'row',
        gap: 30,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    buttonWrapper: {
        // width: 250,
        gap: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },  
    content: {
        backgroundColor: '#fff',
        borderColor: '#C1A470',
        alignItems: 'center',
        // width: 300,
        borderWidth: 2,
        borderRadius: 20,
        padding: 20,
    },
    modalView: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 30,
        left: 0,
        right: 0,
        bottom: 0,
    },
    text: {
        fontSize: 18,
    }
})