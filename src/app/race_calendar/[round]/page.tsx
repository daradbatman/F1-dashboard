import { F1Service } from "@/service/fi-dev-service";

export default async function RaceDetail({ params }: { params: { round: string } }) {
    const f1Service = new F1Service();
    const result = await f1Service.getRaceResultsByYear(new Date().getFullYear(), Number(params.round));
    console.log(result);
}