import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Error } from './Error';
import { useSelectMonedas } from '../hooks/useSelectMonedas';

const InputSubmit = styled.input`
    background-color: #e066d6;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    font-size: 20px;
    border-radius: 5px;
    text-transform: uppercase;
    margin-top: 30px;

    &:hover{
        background-color: #d355c8;
        cursor: pointer;
    }

`


export const Formulario = ( { setDatos }) => {

    const monedas = [
        {id: 'USD', nombre: 'Dolar de Estados Unidos'},
        {id: 'MXN', nombre: 'Peso Mexicano'},
        {id: 'EUR', nombre: 'Euro'},
        {id: 'GBP', nombre: 'Libra Esterlina'}
    ]

    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);
    
    const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu moneda', monedas);

    const [ criptoMoneda, SelectCriptoMonedas ] = useSelectMonedas('Elige tu Cryptomoneda', criptos);
    
    useEffect(() => {
        
       const consultarAPI = async () => {
            const URL = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
            const respuesta = await fetch( URL );
            const resultado = await respuesta.json();
        
            const arrayCriptos = resultado.Data.map( cripto => {
            const objeto = {
                id: cripto.CoinInfo.Name,
                nombre: cripto.CoinInfo.FullName
            } 
            return objeto
            
        })
        
            setCriptos(arrayCriptos);
            
       }
       consultarAPI();
      
       
    }, []);
        
    
   const handleSubmit = (e)=>{
        e.preventDefault();
        if ([moneda, criptoMoneda].includes('')) {
            setError(true);
           return 
        }
        setError(false);
        setDatos({
            moneda,
            criptoMoneda
        })
   }

  return (
    <>
        {
            error && <Error> Todos los campos son obligatorios</Error>
        }
        <form
            onSubmit={ handleSubmit }
        >
            <SelectMonedas/>
            <SelectCriptoMonedas/>
            
            <InputSubmit 
                type="submit"
                value= 'Cotizar'
            />
        </form>
    </>
  )
}
