import Canvas from "./_components/canvas";

interface LabIdProps {
    params :{
        labId: string;
    }
};

const LabIdPage = ({ params }: LabIdProps) => {
    return (
        <Canvas labId={params.labId}/>
    )
};

export default LabIdPage;