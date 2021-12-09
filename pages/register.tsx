import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from '../styles/Login.module.css'
import { setCookies } from 'cookies-next';
import { API_URL } from './api/requests';


const Register: NextPage = ({}) => {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pconfirm, setPconfirm] = useState('');
    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');

    const onSubmit = async () => {
        const body = {
            username,
            password,
            password2: pconfirm,
            email,
            first_name: fname,
            last_name: lname,
        };

        const formData = new FormData();
        Object.entries(body).forEach(([k, v]) => formData.append(k, v));

        const respBody = await fetch(`${API_URL}/register`, {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .catch((e) => {
                alert('An error occured');
                return undefined;
            });
        
        if (respBody !== undefined) {
            router.replace('/login');
        }
    }

    return (
        <div className={styles.container}>
            <label htmlFor="username" >Username</label>
            <input type="text" placeholder="Enter username" name="username" required onChange={(e) => setUsername(e.target.value)} />

            <label htmlFor="password" >Password</label>
            <input type="password" placeholder="Enter username" name="username" required onChange={(e) => setPassword(e.target.value)} />

            <label htmlFor="password" >Confirm Password</label>
            <input type="password" placeholder="Enter username" name="username" required onChange={(e) => setPconfirm(e.target.value)} />

            <label htmlFor="password" >Email</label>
            <input type="text" placeholder="Enter username" name="username" required onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="password" >First name</label>
            <input type="text" placeholder="Enter username" name="username" required onChange={(e) => setFname(e.target.value)} />

            <label htmlFor="password" >Last name</label>
            <input type="text" placeholder="Enter username" name="username" required onChange={(e) => setLname(e.target.value)} />

            <button type="submit" onClick={() => onSubmit()}>Register</button>
        </div>
    );
}

export default Register;
