import Canvas from "./_components/canvas";
import { Room } from "@/components/room";
import CanvasLoading from "./_components/canvas-loading";

interface LabIdProps {
    params :{
        labId: string;
    }
};

const LabIdPage = ({ params }: LabIdProps) => {
    return (
        <Room roomId={params.labId} fallback={<CanvasLoading />}>
            <Canvas labId={params.labId}/>
        </Room>
    )
};

export default LabIdPage;