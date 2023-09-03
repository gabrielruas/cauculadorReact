import { createContext, ReactNode, useState } from 'react';

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router';


type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignInProps = {
  email: string;
  password: string;
}

type SignUpProps = {
  name: string;
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)


export function signOut(){
  try{
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  }catch{
    console.log('erro ao deslogar')
  }
}

export function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps){
    try{
      const response = await api.post('/session', {
        email,
        password
      })
      // console.log(response.data);

      const { id, name, token } = response.data;

      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: "/" // Quais caminhos terao acesso ao cookie
      })

      setUser({
        id,
        name,
        email,
      })

      //Passar para proximas requisiçoes o nosso token
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      //Redirecionar o user para /dashboard
      Router.push('/dashboard')


    }catch(err){
      console.log("ERRO AO ACESSAR ", err)
    }
  }


  async function signUp({ name, email, password}: SignUpProps){
    try{
      console.log("INICIO DO CADASTRO !")

      // Recuperar os dados do localStorage
      const savedData = localStorage.getItem('userData');

      if (savedData) {
        // Converter os dados de volta para o formato desejado (por exemplo, JSON)
        const parsedData = JSON.parse(savedData);
        
        // Agora, você pode usar os dados recuperados
        console.log(parsedData.email);

        // Faça o que precisar com os dados recuperados, por exemplo, definir em um estado
        // setState(parsedData);
      } else {
        console.log('Nenhum dado encontrado');
      }

      const response = await api.post('/users', {
        name,
        email,
        password
      })

      console.log("CADASTRADO COM SUCESSO!")

      Router.push('/')

    }catch(err){
      console.log("erro ao cadastrar ", err)
    }
  }

  return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}