import { StyleSheet, Text, View } from 'react-native';

const MAX_STAT = 255;

const STAT_LABELS = {
    hp: 'PS',
    attack: 'Attack',
    defense: 'Defense', 'special-attack': 'Att. especial', 'special-defense': 'Def. especial',
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

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
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
        height: 10,
        backgroundColor: '#E3E3EA',
        borderRadius: 5,
        overflow: 'hidden',
    },

    fill: {
        height: '100%',
        borderRadius: 5,
    },
})