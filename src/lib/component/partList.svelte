<script>
	let viewMode = 'table'; // 'table' or 'cards'
	let parts = [
		{
			code: 'BRK-001',
			name: 'Brake Pads',
			category: 'Brakes',
			brand: 'Toyota',
			stock: 15,
			price: 45.0
		},
		{
			code: 'FLT-002',
			name: 'Oil Filter',
			category: 'Motor',
			brand: 'Ford',
			stock: 20,
			price: 12.0
		},
		{
			code: 'TIR-003',
			name: 'Tire 205/55R16',
			category: 'Tires',
			brand: 'Chevrolet',
			stock: 8,
			price: 120.0
		}
	];
</script>

<div class="p-4">
	<!-- View toggle section -->
	<div class="flex justify-between items-center mb-4">
		<button class="btn variant-filled">Filters</button>
		<button
			class="btn variant-ghost"
			on:click={() => (viewMode = viewMode === 'table' ? 'cards' : 'table')}
		>
			{viewMode === 'table' ? 'Card View' : 'Table View'}
		</button>
	</div>

	{#if viewMode === 'table'}
		<!-- Table view -->
		<div class="overflow-x-auto">
			<table class="table w-full">
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each parts as part}
						<tr>
							<td>{part.name}</td>
							<td>${part.price.toFixed(2)}</td>
							<td>
								<div class="flex space-x-2">
									<button class="btn variant-filled">Edit</button>
									<button class="btn variant-filled-error">Delete</button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<!-- Card view -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each parts as part}
				<div class="card p-4">
					<h3 class="h3">{part.name}</h3>
					<p><strong>Price:</strong> ${part.price.toFixed(2)}</p>
					<div class="flex space-x-2 mt-2">
						<button class="btn variant-filled">Edit</button>
						<button class="btn variant-filled-error">Delete</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
