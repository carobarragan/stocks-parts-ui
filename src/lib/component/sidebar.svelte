<script>
	let category = '';
	let brand = '';
	let minPrice = '';
	let maxPrice = '';
	let condition = '';
	let isSidebarOpen = false; // Para manejar el sidebar en pantallas pequeñas

	const categories = [
		{ value: 'motor', label: 'Motor' },
		{ value: 'suspension', label: 'Suspensión' },
		{ value: 'frenos', label: 'Frenos' },
		{ value: 'llantas', label: 'Llantas' },
		{ value: 'electricidad', label: 'Electricidad' },
		{ value: 'carroceria', label: 'Carrocería' }
	];

	const brands = [
		{ value: 'toyota', label: 'Toyota' },
		{ value: 'ford', label: 'Ford' },
		{ value: 'chevrolet', label: 'Chevrolet' },
		{ value: 'honda', label: 'Honda' }
	];

	const conditions = [
		{ value: 'nuevo', label: 'Nuevo' },
		{ value: 'usado', label: 'Usado' },
		{ value: 'reacondicionado', label: 'Reacondicionado' }
	];

	function applyFilters() {
		console.log('Filtros aplicados:', { category, brand, minPrice, maxPrice, condition });
	}

	function clearFilters() {
		category = '';
		brand = '';
		minPrice = '';
		maxPrice = '';
		condition = '';
	}
</script>

<!-- Botón para abrir el sidebar en pantallas pequeñas -->
<button class="md:hidden btn variant-filled m-4" on:click={() => (isSidebarOpen = true)}>
	Filtros
</button>

<!-- Sidebar -->
<div class="fixed inset-0 z-50 {isSidebarOpen ? 'block' : 'hidden'} md:block md:static md:w-64">
	<!-- Fondo oscuro para pantallas pequeñas -->
	<div
		class="fixed inset-0 bg-black bg-opacity-50 md:hidden"
		on:click={() => (isSidebarOpen = false)}
	></div>

	<!-- Contenido del sidebar -->
	<aside class="relative w-64 h-full p-4 bg-gray-800 text-white overflow-y-auto md:w-64">
		<h2 class="h2 mb-4">Filtros</h2>

		<!-- Categorías -->
		<div class="mb-4">
			<label for="category" class="block mb-1">Categoría</label>
			<select id="category" bind:value={category} class="input">
				<option value="">Selecciona una categoría</option>
				{#each categories as cat}
					<option value={cat.value}>{cat.label}</option>
				{/each}
			</select>
		</div>

		<!-- Marca -->
		<div class="mb-4">
			<label for="brand" class="block mb-1">Marca</label>
			<select id="brand" bind:value={brand} class="input">
				<option value="">Selecciona una marca</option>
				{#each brands as br}
					<option value={br.value}>{br.label}</option>
				{/each}
			</select>
		</div>

		<!-- Rango de precios -->
		<div class="mb-4">
			<label class="block mb-1">Rango de Precios</label>
			<div class="flex space-x-2">
				<input type="number" placeholder="Mínimo" bind:value={minPrice} class="input" />
				<input type="number" placeholder="Máximo" bind:value={maxPrice} class="input" />
			</div>
		</div>

		<!-- Estado -->
		<div class="mb-4">
			<label for="condition" class="block mb-1">Estado</label>
			<select id="condition" bind:value={condition} class="input">
				<option value="">Selecciona un estado</option>
				{#each conditions as cond}
					<option value={cond.value}>{cond.label}</option>
				{/each}
			</select>
		</div>

		<!-- Botones -->
		<div class="flex space-x-2">
			<button class="btn variant-filled" on:click={applyFilters}>Filtrar</button>
			<button class="btn variant-ghost" on:click={clearFilters}>Limpiar</button>
		</div>

		<!-- Botón para agregar nueva parte -->
		<div class="mt-4">
			<button class="btn variant-filled-primary">+ Agregar Nueva Parte</button>
		</div>
	</aside>
</div>
