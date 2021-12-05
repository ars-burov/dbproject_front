import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from '../../../../styles/Customer.module.css'

interface PassengerFlight {
    id: string;
    flightId: string;
    cabinId: string;
    mealPlanId: string;
    insuranceId: string;
}

interface DropdownItem {
    id: string;
    name: string;
}

const PassengerFlightPage: NextPage = ({}) => {
    const router = useRouter();
    
    const [passengerFlight, setPassengerFlight] = useState<Partial<PassengerFlight>>();
    const [flights, setFlights] = useState<DropdownItem[]>();
    const [cabins, setCabins] = useState<DropdownItem[]>();
    const [meals, setMeals] = useState<DropdownItem[]>();
    const [insurances, setInsurances] = useState<DropdownItem[]>();

    useEffect(() => {
        const pid = router.query.pid;

        const meals: DropdownItem[] = [
            { id: '1', name: 'vegan' },
            { id: '2', name: 'meat' },
        ]

        const flights: DropdownItem[] = [
            { id: '1', name: 'ABC123' },
            { id: '2', name: 'KLM123' },
        ]

        const cabins: DropdownItem[] = [
            { id: '1', name: 'main' },
            { id: '2', name: 'first class' },
        ]
        
        const insurances: DropdownItem[] = [
            { id: '1', name: 'Budget' },
            { id: '2', name: 'Comfort+' },
            { id: '3', name: 'Luxury' },
        ]

        let loadedPassengerFlight: Partial<PassengerFlight>;
        if (pid == 'new') {
            loadedPassengerFlight = {};
        } else {
            loadedPassengerFlight = {
                id: '1',
                flightId: '1',
                cabinId: '1',
                mealPlanId: '1',
            }
        }

        setPassengerFlight(loadedPassengerFlight);
        setFlights(flights);
        setCabins(cabins);
        setMeals(meals);
        setInsurances(insurances);
    }, [router]);

    const onSubmit = () => {
        alert('Submission ok!')
    }

    console.log(router.query);
    console.log(cabins);
    console.log(meals);

    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <label>
                    Flight:
                    <select
                        value={passengerFlight?.flightId}
                        onChange={(e) => setPassengerFlight({...passengerFlight, flightId: e.target.value })}
                    >
                        {flights?.map(({id, name}) => (
                            <option key={id} value={id}>{name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Cabin:
                    <select
                        value={passengerFlight?.cabinId}
                        onChange={(e) => setPassengerFlight({...passengerFlight, cabinId: e.target.value })}
                    >
                        {cabins?.map(({id, name}) => (
                            <option key={id} value={id}>{name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Meal:
                    <select
                        value={passengerFlight?.mealPlanId}
                        onChange={(e) => setPassengerFlight({...passengerFlight, mealPlanId: e.target.value })}
                    >
                        {meals?.map(({id, name}) => (
                            <option key={id} value={id}>{name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Insrances:
                    <select
                        value={passengerFlight?.insuranceId}
                        onChange={(e) => setPassengerFlight({...passengerFlight, insuranceId: e.target.value })}
                    >
                        {insurances?.map(({id, name}) => (
                            <option key={id} value={id}>{name}</option>
                        ))}
                    </select>
                </label>
                <button type="submit" onClick={() => onSubmit()}>Submit flight info</button>
            </div>
            <br />
        </div>
    );
}

export default PassengerFlightPage;
