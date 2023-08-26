import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Modal } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';
import img1 from '../../../../assets/images/Group608.png'
import img2 from '../../../../assets/images/Group610.png'
import img3 from '../../../../assets/images/Group611.png'
import img4 from '../../../../assets/images/Group612.png'
import { useState } from "react";
import { LabelsModal } from "../Modals/LabelsModal/LabelsModal";



export const Labels = () => {
    const [isChecked, setChecked] = useState(false);
    const [isActive, setIsActive] = useState(false)
    const catalog = [
        { img: img1, title: 'Ярлык 1', isActive: false, id: 0 },
        { img: img2, title: 'Ярлык 2', isActive: false, id: 1 },
        { img: img3, title: 'Ярлык 3', isActive: false, id: 2 },
        { img: img4, title: 'Ярлык 4', isActive: false, id: 3 },
    ]
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.text}>Группа ярлыков</Text>
                <View style={styles.labels}>
                    {catalog.map((item, index) => (
                        <View key={index} style={styles.label}>
                            <View style={styles.nameWrapper}>
                                <Image style={styles.img} source={item.img} />
                                <Text>{item.title}</Text>
                            </View>
                            <Checkbox
                                style={styles.checkbox}
                                value={isChecked}
                                onValueChange={setChecked}
                                color={isChecked ? '#252525' : undefined}
                            />
                        </View>
                    ))}
                    <View style={styles.createWrapper}>
                        <TouchableOpacity onPress={() => setIsActive(true)}>
                            <LinearGradient
                                colors={['#CCC', '#FFF', '#CCC', '#FFF', '#C4C4C4']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.gradientButton}
                            >
                                <Text style={styles.button}>+</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <Text>Новый ярлык</Text>
                    </View>
                    <View style={styles.saveWrapper}>
                        <LinearGradient
                            colors={['rgba(51, 51, 51, 0.85)', '#000', '#333', '#333', '#000']}
                            locations={[0, 0.0771, 0.4937, 0.749, 1]}
                            start={[0, 1]}
                            end={[0, 0]}
                            style={styles.saveButton}
                        >
                            <Button color='#FFFFFF' title="Отмена" style={styles.button}></Button>
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
            {isActive && <LabelsModal isActive={isActive} setIsActive={setIsActive} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
    },
    wrapper: {
        maxWidth: 1000,
        marginTop: 20,
        borderColor: '#C1A470',
        borderWidth: 2,
        padding: 10,
        borderRadius: 20,
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
    },
    nameWrapper: {
        flexDirection: 'row',
        gap: 30,
        alignItems: 'center'
    },
    saveWrapper: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    createWrapper: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    saveButton: {
        width: 150,
        borderRadius: 10
    },
    button: {
        fontSize: 24,
    },
    gradientButton: {
        width: 30,
        height: 30,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16,
    },
    labels: {
        width: '100%',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    label: {
        marginBottom: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    img: {
        width: 60,
        height: 40
    },
})