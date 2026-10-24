import { StyleSheet, Text, View } from 'react-native';
import { DEFATUL_TYPE_COLORS, TYPE_COLORS, TYPE_COLORS, TYPE_LABELS } from '../theme/typeColors';
import { capitalize } from '../utils/format';

export default function TypeBadge ({type}){
    const color = TYPE_COLORS[type] ?? DEFATUL_TYPE_COLORS;
    const label = TYPE_LABELS[type] ?? capitalize(type);

    return (
        <View style={[StyleSheet.badge, {backgroundColor: color }]}>
            <Text style={styles.text}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 16,
    },

    text: {
        color: '#fff',
        fontWeight: '600',
    },
});