<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Floating UI para Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import '@fortawesome/fontawesome-free/css/all.min.css';

	// Componente del modal
	import FeedbackModal from '../lib/component/modal.svelte';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Estado para el menú hamburguesa
	let isMenuOpen: boolean = false;
	// Estado para el modal de feedback
	let isFeedbackModalOpen: boolean = false;
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar background="bg-gray-800" padding="p-4" shadow="shadow-md">
			<svelte:fragment slot="lead">
				<div class="flex items-center justify-between w-full md:w-auto">
					<!-- Logo -->
					<div class="flex items-center space-x-4">
						<img src="src/lib/logo.png" alt="AutoParts Inventory" class="h-12 md:h-16" />
					</div>
					<!-- Botón de menú hamburguesa (visible solo en pantallas pequeñas) -->
					<button
						class="md:hidden text-white"
						on:click={() => (isMenuOpen = !isMenuOpen)}
						aria-label="Toggle menu"
					>
						{#if isMenuOpen}
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						{:else}
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16m-7 6h7"
								/>
							</svg>
						{/if}
					</button>
				</div>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<!-- Contenedor para barra de búsqueda y botones -->
				<div
					class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full {isMenuOpen
						? 'flex'
						: 'hidden md:flex'}"
				>
					<!-- Barra de búsqueda -->
					<div class="w-full max-w-md relative flex items-center">
						<i class="fa fa-search absolute left-3 text-gray-400"></i>
						<input
							type="text"
							placeholder="Buscar partes"
							class="input w-full pl-10 bg-gray-700 text-white border-gray-600 focus:border-blue-500 rounded-md py-2 px-4"
						/>
					</div>

					<!-- Botones -->
					<div class="flex space-x-2">
						<!-- Botón de Feedback -->
						<button
							type="button"
							class="btn variant-filled-primary flex items-center space-x-2"
							on:click={() => (isFeedbackModalOpen = true)}
						>
							<i class="fa fa-commenting" aria-hidden="true"></i>
							<span>Feedback</span>
						</button>

						<!-- Botón de GitHub -->
						<a
							class="btn variant-filled-primary flex items-center space-x-2"
							href="https://github.com/skeletonlabs/skeleton"
							target="_blank"
							rel="noreferrer"
						>
							GitHub
						</a>
					</div>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />

	<!-- Modal de Feedback -->
	<FeedbackModal bind:isOpen={isFeedbackModalOpen} />
</AppShell>
