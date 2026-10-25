// Concepto visto en clase
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { capitalize, padId } from '../utils/format';

// Concepto visto en clase
export default function PokemonCard({ pokemon, onPress }) {
    return ( 
        <Pressable style={styles.card} onPress={() => onPress(pokemon)}>
            <Image source={{ uri: pokemon.imageUrl }} style={styles.image}/>
            <Text style={styles.id}>#{padId(pokemon.id)}</Text>
            <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
        </Pressable>
    );
};

// Concepto visto en clase
const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 6,
        padding: 12,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#000',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },

    image: {
        width: 110,
        height: 110,
    },

    id: {
        marginTop: 6,
        color: '#888',
        fontSize: 12,
    },

    name: {
        fontSize: 16,
        fontWeight: '600',
    },
});