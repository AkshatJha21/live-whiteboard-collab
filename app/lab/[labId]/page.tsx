import Canvas from "./_components/canvas";
import { Room } from "@/components/room";

interface LabIdProps {
    params :{
        labId: string;
    }
};

const LabIdPage = ({ params }: LabIdProps) => {
    return (
        <Room roomId={params.labId} fallback={<div>Loading...</div>}>
            <Canvas labId={params.labId}/>
        </Room>
    )
};

export default LabIdPage;