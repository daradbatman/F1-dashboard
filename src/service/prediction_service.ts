

export class PredictionService {
    async getRacePredictions(): Promise<any | null> {
        const response = await fetch(`https://f1-race-predictor-210638339309.us-central1.run.app/predictions`);
        if (!response.ok) {
            return null;
        }

        return response.json();
    }
}
