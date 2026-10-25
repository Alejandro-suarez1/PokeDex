// Concepto visto en clase
import { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPokemon, getPokemonList } from '../services/pokeapi';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import StatusView from '../components/StatusView';

const PAGE_SIZE = 20;

// Concepto visto en clase
export default function ListScreen({ onSelect }) {
  const [pokemons, setPokemons] = useState([]);
  const [status, setStatus] = useState('loading'); 
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState('');
  const [notFound, setNotFound] = useState(false);

  const loadingMoreRef = useRef(false);

  // Concepto visto en clase
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

  // Concepto visto en clase
  useEffect(() => {
    loadFirstPage();
  }, []);

  const loadMore = async () => {
    if (loadingMoreRef.current || !hasMore || status !== 'success') return;

    // Concepto visto en clase
    loadingMoreRef.current = true;
    setLoadingMore(true);
    try {
      const data = await getPokemonList(pokemons.length, PAGE_SIZE);
      setPokemons((previous) => {
        const existingIds = new Set(previous.map((p) => p.id));
        const news = data.results.filter((p) => !existingIds.has(p.id));
        return [...previous, ...news];
      });
      setHasMore(data.hasMore);
    } catch (error) {
    } finally {
      loadingMoreRef.current = false;
      setLoadingMore(false);
    }
  };

  // Concepto visto en clase
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

  // Concepto visto en clase
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

// Concepto visto en clase
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f8' },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginTop: 8 },
  list: { paddingHorizontal: 6, paddingBottom: 12 },
  footer: { marginVertical: 16 },
});