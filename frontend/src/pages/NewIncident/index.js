import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api.js';

import './styles.css';

import logo from '../../assets/logo.svg';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ong_id = localStorage.getItem('ong_id');

    async function handleNewIncident(event) {
        event.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            api.post('incidents', data, {
                headers: {
                    authorization: ong_id,
                }
            })

            history.push('/profile');
        } catch (error) {
            alert('Não foi possível cadastrar um novo caso, tente novamente.');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva um caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={event => setTitle(event.target.value)} />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={event => setDescription(event.target.value)} />
                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={event => setValue(event.target.value)} />
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}