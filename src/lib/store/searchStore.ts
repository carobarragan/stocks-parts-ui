import { writable } from 'svelte/store';

// Store para el término de búsqueda
export const searchTerm = writable<string>('');
