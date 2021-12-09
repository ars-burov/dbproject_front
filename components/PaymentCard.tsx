import { useRouter } from 'next/router';
import 'react';

const PaymentCard = ({ iid, pid }: {pid?: string; iid: string}) => {
    const router = useRouter();

    const onCardClick = () => {
        const query = pid ?? 'new';
        router.push(`/${iid}/payment/${query}`);
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
                pid == undefined ?
                    <div>Add new payment</div> :
                    <div>Payment id: {pid}</div>
            }
        </div>
    );
}

export default PaymentCard;
