import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { F1Service } from "@/service/fi-dev-service";
export default async function PredictionPage() {

  const f1Service = new F1Service();
  const prediction =  await f1Service.getPredictions();
  const hasPredictions = Array.isArray(prediction) && prediction.length > 0;

    return (
        <div className="w-full">
            {hasPredictions ? (
                <div className="w-full overflow-x-auto rounded-md border">
                    <h1 className="text-2xl font-bold mb-4">{prediction?.[0]?.race ?? "Predictions"}</h1>
                    <Table className="min-w-[600px] w-full text-sm sm:text-base">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Driver</TableHead>
                                <TableHead>Driver Number</TableHead>
                                <TableHead>Predicted Finishing Position</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {prediction.map((pred: { driver_name: string; driver_number: number; predicted_rank: number }, index: number) => (
                                <TableRow key={`${pred.driver_number}-${pred.driver_name}-${index}`}>
                                    <TableCell>{pred.driver_name}</TableCell>
                                    <TableCell>{pred.driver_number}</TableCell>
                                    <TableCell>
                                        <span
                                            style={{
                                            color:
                                                pred.predicted_rank === 1
                                                ? "gold"
                                                : pred.predicted_rank === 2
                                                ? "silver"
                                                : pred.predicted_rank === 3
                                                ? "#cd7f32"
                                                : "inherit",
                                            }}
                                        >
                                            {pred.predicted_rank}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="text-2xl font-bold mb-4">No predictions available at the moment. Data source may not have current qualifying data ready.</div>
            )}

            <footer>
                <div>
                    Predictions are subject to change overtime. 
                    I hope to turn this into a chat bot to give more predictions beyond race results. This prediction was made possible with data from the openf1 api and XGBoosts ranker model to generate the prediction.
                </div>
            </footer>
        </div>
    );
}