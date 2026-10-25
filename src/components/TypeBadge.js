// Concepto visto en clase
import { StyleSheet, Text, View } from 'react-native';
import {DEFAULT_TYPE_COLORS, TYPE_COLORS, TYPE_LABELS } from '../theme/typeColors';
import { capitalize } from '../utils/format';

export default function TypeBadge ({type}){
    const color = TYPE_COLORS[type] ?? DEFAULT_TYPE_COLORS;
    const label = TYPE_LABELS[type] ?? capitalize(type);

    return (
        <View style={[styles.badge, {backgroundColor: color }]}>
            <Text style={styles.text}>{label}</Text>
        </View>
    );
};

// Concepto visto en clase
const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 16,
        borderColor: '#000',
        borderWidth: 1,
    },

    text: {
        color: '#fff',
        fontWeight: '600',
    },
});