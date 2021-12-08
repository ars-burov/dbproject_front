import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../../styles/Customer.module.css'
import { setCookies } from 'cookies-next';
import PassengerCard from '../../components/PassengerCard';
import { API_URL } from '../api/requests';
import PaymentCard from '../../components/PaymentCard';


interface Invoice {
    amount: number;
    date: string;
}

const InvoicePage: NextPage = ({}) => {
    const router = useRouter();
    
    const [invoice, setInvoice] = useState<Partial<Invoice>>();
    const [payments, setPayments] = useState<string[]>();

    useEffect(() => {
        (async () => {
            const iid = router.query.iid;

            const invoiceData = await fetch(`${API_URL}/customer/${iid}`)
                .then((res) => res.json())
                .catch(() => null);

            // if (!customerData) return;

            // const invoice = {
            //     amount: 1000,
            //     date: '2012-02-12',
            // }

            const invoice = {
                amount: 1000,
                date: '2012-02-12',
            }

            setInvoice(invoice);
            setPayments(['1', '2']);
        })()
    }, [router]);

    const onSubmit = () => {
        alert('Submission ok!')
    }

    const iid = router.query.iid as string;

    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <div>Invoice amount: {invoice?.amount}</div>
                <div>Invoice date: {invoice?.date}</div>
            </div>
            <br />
            <div className={styles.row}>
                {
                    payments?.map((id) => <PaymentCard key={id} iid={iid} pid={id} />)
                }
                {
                    payments && payments.length < 2 && <PaymentCard />
                }
            </div>
        </div>
    );
}

export default InvoicePage;
