<script lang="ts">
	import { searchTerm } from '../lib/store/searchStore';
	import { onMount } from 'svelte';

	// Definir el tipo de las partes
	interface Part {
		id: number;
		name: string;
		category: string;
		price: number;
		brand: string;
		condition: string;
	}

	// Lista de partes
	let parts: Part[] = [];
	let loading = true;
	let error: string | null = null;

	// Paginación
	let currentPage = 1;
	const partsPerPage = 9;

	// Filtros
	let selectedCategory: string = '';
	let selectedBrand: string = '';
	let minPrice: number | null = null;
	let maxPrice: number | null = null;
	let selectedCondition: string = '';

	// Listas de opciones para los filtros
	$: categories = [...new Set(parts.map((part) => part.category))];
	$: brands = [...new Set(parts.map((part) => part.brand))];
	$: conditions = [...new Set(parts.map((part) => part.condition))];

	// Cargar las partes desde el archivo JSON
	onMount(async () => {
		try {
			const response = await fetch('/parts.json');
			if (!response.ok) {
				throw new Error('Error al cargar las partes');
			}
			parts = await response.json();
		} catch (err) {
			error = err instanceof Error ? err.message : 'Ocurrió un error al cargar las partes';
		} finally {
			loading = false;
		}
	});

	// Lista filtrada de partes
	$: filteredParts = parts.filter((part) => {
		const matchesSearch = part.name.toLowerCase().includes($searchTerm.toLowerCase());
		const matchesCategory = selectedCategory ? part.category === selectedCategory : true;
		const matchesBrand = selectedBrand ? part.brand === selectedBrand : true;
		const matchesPrice =
			(minPrice === null || part.price >= minPrice) &&
			(maxPrice === null || part.price <= maxPrice);
		const matchesCondition = selectedCondition ? part.condition === selectedCondition : true;

		return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesCondition;
	});

	// Partes a mostrar en la página actual
	$: paginatedParts = filteredParts.slice(
		(currentPage - 1) * partsPerPage,
		currentPage * partsPerPage
	);

	// Número total de páginas
	$: totalPages = Math.ceil(filteredParts.length / partsPerPage);

	// Funciones para la paginación
	function goToPage(page: number) {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
		}
	}

	// Función para limpiar los filtros
	function clearFilters() {
		selectedCategory = '';
		selectedBrand = '';
		minPrice = null;
		maxPrice = null;
		selectedCondition = '';
		currentPage = 1; // Resetear la paginación
	}

	let isAddPartModalOpen = false;
	let newPart = { name: '', category: '', price: 0, brand: '', condition: '' };

	function addNewPart() {
		console.log('Nueva parte:', newPart);
		// Aquí podrías enviar newPart a una API o base de datos
		parts = [...parts, { ...newPart, id: parts.length + 1 }];
		isAddPartModalOpen = false;
		newPart = { name: '', category: '', price: 0, brand: '', condition: '' };
	}
</script>

<div class="flex flex-col md:flex-row gap-4 p-4">
	<!-- Panel de Filtros -->
	<aside class="w-full md:w-1/4 bg-gray-800 p-4 rounded-lg">
		<h2 class="text-2xl font-bold text-white mb-4">Filtros</h2>

		<!-- Filtro de Categoría -->
		<div class="mb-4">
			<label for="category" class="block text-sm font-medium text-white mb-1">Categoría</label>
			<select
				id="category"
				bind:value={selectedCategory}
				class="w-full bg-gray-700 text-white border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
			>
				<option value="">Selecciona una categoría</option>
				{#each categories as category}
					<option value={category}>{category}</option>
				{/each}
			</select>
		</div>

		<!-- Filtro de Marca -->
		<div class="mb-4">
			<label for="brand" class="block text-sm font-medium text-white mb-1">Marca</label>
			<select
				id="brand"
				bind:value={selectedBrand}
				class="w-full bg-gray-700 text-white border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
			>
				<option value="">Selecciona una marca</option>
				{#each brands as brand}
					<option value={brand}>{brand}</option>
				{/each}
			</select>
		</div>

		<!-- Filtro de Rango de Precios -->
		<div class="mb-4">
			<label class="block text-sm font-medium text-white mb-1">Rango de Precios</label>
			<div class="flex space-x-2">
				<input
					type="number"
					placeholder="Mínimo"
					bind:value={minPrice}
					class="w-1/2 bg-gray-700 text-white border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
				/>
				<input
					type="number"
					placeholder="Máximo"
					bind:value={maxPrice}
					class="w-1/2 bg-gray-700 text-white border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
				/>
			</div>
		</div>

		<!-- Filtro de Estado -->
		<div class="mb-4">
			<label for="condition" class="block text-sm font-medium text-white mb-1">Estado</label>
			<select
				id="condition"
				bind:value={selectedCondition}
				class="w-full bg-gray-700 text-white border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
			>
				<option value="">Selecciona un estado</option>
				{#each conditions as condition}
					<option value={condition}>{condition}</option>
				{/each}
			</select>
		</div>

		<!-- Botones de Filtrar y Limpiar -->
		<div class="flex space-x-2 mb-4">
			<button
				class="btn bg-white text-gray-800 rounded-lg px-4 py-2 flex-1"
				on:click={() => (currentPage = 1)}
			>
				Filtrar
			</button>
			<button
				class="btn bg-gray-600 text-white rounded-lg px-4 py-2 flex-1"
				on:click={clearFilters}
			>
				Limpiar
			</button>
		</div>

		<!-- Botón de Agregar Nueva Parte -->
		<button
			class="btn bg-green-500 text-white rounded-lg px-4 py-2 w-full"
			on:click={() => (isAddPartModalOpen = true)}
		>
			+ Agregar Nueva Parte
		</button>
		<!-- Modal para agregar nueva parte -->
		{#if isAddPartModalOpen}
			<div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
				<div class="card p-6 w-full max-w-md bg-gray-800 text-white rounded-lg shadow-lg">
					<header class="flex justify-between items-center mb-4">
						<h2 class="text-2xl font-bold">Agregar Nueva Parte</h2>
						<button
							class="btn variant-ghost rounded-full w-8 h-8 flex items-center justify-center"
							on:click={() => (isAddPartModalOpen = false)}
							aria-label="Cerrar modal"
						>
							<span class="text-lg">×</span>
						</button>
					</header>

					<form on:submit|preventDefault={addNewPart}>
						<div class="mb-4">
							<label for="name" class="block mb-1 text-sm font-medium">Nombre</label>
							<input
								id="name"
								type="text"
								bind:value={newPart.name}
								class="w-full bg-gray-700 text-white border-gray-600 rounded-lg py-2 px-3"
								required
							/>
						</div>
						<div class="mb-4">
							<label for="category" class="block mb-1 text-sm font-medium">Categoría</label>
							<input
								id="category"
								type="text"
								bind:value={newPart.category}
								class="w-full bg-gray-700 text-white border-gray-600 rounded-lg py-2 px-3"
								required
							/>
						</div>
						<div class="mb-4">
							<label for="price" class="block mb-1 text-sm font-medium">Precio</label>
							<input
								id="price"
								type="number"
								bind:value={newPart.price}
								class="w-full bg-gray-700 text-white border-gray-600 rounded-lg py-2 px-3"
								required
							/>
						</div>
						<div class="mb-4">
							<label for="brand" class="block mb-1 text-sm font-medium">Marca</label>
							<input
								id="brand"
								type="text"
								bind:value={newPart.brand}
								class="w-full bg-gray-700 text-white border-gray-600 rounded-lg py-2 px-3"
								required
							/>
						</div>
						<div class="mb-4">
							<label for="condition" class="block mb-1 text-sm font-medium">Estado</label>
							<select
								id="condition"
								bind:value={newPart.condition}
								class="w-full bg-gray-700 text-white border-gray-600 rounded-lg py-2 px-3"
								required
							>
								<option value="">Selecciona un estado</option>
								<option value="Nuevo">Nuevo</option>
								<option value="Usado">Usado</option>
							</select>
						</div>
						<div class="flex justify-end space-x-2">
							<button
								type="button"
								class="btn bg-gray-600 text-white rounded-full px-4 py-2"
								on:click={() => (isAddPartModalOpen = false)}
							>
								Cancelar
							</button>
							<button type="submit" class="btn bg-green-500 text-white rounded-full px-4 py-2">
								Agregar
							</button>
						</div>
					</form>
				</div>
			</div>
		{/if}
	</aside>

	<!-- Lista de Partes -->
	<main class="w-full md:w-3/4 p-4">
		<h1 class="h1 mb-4">Inventario de Partes</h1>

		{#if loading}
			<p class="text-gray-500">Cargando partes...</p>
		{:else if error}
			<p class="text-red-500">{error}</p>
		{:else if filteredParts.length === 0}
			<p class="text-gray-500">No se encontraron partes.</p>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each paginatedParts as part}
					<div class="card p-4 bg-gray-800 text-white rounded-lg shadow-md">
						<h2 class="h3">{part.name}</h2>
						<p>Categoría: {part.category}</p>
						<p>Marca: {part.brand}</p>
						<p>Precio: ${part.price.toFixed(2)}</p>
						<p>Estado: {part.condition}</p>
					</div>
				{/each}
			</div>

			<!-- Controles de paginación -->
			<div class="flex justify-center mt-6 space-x-2">
				<button
					class="btn variant-filled-primary"
					on:click={() => goToPage(currentPage - 1)}
					disabled={currentPage === 1}
				>
					Anterior
				</button>
				<span class="flex items-center">
					Página {currentPage} de {totalPages}
				</span>
				<button
					class="btn variant-filled-primary"
					on:click={() => goToPage(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					Siguiente
				</button>
			</div>
		{/if}
	</main>
</div>
