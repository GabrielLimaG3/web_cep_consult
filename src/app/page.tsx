"use client";

import { useState } from "react";

interface ICep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export default function Home() {
  const [data, setData] = useState<ICep | null>();
  const [cep, setCep] = useState<string>();

  const Data = async () => {
    setData(null);

    if (!cep || cep.length < 8 || cep.length > 9) {
      alert("Digite um cep valido");
      return;
    }
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const resjson: ICep = await res.json();
    if (resjson.cep === undefined) {
      alert("Cep não encontrado");
      return;
    }
    setData(resjson);
  };

  return (
    <>
      <div className="flex flex-col w-screen h-screen justify-center items-center">
        <div className="flex w-[19rem] items-center flex-col">
          <input
            placeholder="Digite o cep"
            className="w-full rounded text-black p-[5px]"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            type="text"
          />
          <button
            onClick={Data}
            className="block my-[10px] p-[5px] w-full rounded bg-white text-[#355867]"
          >
            Busca
          </button>
          {data ? (
            <>
              <div className="flex py-[45px] w-full px-[15px] rounded-xl bg-white flex-col">
                <h1 className="text-black">
                  <strong>cep :</strong> {data?.cep}
                </h1>
                <h1 className="text-black">
                  <strong>logradouro :</strong> {data?.logradouro}
                </h1>
                <h1 className="text-black">
                  <strong>complemento :</strong> {data?.complemento}
                </h1>
                <h1 className="text-black">
                  <strong>bairro :</strong> {data?.bairro}
                </h1>
                <h1 className="text-black">
                  <strong>localidade :</strong> {data?.localidade}
                </h1>
                <h1 className="text-black">
                  <strong>uf :</strong> {data?.uf}
                </h1>
                <h1 className="text-black">
                  <strong>ibge :</strong> {data?.ibge}
                </h1>
                <h1 className="text-black">
                  <strong>gia :</strong> {data?.gia}
                </h1>
                <h1 className="text-black">
                  <strong>ddd :</strong> {data?.ddd}
                </h1>
                <h1 className="text-black">
                  <strong>siafi :</strong> {data?.siafi}
                </h1>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
