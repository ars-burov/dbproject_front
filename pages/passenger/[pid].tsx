import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/Customer.module.css'
import { setCookies } from 'cookies-next';
import FlightCard from '../../components/FlightCard';
import { API_URL } from '../api/requests';


interface Passenger {
    id: string;
    firstname: string;
    lastname: string;
    nationality: string;
    gender: string;
    passportNo: string;
    passportExpirationDate: string;
    dob: string;
}

const PassengerPage: NextPage = ({}) => {
    const router = useRouter();
    
    const [passenger, setPassenger] = useState<Partial<Passenger>>();
    const [flights, setFlights] = useState<string[]>();

    useEffect(() => {
        const pid = router.query.pid;

        (async () => {
            let loadedPassenger: Partial<Passenger>;
            if (pid == 'new') {
                loadedPassenger = {};
            } else {
                // const passengerData = await fetch(`${API_URL}/passenger/${pid}`)
                //     .then((res) => res.json())
                //     .catch(() => null);

                // if (!passengerData) return;

                // loadedPassenger = {
                //     id: passengerData.pid,
                //     firstname: passengerData.p_fname,
                //     lastname: passengerData.p_lname,
                //     nationality: passengerData.p_nationality,
                //     gender: passengerData.p_gender,
                //     passportNo: passengerData.p_passportno,
                //     passportExpirationDate: passengerData.p_passexdate,
                //     dob: passengerData.p_dob,
                // }

                loadedPassenger = {
                    id: '1',
                    firstname: 'Arsenii',
                    lastname: 'Burov',
                    nationality: 'Russian',
                    gender: 'M',
                    passportNo: '4511029123',
                    passportExpirationDate: '01/25',
                    dob: '03/92',
                }
            }

            setPassenger(loadedPassenger);
            setFlights(['1', '2', '3']);
        })()
    }, [router]);

    const onSubmit = () => {
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
                        onChange={(e) => setPassenger({...passenger as Passenger, passportExpirationDate: e.target.value})}
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
