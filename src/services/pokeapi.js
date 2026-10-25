// Concepto visto en clase
import { normalizeQuery } from '../utils/format';
import { BASE_URL, ARTWORK_URL } from '../config/api';

// Concepto visto en clase
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Concepto visto en clase
export function getIdFromUrl(url) {
  const parts = url.split('/').filter(Boolean);
  return Number(parts[parts.length - 1]);
}

export function getArtworkUrl(id) {
  return `${ARTWORK_URL}/${id}.png`;
}

// Concepto visto en clase
async function request(path) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`);
  } catch (error) {
    throw new ApiError('Network error', 0);
  }

  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}`, response.status);
  }

  return response.json();
}

// Concepto visto en clase
export async function getPokemonList(offset = 0, limit = 20) {
  const data = await request(`/pokemon?limit=${limit}&offset=${offset}`);

  return {
    results: data.results.map((item) => {
      const id = getIdFromUrl(item.url);
      return { id, name: item.name, imageUrl: getArtworkUrl(id) };
    }),
    hasMore: data.next !== null,
  };
}

// Concepto visto en clase
export async function getPokemon(nameOrId) {
  const query = normalizeQuery(nameOrId);

  if (!query) throw new ApiError('Empty search', 404);

  const data = await request(`/pokemon/${query}`);

  return {
    id: data.id,
    name: data.name,
    heightM: data.height / 10,
    weightKg: data.weight / 10, 
    imageUrl:
      data.sprites?.other?.['official-artwork']?.front_default ?? getArtworkUrl(data.id),
    types: data.types.map((t) => t.type.name),
    stats: data.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
  };
}