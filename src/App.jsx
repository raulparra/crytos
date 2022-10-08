import { useEffect, useState } from 'react'

import styled from '@emotion/styled';
import ImagenCripto from './img/imagen-criptos.png';
import { Formulario } from './components/Formulario';
import { Resultado } from './components/Resultado';
import { Spiner } from './components/Spiner';


const Iamgen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    colum-gap: 2rem;
  }`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: '';
    width: 200px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
    
  }
`

function App() {
  const [datos, setDatos] = useState({});
  const [resultadopar, setResultadopar] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(datos).length > 0) {
      const cotizarCrypto = async () => {
        setCargando(true);

        const { moneda, criptoMoneda } = datos;

        const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`
        const respuesta =  await fetch(URL);
        const resultado = await respuesta.json();
        setResultadopar(resultado.DISPLAY[criptoMoneda][moneda]);
        setCargando(false);
        
      }
      cotizarCrypto();
    }
  }, [datos])
  

  return (
    <Contenedor>
      <Iamgen
        src={ ImagenCripto }
        alt = 'imagen cripto'
        />
        <div>
      <Heading>Cotiza Criptomonedas</Heading>
      <Formulario
        setDatos = { setDatos }
      />
      {
        cargando && <Spiner/>
      }
      {
        resultadopar.PRICE && <Resultado resultadopar = { resultadopar }/>
      }
        </div>
      
    </Contenedor>
  )
}

export default App
