import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';

import api from '../../services/api.js';
import logo from '../../assets/logo.svg';
import heroes from '../../assets/heroes.png';

export default function Logon() {
    const [ong_id, set_ong_id] = useState('');
    const history = useHistory();

    async function handleLogon(event) {
        event.preventDefault();

        try {
            const _response = await api.post('sessions', { id: ong_id });

            localStorage.setItem('ong_id', ong_id);
            localStorage.setItem('name', _response.data.name);

            history.push('/profile');
        } catch (error) {
            alert('Falha na autenticação, tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="Be The Herp" />

                <form onSubmit={handleLogon}>
                    <h1>Faça seu Logon</h1>

                    <input
                        placeholder="Sua ID"
                        value={ong_id}
                        onChange={event => set_ong_id(event.target.value)} />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroes} alt="Heroes" />
        </div>
    );
}