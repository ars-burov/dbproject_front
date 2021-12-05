import { useRouter } from 'next/router';
import 'react';

const PassengerCard = ({ id }: {id?: string}) => {
    const router = useRouter();

    const onCardClick = () => {
        const query = id ?? 'new';
        router.push(`/passenger/${query}`);
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
                id == undefined ?
                    <div>Add new passenger</div> :
                    <div>Passenger id: {id}</div>
            }
        </div>
    );
}

export default PassengerCard;
