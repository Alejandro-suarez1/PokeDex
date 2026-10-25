// Concepto visto en clase
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

// Concepto visto en clase
export default function SearchBar({ value, onChangeText, onSubmit }) {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} value={value} onChangeText={onChangeText} onSubmitEditing={onSubmit} placeholder='Buscar por nombre o número...' autoCapitalize='none' autoCorrect={false}/>
            <Pressable style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Buscar</Text>
            </Pressable>
        </View>
    );
}

// Concepto visto en clase
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        gap: 8,
    },

    input: {
        flex: 1,
        height: 42,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#000',
    },

    button: {
        backgroundColor: '#4F5660',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        borderColor: '#000',
        borderWidth: 1,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
}); 