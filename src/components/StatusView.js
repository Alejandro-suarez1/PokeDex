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
                        {message ?? 'No se pudo cargar la informacion'}
                    </Text>
                    <Button title='Reitentar' onPress={onRetry}/>
                </>
            )}

            {type === 'empty' && (
                <Text style={styles.text}>{message ?? 'No se encontro ningun Pokemon'}</Text>
            )}
        </View>
    );
};

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