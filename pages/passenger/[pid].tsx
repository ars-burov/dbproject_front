import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/Customer.module.css'
import { getCookie, setCookies } from 'cookies-next';
import FlightCard from '../../components/FlightCard';
import { API_URL } from '../api/requests';


interface DropdownItem {
    name: string;
    id: string;
}

interface Passenger {
    id: string;
    firstname: string;
    lastname: string;
    nationality: string;
    gender: string;
    passportNo: string;
    passportExpirationDate: string;
    dob: string;
    insurance_id: string;
}

const PassengerPage: NextPage = ({}) => {
    const router = useRouter();
    
    const [passenger, setPassenger] = useState<Partial<Passenger>>();
    const [insurances, setInsurances] = useState<DropdownItem[]>([]);
    const [flights, setFlights] = useState<string[]>();

    useEffect(() => {
        if (passenger) return;

        const pid = router.query.pid;

        if (!pid) return;
        
        const token = getCookie('access');

        (async () => {
            const insuranceReq = fetch(`${API_URL}/insurances`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then((res) => res.json())
                .catch((e) => {
                    console.log(e);
                    return undefined
                });
            
            let loadedPassenger: Partial<Passenger>;
            if (pid === 'new') {
                loadedPassenger = {};
            } else {
                const respData = await fetch(`${API_URL}/passenger/${pid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                    .then((res) => res.json())
                    .catch((e) => {
                        console.log(e);
                        return undefined
                    });

                if (!respData) {
                    alert('Fetching failed');
                    return;
                }

                const passengerData = respData.Passenger[0];
                const insuranceData = respData.Insurance.length > 0 ? respData.Insurance[0].ins_id : undefined;
                console.log(insuranceData, respData.Insurance);

                loadedPassenger = {
                    id: passengerData.pid,
                    firstname: passengerData.p_fname,
                    lastname: passengerData.p_lname,
                    nationality: passengerData.p_nationality,
                    gender: passengerData.p_gender,
                    passportNo: passengerData.p_passportno,
                    passportExpirationDate: passengerData.p_passexdate,
                    dob: passengerData.p_dob,
                    insurance_id: insuranceData
                }
            }

            const insurances = (await insuranceReq).map((data: any) => ({
                name: data.plan_name,
                id: data.ins_id,
            }));

            setInsurances(insurances);
            setPassenger(loadedPassenger);
            setFlights(['1', '2', '3']);
        })()
    }, [router]);

    console.log(passenger);

    const onSubmit = async () => {
        console.log(passenger);
        if (!passenger || !passenger.insurance_id) return;

        const token = getCookie('access');

        const formData = new FormData();
        formData.append('pid', '123');
        formData.append('p_fname', passenger.firstname!);
        formData.append('p_lname', passenger.lastname!);
        formData.append('p_nationality', passenger.nationality!);
        formData.append('p_gender', passenger.gender!);
        formData.append('p_passportno', passenger.passportNo!);
        formData.append('p_passexdate', passenger.passportExpirationDate!);
        formData.append('p_dob', passenger.dob!);
        formData.append('p_type', 'K');
        formData.append('u_id', '6');

        const respBody = await fetch(`${API_URL}/passenger/new`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((res) => res.json())
            .catch((e) => {
                alert('An error occured');
                return undefined;
            });
        
        console.log(respBody);
        console.log(passenger.insurance_id);
        
        const pid = respBody?.pid;

        if (!pid) return;

        const insFormData = new FormData();
        insFormData.append('pid', pid);
        insFormData.append('ins', passenger.insurance_id);
        insFormData.append('buy_date', '2021-12-09');

        const insuranceBody = await fetch(`${API_URL}/passenger/${pid}/insurance/new`, {
            method: 'POST',
            body: insFormData,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((res) => res.json())
            .catch(() => undefined);
        
        console.log(insuranceBody);
        alert('Submission ok!')
    }

    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <label>
                    Firstname: <input
                        type='text'
                        onChange={(e) => setPassenger({...passenger as Passenger, firstname: e.target.value})}
                        value={passenger?.firstname}
                    />
                </label>
                <label>
                    Lastname: <input
                        type='text'
                        onChange={(e) => setPassenger({...passenger as Passenger, lastname: e.target.value})}
                        value={passenger?.lastname}
                    />
                </label>
                <label>
                    Nationality: <input
                        type='text'
                        onChange={(e) => setPassenger({...passenger as Passenger, nationality: e.target.value})}
                        value={passenger?.nationality}
                    />
                </label>
                <label>
                    Gender: <input
                        type='text'
                        onChange={(e) => setPassenger({...passenger as Passenger, gender: e.target.value})}
                        value={passenger?.gender}
                    />
                </label>
                <label>
                    Passport No: <input
                        type='number'
                        onChange={(e) => setPassenger({...passenger as Passenger, passportNo: e.target.value})}
                        value={passenger?.passportNo}
                    />
                </label>
                <label>
                    Passport Expiration Date: <input
                        type='text'
                        onChange={(e) => {
                            console.log(passenger?.passportExpirationDate, e.target.value)
                            setPassenger({...passenger as Passenger, passportExpirationDate: e.target.value})}
                        }
                        value={passenger?.passportExpirationDate}
                    />
                </label>
                <label>
                    Date of birth: <input
                        type='text'
                        onChange={(e) => setPassenger({...passenger as Passenger, dob: e.target.value})}
                        value={passenger?.dob}
                    />
                </label>
                <label>
                    Insurance:
                    <select
                        value={passenger?.insurance_id}
                        onChange={(e) => setPassenger({...passenger, insurance_id: e.target.value })}
                    >
                        {insurances?.map(({id, name}) => (
                            <option key={id} value={id}>{name}</option>
                        ))}
                    </select>
                </label>
                <button type="submit" onClick={() => onSubmit()}>Submit passenger info</button>
            </div>
            <br />
            <div className={styles.row}>
                {
                    passenger?.id && flights?.map((id) => <FlightCard key={id} fid={id} pid={passenger.id!} />)
                }
                {passenger?.id && <FlightCard pid={passenger.id} />}
            </div>
        </div>
    );
}

export default PassengerPage;
