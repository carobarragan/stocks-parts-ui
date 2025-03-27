<script lang="ts">
	import { onMount } from 'svelte';

	// Prop para controlar si el modal está abierto
	export let isOpen: boolean = false;

	// Estado del formulario
	let feedback = {
		rating: 0, // Calificación (0 a 5)
		comment: '' // Comentario
	};

	// Estado para manejar el hover de las estrellas
	let hoverRating: number = 0;

	// Estado para manejar el envío
	let isSubmitting: boolean = false;
	let errorMessage: string = '';

	// Función para cerrar el modal
	function closeModal(): void {
		isOpen = false;
		feedback = { rating: 0, comment: '' };
		errorMessage = '';
	}

	// Función para enviar el feedback
	async function submitFeedback(event: Event): Promise<void> {
		event.preventDefault();
		if (feedback.rating === 0) {
			errorMessage = 'Por favor selecciona una calificación';
			return;
		}

		isSubmitting = true;
		errorMessage = '';

		try {
			const response = await fetch('/api/feedback', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(feedback)
			});

			if (!response.ok) {
				throw new Error('Error al enviar el feedback');
			}

			console.log('Feedback enviado con éxito:', feedback);
			closeModal();
		} catch (error: unknown) {
			errorMessage =
				error instanceof Error ? error.message : 'Ocurrió un error al enviar el feedback';
		} finally {
			isSubmitting = false;
		}
	}

	// Cerrar el modal al presionar la tecla Escape
	onMount(() => {
		const handleEscape = (event: KeyboardEvent): void => {
			if (event.key === 'Escape' && isOpen) {
				closeModal();
			}
		};
		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	});
</script>

<!-- Modal -->
{#if isOpen}
	<!-- Fondo oscuro -->
	<div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
		<!-- Contenedor del modal -->
		<div class="card p-6 w-full max-w-md bg-gray-800 text-white rounded-lg shadow-lg">
			<!-- Encabezado del modal -->
			<header class="flex justify-between items-center mb-4">
				<h2 class="text-2xl font-bold">Feedback</h2>
				<button
					class="btn variant-ghost rounded-full w-8 h-8 flex items-center justify-center"
					on:click={closeModal}
					aria-label="Cerrar modal"
				>
					<span class="text-lg">×</span>
				</button>
			</header>

			<!-- Formulario -->
			<form on:submit={submitFeedback}>
				<!-- Calificación con estrellas -->
				<div class="mb-4">
					<label class="block mb-1 text-sm font-medium">Calificación</label>
					<div class="flex space-x-1">
						{#each Array(5) as _, i}
							<button
								type="button"
								class="text-2xl"
								on:click={() => (feedback.rating = i + 1)}
								on:mouseenter={() => (hoverRating = i + 1)}
								on:mouseleave={() => (hoverRating = 0)}
								disabled={isSubmitting}
								aria-label={`Calificar con ${i + 1} estrella${i + 1 === 1 ? '' : 's'}`}
							>
								<i
									class="fas fa-star"
									class:text-yellow-400={hoverRating > i || (!hoverRating && feedback.rating > i)}
									class:text-gray-400={hoverRating <= i && feedback.rating <= i}
								></i>
							</button>
						{/each}
					</div>
				</div>

				<!-- Comentario -->
				<div class="mb-4">
					<label for="comment" class="block mb-1 text-sm font-medium">Comentario</label>
					<textarea
						id="comment"
						bind:value={feedback.comment}
						placeholder="Escribe tu comentario aquí..."
						class="w-full h-24 bg-gray-700 text-white border border-blue-500 rounded-3xl p-3 focus:outline-none focus:border-blue-600"
						required
						disabled={isSubmitting}
					></textarea>
				</div>

				{#if errorMessage}
					<p class="text-red-500 mb-4">{errorMessage}</p>
				{/if}

				<!-- Botones -->
				<div class="flex justify-end space-x-2">
					<button
						type="button"
						class="btn bg-gray-600 text-white rounded-full px-4 py-2"
						on:click={closeModal}
						disabled={isSubmitting}
					>
						Cancelar
					</button>
					<button
						type="submit"
						class="btn bg-green-500 text-white rounded-full px-4 py-2"
						disabled={isSubmitting}
					>
						{#if isSubmitting}
							Enviando...
						{:else}
							Enviar
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.fa-star:hover {
		cursor: pointer;
	}
</style>
