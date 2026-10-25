// Concepto visto en clase
import { ActivityIndicator, Button, StyleSheet, View, Text } from 'react-native';

export default function StatusView({ type, message, onRetry }){
    return (
        <View style={styles.container}>
            {type === 'loading' && (
                <>
                    <ActivityIndicator size="large" />
                    <Text style={styles.text}>{message ?? 'Cargando...'}</Text>
                </>
            )}

            {type === 'error' && (
                <>
                    <Text style={styles.text}>
                        {message ?? 'No se pudo cargar la información'}
                    </Text>
                    <Button title='Reintentar' onPress={onRetry} color='#4F5660'/>
                </>
            )}

            {type === 'empty' && (
                <Text style={styles.text}>{message ?? 'No se encontró ningun Pokémon'}</Text>
            )}
        </View>
    );
};

// Concepto visto en clase
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        gap: 12,
    },

    text: {
        fontSize: 16,
        textAlign: 'center',
    },
});