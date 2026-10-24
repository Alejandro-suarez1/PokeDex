import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPokemon, getPokemonList } from '../services/pokeapi';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import StatusView from '../components/StatusView';

const PAGE_SIZE = 20;

export default function ListScreen({ onSelect }) {
  const [pokemons, setPokemons] = useState([]);
  const [status, setStatus] = useState('loading'); 
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState('');
  const [notFound, setNotFound] = useState(false);

  const loadFirstPage = async () => {
    setStatus('loading');
    try {
      const data = await getPokemonList(0, PAGE_SIZE);
      setPokemons(data.results);
      setHasMore(data.hasMore);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  useEffect(() => {
    loadFirstPage();
  }, []);

  const loadMore = async () => {
    if (loadingMore || !hasMore || status !== 'success') return;

    setLoadingMore(true);
    try {
      const data = await getPokemonList(pokemons.length, PAGE_SIZE);
      setPokemons((previous) => [...previous, ...data.results]);
      setHasMore(data.hasMore);
    } catch (error) {
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSearch = async () => {
    setNotFound(false);
    if (!query.trim()) return; 

    setStatus('loading');
    try {
      const pokemon = await getPokemon(query);
      setStatus('success');
      onSelect(pokemon.id);
    } catch (error) {
      if (error.status === 404) {
        setNotFound(true); 
        setStatus('success');
      } else {
        setStatus('error');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>PokéDex Explorer</Text>
      <SearchBar value={query} onChangeText={setQuery} onSubmit={handleSearch} />

      {status === 'loading' && <StatusView type="loading" message="Cargando Pokémon..." />}

      {status === 'error' && (
        <StatusView
          type="error"
          onRetry={pokemons.length === 0 ? loadFirstPage : handleSearch}
        />
      )}

      {status === 'success' && notFound && (
        <StatusView
          type="empty"
          message={`No encontramos ningún Pokémon con "${query.trim()}".`}
        />
      )}

      {status === 'success' && !notFound && (
        <FlatList
          data={pokemons}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          renderItem={({ item }) => (
            <PokemonCard pokemon={item} onPress={(pokemon) => onSelect(pokemon.id)} />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.list}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator style={styles.footer} size="large" /> : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f8' },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginTop: 8 },
  list: { paddingHorizontal: 6, paddingBottom: 12 },
  footer: { marginVertical: 16 },
});