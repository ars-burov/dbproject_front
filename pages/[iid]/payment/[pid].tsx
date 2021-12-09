import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../../../styles/Customer.module.css'
import { getCookie, setCookies } from 'cookies-next';
import PassengerCard from '../../../components/PassengerCard';
import { API_URL } from '../../api/requests';
import PaymentCard from '../../../components/PaymentCard';


interface Payment {
    id: string;
    amount: number;
    method: string;
    cardNo: string;
    payFirstName: string;
    payLastName: string;
    invoice_inv: string;
}

const PaymentPage: NextPage = ({}) => {
    const router = useRouter();
    
    const [payment, setPayment] = useState<Partial<Payment>>();

    useEffect(() => {
        const pid = router.query.pid;
        if (payment || !pid) return;

        const token = getCookie('access');

        (async () => {
            let payment: Partial<Payment>;
            if (pid === 'new') {
                payment = { id: '1234' };
            } else {
                const paymentRawData = await fetch(`${API_URL}/payment/${pid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                    .then((res) => res.json())
                    .catch(() => undefined);
                
                console.log(paymentRawData);

                if (!paymentRawData || paymentRawData.payemnts.length === 0) return;

                const paymentData = paymentRawData.payemnts[0];

                payment = {
                    id: paymentData.pay_id,
                    amount: paymentData.p_amt,
                    method: paymentData.p_method,
                    cardNo: paymentData.p_cardno,
                    payFirstName: paymentData.pay_fname,
                    payLastName: paymentData.pay_lname,
                    invoice_inv: paymentData.invoice_inv,
                }
            }

            setPayment(payment);
        })()
    }, [router]);

    const onSubmit = async () => {
        const iid = router.query.iid;
        console.log(router.query);
        if (!payment || !iid) return;

        const token = getCookie('access');

        const formData = new FormData();
        formData.append('invoice_inv', iid as string);
        formData.append('p_amt', payment.amount!.toString());
        formData.append('p_cardno', payment.cardNo!);
        formData.append('p_date', '2021-12-09');
        formData.append('p_method', payment.method!);
        formData.append('pay_fname', payment.payFirstName!);
        formData.append('pay_id', payment.id!);
        formData.append('pay_lname', payment.payLastName!);

        const respBody = await fetch(`${API_URL}/payment/new`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((res) => res.json())
            .catch((e) => {
                alert('An error occured');
                console.log(e);
                return undefined;
            });
        
        console.log(respBody);
        
        if (respBody) {
            alert('Submission ok!')
        }
    }

    console.log(payment);

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
                <label>
                    Method: <input
                        type='text'
                        onChange={(e) => setPayment({...payment as Payment, method: e.target.value})}
                        value={payment?.method}
                    />
                </label>
                <label>
                    Card Number: <input
                        type='text'
                        onChange={(e) => setPayment({...payment as Payment, cardNo: (e.target.value)})}
                        value={payment?.cardNo}
                    />
                </label>
                <label>
                    First Name: <input
                        type='text'
                        onChange={(e) => setPayment({...payment as Payment, payFirstName: (e.target.value)})}
                        value={payment?.payFirstName}
                    />
                </label>
                <label>
                    Last Name: <input
                        type='text'
                        onChange={(e) => setPayment({...payment as Payment, payLastName: (e.target.value)})}
                        value={payment?.payLastName}
                    />
                </label>
            </div>
            <button type="submit" onClick={() => onSubmit()}>Submit payment info</button>
        </div>
    );
}

export default PaymentPage;
