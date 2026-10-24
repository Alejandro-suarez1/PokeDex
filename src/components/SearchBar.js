import { Button, StyleSheet, TextInput, View } from 'react-native';

export default function SearchBar({ value, onChangeText, onSubmit }){
    return(
        <View style= {styles.container}>
            <TextInput style={styles.input} value={value} onChangeText={onChangeText} onSubmitEditing={onSubmit} placeholder='Buscar por nombre...' autoCorrect={false}/>
            <Button title='Buscar' onPress={onSubmit}/>
        </View>   
    );
};

const styles = StyleSheet.create ({
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
        borderColor: '#ddd',
    },
});