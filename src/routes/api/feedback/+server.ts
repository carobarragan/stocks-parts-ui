import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

interface Feedback {
	rating: number;
	comment: string;
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const feedback: Feedback = await request.json();
		console.log('Feedback received:', feedback); // Log message in English

		// Validate the data
		if (!feedback.rating || !feedback.comment) {
			return json({ error: 'Required data is missing' }, { status: 400 }); // Error message in English
		}

		// We don't store in a database, just log to the console
		return json({ success: true }, { status: 200 });
	} catch (error) {
		console.error('Error processing feedback:', error); // Log message in English
		return json({ error: 'Error processing feedback' }, { status: 500 }); // Error message in English
	}
};
