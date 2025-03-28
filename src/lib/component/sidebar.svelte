<script>
	let category = '';
	let brand = '';
	let minPrice = '';
	let maxPrice = '';
	let condition = '';
	let isSidebarOpen = false; // Controls sidebar visibility on small screens

	const categories = [
		{ value: 'motor', label: 'Motor' },
		{ value: 'suspension', label: 'Suspension' },
		{ value: 'brakes', label: 'Brakes' },
		{ value: 'tires', label: 'Tires' },
		{ value: 'electricity', label: 'Electricity' },
		{ value: 'bodywork', label: 'Bodywork' }
	];

	const brands = [
		{ value: 'toyota', label: 'Toyota' },
		{ value: 'ford', label: 'Ford' },
		{ value: 'chevrolet', label: 'Chevrolet' },
		{ value: 'honda', label: 'Honda' }
	];

	const conditions = [
		{ value: 'new', label: 'New' },
		{ value: 'used', label: 'Used' },
		{ value: 'refurbished', label: 'Refurbished' }
	];

	function applyFilters() {
		console.log('Filters applied:', { category, brand, minPrice, maxPrice, condition }); // Log in English
	}

	function clearFilters() {
		category = '';
		brand = '';
		minPrice = '';
		maxPrice = '';
		condition = '';
	}
</script>

<!-- Button to open sidebar on small screens -->
<button class="md:hidden btn variant-filled m-4" on:click={() => (isSidebarOpen = true)}>
	Filters
</button>

<!-- Sidebar -->
<div class="fixed inset-0 z-50 {isSidebarOpen ? 'block' : 'hidden'} md:block md:static md:w-64">
	<!-- Dark overlay for small screens -->
	<div
		class="fixed inset-0 bg-black bg-opacity-50 md:hidden"
		on:click={() => (isSidebarOpen = false)}
	></div>

	<!-- Sidebar content -->
	<aside class="relative w-64 h-full p-4 bg-gray-800 text-white overflow-y-auto md:w-64">
		<h2 class="h2 mb-4">Filters</h2>

		<!-- Categories -->
		<div class="mb-4">
			<label for="category" class="block mb-1">Category</label>
			<select id="category" bind:value={category} class="input">
				<option value="">Select a category</option>
				{#each categories as cat}
					<option value={cat.value}>{cat.label}</option>
				{/each}
			</select>
		</div>

		<!-- Brand -->
		<div class="mb-4">
			<label for="brand" class="block mb-1">Brand</label>
			<select id="brand" bind:value={brand} class="input">
				<option value="">Select a brand</option>
				{#each brands as br}
					<option value={br.value}>{br.label}</option>
				{/each}
			</select>
		</div>

		<!-- Price Range -->
		<div class="mb-4">
			<label class="block mb-1">Price Range</label>
			<div class="flex space-x-2">
				<input type="number" placeholder="Minimum" bind:value={minPrice} class="input" />
				<input type="number" placeholder="Maximum" bind:value={maxPrice} class="input" />
			</div>
		</div>

		<!-- Condition -->
		<div class="mb-4">
			<label for="condition" class="block mb-1">Condition</label>
			<select id="condition" bind:value={condition} class="input">
				<option value="">Select a condition</option>
				{#each conditions as cond}
					<option value={cond.value}>{cond.label}</option>
				{/each}
			</select>
		</div>

		<!-- Buttons -->
		<div class="flex space-x-2">
			<button class="btn variant-filled" on:click={applyFilters}>Filter</button>
			<button class="btn variant-ghost" on:click={clearFilters}>Clear</button>
		</div>

		<!-- Button to add new part -->
		<div class="mt-4">
			<button class="btn variant-filled-primary">+ Add New Part</button>
		</div>
	</aside>
</div>
