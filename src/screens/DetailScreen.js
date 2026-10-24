import { useCallback, useEffect, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPokemon } from '../services/pokeapi';
import StatusView from '../components/statusView';
import TypeBadge from '../components/TypeBadge';
import StatBar from '../components/StatBar';
import { TYPE_COLORS } from '../theme/typeColors';
import { capitalize, padId } from '../utils/format';

export default function DetailScreen({pokemonId, onBack}){
    const [pokemon, setPokemon] = useState(null);
    const [status, setStatus] = useState('loanding');

    const loadPokemon = useCallback (async () => {
        setStatus('loanding');
        try{
            const data = await getPokemon(pokemonId);
            setPokemon(data);
            setStatus('succes');
        } catch (error) {
            setStatus('error');
        }
    }, [pokemonId]);

    useEffect(() => {
        loadPokemon();
    },[loadPokemon]);

    const mainColor = pokemon ? TYPE_COLORS[pokemon.types[0]]: undefined;
    
    return (
        <SafeAreaView style={styles.container}>
            {status === 'loading' && <StatusView type='loading' message='Cargando ficha...' />}
            {status === 'error' && <StatusView type='error' onRetry={loadPokemon}/>}
            {status === 'success' && pokemon && (
                <ScrollView contentContainerStyle={styles.content}>
                    <Image source={{uri: pokemon.imageUrl}} style={styles.image}/>
                    <Text style={styles.id}>#{padId(pokemon.id)}</Text>
                    <Text style={styles.name}>{capitalize(pokemon.name)}</Text>

                    <View style={styles.badges}>
                        {pokemon.types.map((type) => (
                            <TypeBadge key={type} type={type} />
                        ))};
                    </View>

                    <View style={styles.measure}>
                        <Text style={styles.measure}>Altura: {pokemon.heightM.toFixed(1)} m</Text>
                        <Text style={styles.measure}>Peso: {pokemon.weightKg.toFixed(1)} kg</Text>
                    </View>

                    <Text style={styles.sectionTitle}>Estadisticas base</Text>
                    <View style={styles.stats}>
                        {pokemon.stats.map((stats) =>(
                            <StatBar key={stats.name} name={stats.name} value={stats.value} color={mainColor}/>
                        ))};
                    </View>
                </ScrollView>
            )};

            <View style={styles.footer}>
                <Button title='Voler a la lista' onPress={onBack}/>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F8',
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
        marginButtom: 12,
    },

    badges: {
        flexDirection: 'row',
        gap: 8,
    },

    measures: {
        flexDirection: 'row',
        gap: 24,
        marginTop: 16,
    },
    
    measure: {
        fontSize: 16,
    },

    sectionTitle: {
        alignSelf: 'flex-start',
        fontSize: 18,
        fontWeight: '700',
        marginTop: 24,  
    },

    stats: {
        alignSelf: 'stretch', 
        marginTop: 8,
    },

    footer: {
        padding: 12
    },
});