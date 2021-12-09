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
    const [customerList, setCustomerList] = useState<string[]>([]);
    const [passengerList, setPassengerList] = useState<string[]>([]);
    const [invoiceList, setInvoiceList] = useState<string[]>([]);

    useEffect(() => {

        const token = getCookie('access');

        (async () => {
            const paymentData = await fetch(`${API_URL}/userinfo`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then((res) => res.json())
                .catch((e) => {
                    console.log(e);
                    alert('Could not load');
                    return undefined;
                });
            
            if (!paymentData) return;

            console.log(paymentData);
            
            const customerIds = paymentData?.Customers?.map((customer: any) => customer.c_id);
            const passengerIds = paymentData?.Passengers?.map((passenger: any) => passenger.pid);
            const invioceIds = paymentData?.Invoices?.map((invoice: any) => invoice.inv_id);

            setCustomerList(customerIds);
            setPassengerList(passengerIds);
            setInvoiceList(invioceIds);
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
                    invoiceList?.map((id) => <InvoiceCard key={id} id={id} />)
                }
            </div>
        </div>
    );
}

export default UserInfo;
