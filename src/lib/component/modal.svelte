<script lang="ts">
	import { onMount } from 'svelte';

	// Prop to control modal visibility
	export let isOpen: boolean = false;

	// Form state
	let feedback = {
		rating: 0, // Rating (0 to 5)
		comment: '' // Comment
	};

	// State for star hover effect
	let hoverRating: number = 0;

	// State for submission handling
	let isSubmitting: boolean = false;
	let errorMessage: string = '';

	// Function to close the modal
	function closeModal(): void {
		isOpen = false;
		feedback = { rating: 0, comment: '' };
		errorMessage = '';
	}

	// Function to submit feedback
	async function submitFeedback(event: Event): Promise<void> {
		event.preventDefault();
		if (feedback.rating === 0) {
			errorMessage = 'Please select a rating';
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
				throw new Error('Failed to submit feedback');
			}

			console.log('Feedback submitted successfully:', feedback); // Log in English
			closeModal();
		} catch (error: unknown) {
			errorMessage =
				error instanceof Error ? error.message : 'An error occurred while submitting feedback';
		} finally {
			isSubmitting = false;
		}
	}

	// Close modal on Escape key press
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
	<!-- Dark overlay -->
	<div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
		<!-- Modal container -->
		<div class="card p-6 w-full max-w-md bg-gray-800 text-white rounded-lg shadow-lg">
			<!-- Modal header -->
			<header class="flex justify-between items-center mb-4">
				<h2 class="text-2xl font-bold">Feedback</h2>
				<button
					class="btn variant-ghost rounded-full w-8 h-8 flex items-center justify-center"
					on:click={closeModal}
					aria-label="Close modal"
				>
					<span class="text-lg">×</span>
				</button>
			</header>

			<!-- Form -->
			<form on:submit={submitFeedback}>
				<!-- Rating with stars -->
				<div class="mb-4">
					<label class="block mb-1 text-sm font-medium">Rating</label>
					<div class="flex space-x-1">
						{#each Array(5) as _, i}
							<button
								type="button"
								class="text-2xl"
								on:click={() => (feedback.rating = i + 1)}
								on:mouseenter={() => (hoverRating = i + 1)}
								on:mouseleave={() => (hoverRating = 0)}
								disabled={isSubmitting}
								aria-label={`Rate with ${i + 1} star${i + 1 === 1 ? '' : 's'}`}
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

				<!-- Comment -->
				<div class="mb-4">
					<label for="comment" class="block mb-1 text-sm font-medium">Comment</label>
					<textarea
						id="comment"
						bind:value={feedback.comment}
						placeholder="Write your comment here..."
						class="w-full h-24 bg-gray-700 text-white border border-blue-500 rounded-3xl p-3 focus:outline-none focus:border-blue-600"
						required
						disabled={isSubmitting}
					></textarea>
				</div>

				{#if errorMessage}
					<p class="text-red-500 mb-4">{errorMessage}</p>
				{/if}

				<!-- Buttons -->
				<div class="flex justify-end space-x-2">
					<button
						type="button"
						class="btn bg-gray-600 text-white rounded-full px-4 py-2"
						on:click={closeModal}
						disabled={isSubmitting}
					>
						Cancel
					</button>
					<button
						type="submit"
						class="btn bg-green-500 text-white rounded-full px-4 py-2"
						disabled={isSubmitting}
					>
						{#if isSubmitting}
							Sending...
						{:else}
							Submit
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
