import { useRouter } from 'next/router';
import 'react';

const InvoiceCard = ({ id }: {id?: string}) => {
    const router = useRouter();

    const onCardClick = () => {
        const query = id;
        router.push(`/invoice/${query}`);
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
            <div>Invoice id: {id}</div>
        </div>
    );
}

export default InvoiceCard;
