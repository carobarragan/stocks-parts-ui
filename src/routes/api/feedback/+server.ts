import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

interface Feedback {
	rating: number;
	comment: string;
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const feedback: Feedback = await request.json();
		console.log('Feedback recibido:', feedback);

		// Validar los datos
		if (!feedback.rating || !feedback.comment) {
			return json({ error: 'Faltan datos requeridos' }, { status: 400 });
		}

		// No guardamos en una base de datos, solo imprimimos en la consola
		return json({ success: true }, { status: 200 });
	} catch (error) {
		console.error('Error al procesar el feedback:', error);
		return json({ error: 'Error presed feedback' }, { status: 500 });
	}
};
