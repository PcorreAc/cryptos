import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";

const InptuSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Formulario = ({ setMonedas }) => {
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState(false);
  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu Moneda", monedas);
  const [cryptoMoneda, SelectCryptoMoneda] = useSelectMonedas(
    "Elige tu CryptoMoneda",
    cryptos
  );

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=50&tsym=USD";
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      // console.log(resultado);

      const arrayCryptos = resultado.Data.map((crypto) => {
        const monedaCrypto = {
          id: crypto.CoinInfo.Name,
          nombre: crypto.CoinInfo.FullName,
        };
        return monedaCrypto;
      });
      setCryptos(arrayCryptos);
    };
    consultarAPI();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if ([moneda, cryptoMoneda].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    setMonedas({
      moneda,
      cryptoMoneda,
    });
  };

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectMonedas />
        <SelectCryptoMoneda />
        <InptuSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};

export default Formulario;
