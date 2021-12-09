import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../../styles/Customer.module.css'
import { getCookie, setCookies } from 'cookies-next';
import PassengerCard from '../../components/PassengerCard';
import { API_URL } from '../api/requests';
import PaymentCard from '../../components/PaymentCard';


interface Invoice {
    id: string;
    amount: number;
    date: string;
}

const InvoicePage: NextPage = ({}) => {
    const router = useRouter();
    
    const [invoice, setInvoice] = useState<Partial<Invoice>>();
    const [payments, setPayments] = useState<string[]>();

    useEffect(() => {
        const token = getCookie('access');
        (async () => {
            const iid = router.query.iid;

            const respData = await fetch(`${API_URL}/invoice/${iid}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then((res) => res.json())
                .catch((e) => {
                    return undefined
                });

            const invoiceData = respData?.invoice;
            const paymentIds = respData?.payment_ids;

            if (!invoiceData) return;

            console.log(invoiceData);

            const invoice = {
                amount: invoiceData.inv_amt,
                id: invoiceData.inv_id,
                date: invoiceData.inv_date,
            }

            setInvoice(invoice);
            setPayments(paymentIds);
        })()
    }, [router]);

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
                    payments && payments.length < 2 && <PaymentCard iid={iid} />
                }
            </div>
        </div>
    );
}

export default InvoicePage;
