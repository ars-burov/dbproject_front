import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../styles/Login.module.css'
import { setCookies } from 'cookies-next';
import CustomerCard from '../components/CustomerCard';


const Customers: NextPage = ({}) => {
    const router = useRouter();
    
    const [customerList, setCustomerList] = useState<string[]>([]);

    useEffect(() => {
        setCustomerList(['1', '2', '3']);
    }, []);

    return (
        <div className={styles.container}>
            {
                customerList.map((id) => <CustomerCard key={id} id={id} />)
            }
            <CustomerCard />
        </div>
    );
}

export default Customers;
