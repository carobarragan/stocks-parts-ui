<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import FeedbackModal from '../lib/component/modal.svelte';
	import { searchTerm } from '../lib/store/searchStore';
	import { Car } from 'phosphor-svelte';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	let isMenuOpen: boolean = false;
	let isFeedbackModalOpen: boolean = false;

	function handleSearchInput(event: Event): void {
		const target = event.target as HTMLInputElement;
		$searchTerm = target.value;
	}
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar background="bg-gray-800" padding="p-4" shadow="shadow-md">
			<svelte:fragment slot="lead">
				<div class="flex items-center justify-between w-full md:w-auto">
					<div class="flex items-center space-x-2">
						<Car size={40} class="text-white" weight="fill" />
						<span class="text-xl md:text-2xl font-bold text-white">AutoParts</span>
					</div>
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
				<div
					class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full {isMenuOpen
						? 'flex'
						: 'hidden md:flex'}"
				>
					<div class="w-full max-w-md relative flex items-center">
						<i class="fa fa-search absolute left-3 text-gray-400"></i>
						<input
							type="text"
							placeholder="Buscar partes"
							class="input w-full pl-10 bg-gray-700 text-white border-gray-600 focus:border-blue-500 rounded-md py-2 px-4"
							on:input={handleSearchInput}
							bind:value={$searchTerm}
						/>
					</div>
					<div class="flex space-x-2">
						<button
							type="button"
							class="btn variant-filled-primary flex items-center space-x-2"
							on:click={() => (isFeedbackModalOpen = true)}
						>
							<i class="fa fa-commenting" aria-hidden="true"></i>
							<span>Feedback</span>
						</button>
						<a
							class="btn variant-filled-primary flex items-center space-x-2"
							href="https://github.com/carobarragan/stocks-parts-ui"
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

	<slot />
	<FeedbackModal bind:isOpen={isFeedbackModalOpen} />
</AppShell>
