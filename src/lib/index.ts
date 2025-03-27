// place files you want to import through the `$lib` alias in this folder.

// Fetch parts from API
// src/lib/api.ts
export async function obtenerPartes() {
	const response = await fetch('http://127.0.0.1:3000/api/parts'); // Aquí pones la URL de tu backend

	if (!response.ok) {
		throw new Error('Error al obtener las partes');
	}
	const data = await response.json();
	return data;
}
