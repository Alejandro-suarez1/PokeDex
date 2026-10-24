import { useState } from 'react';
import { View } from 'react-native';
import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';

export default function AppNavigator() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <>
     
      <View style={{ flex: 1, display: selectedId === null ? 'flex' : 'none' }}>
        <ListScreen onSelect={setSelectedId} />
      </View>

      {selectedId !== null && (
        <DetailScreen pokemonId={selectedId} onBack={() => setSelectedId(null)} />
      )}
    </>
  );
}