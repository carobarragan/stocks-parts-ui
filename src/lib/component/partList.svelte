<script>
	let viewMode = 'table'; // 'table' o 'cards'
	let parts = [
		{
			code: 'BRK-001',
			name: 'Pastillas de freno',
			category: 'Frenos',
			brand: 'Toyota',
			stock: 15,
			price: 45.0
		},
		{
			code: 'FLT-002',
			name: 'Filtro de aceite',
			category: 'Motor',
			brand: 'Ford',
			stock: 20,
			price: 12.0
		},
		{
			code: 'TIR-003',
			name: 'Llanta 205/55R16',
			category: 'Llantas',
			brand: 'Chevrolet',
			stock: 8,
			price: 120.0
		}
	];
</script>

<div class="p-4">
	<!-- Botón para alternar vista -->
	<div class="flex justify-between items-center mb-4">
		<button class="btn variant-filled">Filtros</button>
		<button
			class="btn variant-ghost"
			on:click={() => (viewMode = viewMode === 'table' ? 'cards' : 'table')}
		>
			{viewMode === 'table' ? 'Vista de Tarjetas' : 'Vista de Tabla'}
		</button>
	</div>

	{#if viewMode === 'table'}
		<!-- Vista de tabla -->
		<div class="overflow-x-auto">
			<table class="table w-full">
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Precio</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{#each parts as part}
						<tr>
							<td>{part.name}</td>
							<td>${part.price.toFixed(2)}</td>
							<td>
								<div class="flex space-x-2">
									<button class="btn variant-filled">Editar</button>
									<button class="btn variant-filled-error">Eliminar</button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<!-- Vista de tarjetas -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each parts as part}
				<div class="card p-4">
					<h3 class="h3">{part.name}</h3>
					<p><strong>Precio:</strong> ${part.price.toFixed(2)}</p>
					<div class="flex space-x-2 mt-2">
						<button class="btn variant-filled">Editar</button>
						<button class="btn variant-filled-error">Eliminar</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
