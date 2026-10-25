// Concepto visto en clase
import { useCallback, useEffect, useState } from 'react';
import { Pressable, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPokemon } from '../services/pokeapi';
import StatusView from '../components/StatusView';
import TypeBadge from '../components/TypeBadge';
import StatBar from '../components/StatBar';
import { TYPE_COLORS } from '../theme/typeColors';
import { capitalize, padId } from '../utils/format';

// Concepto visto en clase
export default function DetailScreen({pokemonId, onBack}){
    const [pokemon, setPokemon] = useState(null);
    const [status, setStatus] = useState('loading');

    // Concepto visto en clase
    const loadPokemon = useCallback (async () => {
        setStatus('loading');
        try{
            const data = await getPokemon(pokemonId);
            setPokemon(data);
            setStatus('success');
        } catch (error) {
            setStatus('error');
        }
    }, [pokemonId]);

    // Concepto visto en clase
    useEffect(() => {
        loadPokemon();
    },[loadPokemon]);

    const mainColor = pokemon ? TYPE_COLORS[pokemon.types[0]]: undefined;
    
    return (
        <SafeAreaView style={styles.container}>
            {status === 'loading' && <StatusView type='loading' message='Cargando ficha...' />}
            {status === 'error' && <StatusView type='error' onRetry={loadPokemon}/>}
            {status === 'success' && pokemon && (
                <ScrollView style={{ flex: 1, alignSelf: 'stretch' }} contentContainerStyle={styles.content}>
                    <Image source={{uri: pokemon.imageUrl}} style={styles.image}/>
                    <Text style={styles.id}>#{padId(pokemon.id)}</Text>
                    <Text style={styles.name}>{capitalize(pokemon.name)}</Text>

                    <View style={styles.badges}>
                        {pokemon.types.map((type) => (
                            <TypeBadge key={type} type={type} />
                        ))}
                    </View>

                    <View style={styles.measures}>
                        <Text style={styles.measure}>Altura: {pokemon.heightM.toFixed(1)} m</Text>
                        <Text style={styles.measure}>Peso: {pokemon.weightKg.toFixed(1)} kg</Text>
                    </View>

                    <Text style={styles.sectionTitle}>Estadísticas base</Text>
                    <View style={styles.stats}>
                        {pokemon.stats.map((stats) =>(
                            <StatBar key={stats.name} name={stats.name} value={stats.value} color={mainColor}/>
                        ))}
                    </View>
                </ScrollView>
            )}

            <View style={styles.footer}>
                <Pressable style={styles.button} onPress={onBack}>
                    <Text style={styles.buttonText}>Volver a la lista</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

// Concepto visto en clase
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    content: {
        alignItems: 'center',
        padding: 16,
    },

    image: {
        width: 220,
        height: 220,
    },

    id: {
        color: '#888',
        fontSize: 16,
        marginTop: 8,
    },

    name: {
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 12,
    },

    badges: {
        flexDirection: 'row',
        gap: 8,
    },

    measures: {
        marginTop: 16,
    },
    
    measure: {
        paddingVertical: 2,
        fontSize: 16,
        fontWeight: 'bold',
    },

    sectionTitle: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: '700',
        marginTop: 22,
    },

    stats: {
        alignSelf: 'stretch', 
        marginTop: 8,
    },

    footer: {
        padding: 12,
    },

    button: {
        backgroundColor: '#4F5660',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});