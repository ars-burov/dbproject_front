import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../../styles/Customer.module.css'
import { setCookies } from 'cookies-next';
import PassengerCard from '../../components/PassengerCard';


interface Customer {
    id: string;
    street: string;
    city: string;
    country: string;
    email: string;
    contactNo: string;
    countryCode: string;
    passengerCount: number;
    erFirstName: string;
    erLastName: string;
    erContactNo: string;
    erCountryCode: string;
}

const CustomerPage: NextPage = ({}) => {
    const router = useRouter();
    
    const [customer, setCustomer] = useState<Partial<Customer>>();
    const [passengers, setPassegers] = useState<string[]>();

    useEffect(() => {
        const cid = router.query.cid;

        let loadedCustomer: Partial<Customer>;
        if (cid == 'new') {
            loadedCustomer = {};
        } else {
            loadedCustomer = {
                id: '1',
                street: '2905 5 Avenue',
                city: 'Manhattan',
                country: 'US',
                email: 'adb8432@nyu.edu',
                contactNo: '9204205102',
                countryCode: '1',
                passengerCount: 1,
                erFirstName: 'Vladimir',
                erLastName: 'Putin',
                erContactNo: '9996666913',
                erCountryCode: '7',
            }
        }

        setCustomer(loadedCustomer);
        setPassegers(['1', '2', '3']);
    }, [router]);

    const onSubmit = () => {
        alert('Submission ok!')
    }

    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <label>
                    Street: <input
                        type='text'
                        onChange={(e) => setCustomer({...customer as Customer, street: e.target.value})}
                        value={customer?.street}
                    />
                </label>
                <label>
                    City: <input
                        type='text'
                        onChange={(e) => setCustomer({...customer as Customer, city: e.target.value})}
                        value={customer?.city}
                    />
                </label>
                <label>
                    Country: <input
                        type='text'
                        onChange={(e) => setCustomer({...customer as Customer, country: e.target.value})}
                        value={customer?.country}
                    />
                </label>
                <label>
                    Email: <input
                        type='text'
                        onChange={(e) => setCustomer({...customer as Customer, email: e.target.value})}
                        value={customer?.email}
                    />
                </label>
                <label>
                    Contact no: <input
                        type='number'
                        onChange={(e) => setCustomer({...customer as Customer, contactNo: e.target.value})}
                        value={customer?.contactNo}
                    />
                </label>
                <label>
                    Contry code: <input
                        type='number'
                        onChange={(e) => setCustomer({...customer as Customer, countryCode: e.target.value})}
                        value={customer?.countryCode}
                    />
                </label>
                <label>
                    Emergency Contact Firstname: <input
                        type='text'
                        onChange={(e) => setCustomer({...customer as Customer, street: e.target.value})}
                        value={customer?.erFirstName}
                    />
                </label>
                <label>
                    Emergency Contact Lastname: <input
                        type='text'
                        onChange={(e) => setCustomer({...customer as Customer, street: e.target.value})}
                        value={customer?.erLastName}
                    />
                </label>
                <label>
                    Emergency Contact Number: <input
                        type='number'
                        onChange={(e) => setCustomer({...customer as Customer, street: e.target.value})}
                        value={customer?.erContactNo}
                    />
                </label>
                <label>
                    Emergency Contact Code: <input
                        type='number'
                        onChange={(e) => setCustomer({...customer as Customer, street: e.target.value})}
                        value={customer?.erCountryCode}
                    />
                </label>
                <button type="submit" onClick={() => onSubmit()}>Submit customer info</button>
            </div>
            <br />
            <div className={styles.row}>
                {
                    passengers?.map((id) => <PassengerCard key={id} id={id} />)
                }
                <PassengerCard />
            </div>
        </div>
    );
}

export default CustomerPage;
