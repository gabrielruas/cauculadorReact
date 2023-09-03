import React, { useContext, FormEvent, useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/home.module.scss';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { AuthContext } from '../contexts/AuthContext';

export default function Home() {
  const { signIn } = useContext(AuthContext);
  const [fullname, setFullname] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cep, setCep] = useState('');
  const [state, setState] = useState('');
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (
      email === '' 
    || cpf === ''|| phone === ''|| address === ''|| cep === ''|| state === ''|| uf === ''|| city === ''|| neighborhood === ''
    || street === ''|| number === ''||  fullname === ''
    ) {
      alert('PREENCHA TODOS OS DADOS ');
      return;
    }

    setLoading(true);

    let data = {
      fullname,
      cpf,
      phone,
      email,
      address,
      cep,
      state,
      uf,
      city,
      neighborhood,
      street,
      number,
      complement,
      password,
    };

    // Salve os dados no localStorage
    localStorage.setItem('userData', JSON.stringify(data));

    await signIn(data);

    setLoading(false);

    // Redirecione para a página /signup
    window.location.href = '/signup';
  }

  return (
    <>
      <Head>
        <title>Entre com Endereço </title>
      </Head>
      <div className={styles.containerCenter}>
       

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Entre Com Nome"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <Input
              placeholder="Entre Com CPF"
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <Input
              placeholder="Entre Com PHONE"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              placeholder="Entre Com EMAIL"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Entre Com Endereço"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Input
              placeholder="Entre Com CEP"
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
            <Input
              placeholder="Entre Com STATE"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <Input
              placeholder="Entre Com UF"
              type="text"
              value={uf}
              onChange={(e) => setUf(e.target.value)}
            />
            <Input
              placeholder="Entre Com CITY"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Input
              placeholder="Entre Com BAIRRO"
              type="text"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
            />
            <Input
              placeholder="Entre Com RUA"
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            <Input
              placeholder="Entre Com N"
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <Input
              placeholder="Entre Com Descrição"
              type="text"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            />
            <Button type="submit" loading={loading}>
              Acessar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
