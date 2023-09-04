import { useState, FormEvent, useContext  } from 'react'

import Head from 'next/head'
import Image from 'next/image';
import styles from '../../../styles/home.module.scss';

import logoImg from '../../../public/logo.svg';

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

import { AuthContext } from '../../contexts/AuthContext'

import Link from 'next/link';

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('')
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

  async function handleSignUp(event: FormEvent){
    event.preventDefault();

    if(email === '' 
    || cpf === ''|| phone === ''|| address === ''|| cep === ''|| state === ''|| uf === ''|| city === ''|| neighborhood === ''
    || street === ''|| number === ''||  fullname === ''){
      alert("PREENCHA TODOS OS CAMPOS")
      return;
    }

    setLoading(true);

    let data = {
      name,
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
    }

   

    // Salve os dados no localStorage
    localStorage.setItem('userData2', JSON.stringify(data));

    setLoading(false);

    // Redirecione para a página /signup
    window.location.href = '/signup2';

  }

  return (
    <>
    <Head>
      <title>Faça seu cadastro agora!</title> 
    </Head>
    <div className={styles.containerCenter}>
     

      <div className={styles.login}>
        <h1>Destinatario</h1>

        <form onSubmit={handleSignUp}>
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
          
          <Button
            type="submit"
            loading={loading}
          >
            Cadastrar
          </Button>
        </form>

        <Link href="/">
           <a className={styles.text}>Voltar no Inicio</a>
        </Link>

      </div>
    </div>
    </>
  )
}
