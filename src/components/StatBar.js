// Concepto visto en clase
import { StyleSheet, Text, View } from 'react-native';

const MAX_STAT = 255;

// Concepto visto en clase
const STAT_LABELS = {
    hp: 'PS',
    attack: 'Ataque',
    defense: 'Defensa', 'special-attack': 'At. especial', 'special-defense': 'Def. especial',
    speed: 'Velocidad',
};

export default function StatBar ({name, value, color='#6390F0'}){
    const widthPercent = Math.min((value / MAX_STAT) * 100, 100);
    return (
        <View style={styles.row}>
            <Text style={styles.label}>{STAT_LABELS[name] ?? name}</Text>
            <Text style={styles.value}>{value}</Text>
            <View style={styles.track}>
                <View style={[styles.fill, {width: `${widthPercent}%`, backgroundColor: color}]}/>
            </View>
        </View>
    );
};

// Concepto visto en clase
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },

    label: {
        width: 100,
        fontSize: 14, 
        color: '#444',
    },

    value: {
        width: 36, 
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'right',
        marginRight: 10,
    },

    track: {
        flex: 1,
        height: 12,
        backgroundColor: '#E3E3EA',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#000',
        overflow: 'hidden',
    },

    fill: {
        height: '100%',
        borderRadius: 5,
    },
})