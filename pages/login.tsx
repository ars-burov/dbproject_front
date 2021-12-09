import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from '../styles/Login.module.css'
import { setCookies } from 'cookies-next';
import { API_URL } from './api/requests';


const Login: NextPage = ({}) => {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const respBody = await fetch(`${API_URL}/login`, {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .catch((e) => {
                alert('An error occured');
                return undefined;
            });
        
        if (respBody !== undefined) {
            setCookies('access', respBody['access'])
            router.push('/userinfo');
        }
    }

    return (
        <div className={styles.container}>
            <label htmlFor="username" >Username</label>
            <input type="text" placeholder="Enter username" name="username" required onChange={(e) => setUsername(e.target.value)} />

            <label htmlFor="password" >Password</label>
            <input type="password" placeholder="Enter username" name="username" required onChange={(e) => setPassword(e.target.value)} />

            <button type="submit" onClick={() => onSubmit()}>Login</button>
        </div>
    );
}

export default Login;
