import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../../styles/Customer.module.css'
import { setCookies } from 'cookies-next';
import PassengerCard from '../../components/PassengerCard';
import { API_URL } from '../api/requests';


interface DropdownItem {
    id: string;
    name: string;
}

interface Customer {
    pid: string;
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
    type: string;
    membership: string;
}

const CustomerPage: NextPage = ({}) => {
    const router = useRouter();
    
    const [customer, setCustomer] = useState<Partial<Customer>>();
    const [passengers, setPassegers] = useState<string[]>();
    const [memberships, setMemberhips] = useState<DropdownItem[]>();

    useEffect(() => {
        (async () => {
            const cid = router.query.cid;

            let loadedCustomer: Partial<Customer>;
            if (cid == 'new') {
                loadedCustomer = {};
            } else {
                const customerData = await fetch(`${API_URL}/customer/${cid}`)
                    .then((res) => res.json())
                    .catch(() => null);

                // if (!customerData) return;

                // loadedCustomer = {
                //     pid: customerData.pid,
                //     street: customerData.c_street,
                //     city: customerData.c_city,
                //     country: customerData.c_cntry,
                //     email: customerData.c_email,
                //     contactNo: customerData.c_contctno,
                //     countryCode: customerData.c_cntrycode,
                //     passengerCount: customerData.c_pass_cnt,
                //     erFirstName: customerData.c_er_fname,
                //     erLastName: customerData.c_er_lname,
                //     erContactNo: customerData.c_ercntctno,
                //     erCountryCode: customerData.c_ercntcode,
                //     type: customerData.c_type,
                // }

                loadedCustomer = {
                    pid: '1',
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
                    type: 'B',
                    membership: 'Gold',
                }
            }

            setCustomer(loadedCustomer);
            setPassegers(['1', '2', '3']);
            setMemberhips([
                {id: 'Gold', name: 'Gold'},
                {id: 'Saphire', name: 'Saphire'},
            ]);
        })()
    }, [router]);

    const onSubmit = () => {
        alert('Submission ok!')
    }

    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <label>
                    Passenger ID:
                    <select
                        value={customer?.pid}
                        onChange={(e) => setCustomer({...customer, pid: e.target.value })}
                    >
                        {passengers?.map((id) => (
                            <option key={id} value={id}>Passenger {id}</option>
                        ))}
                    </select>
                </label>
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
                        onChange={(e) => setCustomer({...customer as Customer, erFirstName: e.target.value})}
                        value={customer?.erFirstName}
                    />
                </label>
                <label>
                    Emergency Contact Lastname: <input
                        type='text'
                        onChange={(e) => setCustomer({...customer as Customer, erLastName: e.target.value})}
                        value={customer?.erLastName}
                    />
                </label>
                <label>
                    Emergency Contact Number: <input
                        type='number'
                        onChange={(e) => setCustomer({...customer as Customer, erContactNo: e.target.value})}
                        value={customer?.erContactNo}
                    />
                </label>
                <label>
                    Emergency Contact Code: <input
                        type='number'
                        onChange={(e) => setCustomer({...customer as Customer, erCountryCode: e.target.value})}
                        value={customer?.erCountryCode}
                    />
                </label>
                <label>
                    Membership:
                    <select
                        value={customer?.membership}
                        onChange={(e) => setCustomer({...customer, membership: e.target.value })}
                    >
                        {memberships?.map(({id, name}) => (
                            <option key={id} value={id}>{name}</option>
                        ))}
                    </select>
                </label>
                <button type="submit" onClick={() => onSubmit()}>Submit customer info</button>
            </div>
        </div>
    );
}

export default CustomerPage;
