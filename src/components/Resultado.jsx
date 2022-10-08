import styled from '@emotion/styled';

const Contenedor = styled.div`
    color: #fff;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
`
const Texto = styled.p`
    
`
const Precio = styled.p`
    font-size: 20px;
    span {
        font-weight: 700;
    }
`
const Imagen =  styled.img`
    display: block;
    width: 40%;
    height: 40%;
`
export const Resultado = ({ resultadopar }) => {
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = resultadopar
  return (
    <Contenedor>
        <Imagen src={ `https://cryptocompare.com/${IMAGEURL}`} alt="imagen cripto" />
        <div>
            <Precio>El precio es de: <span>{ PRICE }</span></Precio>
            <p>El precio más alto del díae: <span>{ HIGHDAY }</span></p>
            <p>El precio más bajo del día: <span>{ LOWDAY }</span></p>
            <p>Variación últimas 24hrs: <span>{ CHANGEPCT24HOUR }</span></p>
            <p>Última actualización: <span>{ LASTUPDATE }</span></p>
        </div>
    </Contenedor>
  )
}
