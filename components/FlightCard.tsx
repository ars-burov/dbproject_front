import { useRouter } from 'next/router';
import 'react';

const FlightCard = ({ pid, fid }: {pid: string, fid?: string}) => {
    const router = useRouter();

    const onCardClick = () => {
        let fpath = fid ?? 'new';
        router.push(`/passenger/${pid}/flight/${fpath}`);
    }

    return (
        <div
            onClick={() => onCardClick()}
            style={{
                border: '1px solid black',
                padding: '10px',
                width: '150px'
            }}
        >
            {
                fid == undefined ?
                    <div>Add new passenger</div> :
                    <div>Flight id: {fid}</div>
            }
        </div>
    );
}

export default FlightCard;
