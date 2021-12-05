import { useRouter } from 'next/router';
import 'react';

const CustomerCard = ({ id }: {id?: string}) => {
    const router = useRouter();

    const onCardClick = () => {
        const query = id ?? 'new';
        router.push(`/customer/${query}`);
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
                    <div>Add new customer</div> :
                    <div>Customer id: {id}</div>
            }
        </div>
    );
}

export default CustomerCard;
