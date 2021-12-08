import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../styles/Customer.module.css'
import { getCookie } from 'cookies-next';
import CustomerCard from '../components/CustomerCard';
import PassengerCard from '../components/PassengerCard';
import InvoiceCard from '../components/InvoiceCard';
import { API_URL } from './api/requests';


const UserInfo: NextPage = ({}) => {
    const router = useRouter();
    
    const [customerList, setCustomerList] = useState<string[]>([]);
    const [passengerList, setPassengerList] = useState<string[]>([]);
    const [invoiceList, setInvoiceList] = useState<string[]>([]);

    useEffect(() => {

        const uid = getCookie('username');

        (async () => {
            const paymentData = await fetch(`${API_URL}/customer/${uid}`)
                    .then((res) => res.json())
                    .catch(() => null);
            
            // const customerIds = paymentData?.Customers.map((customer: any) => customer.c_id);
            // const passengerIds = paymentData?.Passengers.map((passenger: any) => passenger.pid);
            // const invioceIds = paymentData?.Invoices.map((invoice: any) => invoice.id);

            // setCustomerList(customerIds);
            // setPassengerList(passengerIds);
            // setInvoiceList(invioceIds);
            
            setCustomerList(['1', '2', '3']);
            setPassengerList(['1', '2', '3']);
            setInvoiceList(['1', '2', '3']);
        })();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                {
                    passengerList.map((id) => <PassengerCard key={id} id={id} />)
                }
                <PassengerCard />
            </div>
            <br />
            <div className={styles.row}>
                {
                    customerList.map((id) => <CustomerCard key={id} id={id} />)
                }
                <CustomerCard />
            </div>
            <br />
            <div className={styles.row}>
                {
                    invoiceList.map((id) => <InvoiceCard key={id} id={id} />)
                }
            </div>
        </div>
    );
}

export default UserInfo;
