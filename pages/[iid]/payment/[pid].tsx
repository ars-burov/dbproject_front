import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../../../styles/Customer.module.css'
import { setCookies } from 'cookies-next';
import PassengerCard from '../../../components/PassengerCard';
import { API_URL } from '../../api/requests';
import PaymentCard from '../../../components/PaymentCard';


interface Payment {
    amount: number;
}

const PaymentPage: NextPage = ({}) => {
    const router = useRouter();
    
    const [payment, setPayment] = useState<Partial<Payment>>();

    useEffect(() => {
        (async () => {
            const cid = router.query.cid;

            const paymentData = await fetch(`${API_URL}/customer/${cid}`)
                .then((res) => res.json())
                .catch(() => null);

            // if (!customerData) return;

            // const payment = {
            //     amount: 1000,
            //     date: '2012-02-12',
            // }

            const payment = {
                amount: 1000,
                date: '2012-02-12',
            }

            setPayment(payment);
        })()
    }, [router]);

    const onSubmit = () => {
        alert('Submission ok!')
    }

    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <label>
                    Amount: <input
                        type='number'
                        onChange={(e) => setPayment({...payment as Payment, amount: parseInt(e.target.value)})}
                        value={payment?.amount}
                    />
                </label>
            </div>
            <button type="submit" onClick={() => onSubmit()}>Submit flight info</button>
        </div>
    );
}

export default PaymentPage;
