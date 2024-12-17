"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    cep: yup
      .string()
      .min(8, "no minimo 8 caracteres")
      .max(9, "no maximo 9 caracteres")
      .required(),
  })
  .required();

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [data, setData] = useState<ICep | null>();
  const [cep, setCep] = useState<string>();

  const submit = async () => {
    try {
      setData(null);
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const resjson: ICep = await res.json();
      setData(resjson);
    } catch {
      setCep("");
    }
  };

  return (
    <>
      <div className="flex flex-col w-screen h-screen justify-center items-center">
        <div className="flex w-[19rem] items-center flex-col">
          <form onSubmit={handleSubmit(submit)}>
            <input
              {...register("cep")}
              placeholder="Digite o CEP"
              className="w-full rounded text-black p-[5px]"
              value={cep || ""}
              onChange={(e) => setCep(e.target.value)}
              type="text"
            />
            {errors.cep ? (
              <p className="rounded-sm mt-1 p-[1px] font-semibold text-[14px] bg-[#F7D3D4] text-[#AE666E]">
                {errors.cep?.message}
              </p>
            ) : null}

            <button
              onClick={submit}
              className="block my-[10px] p-[5px] w-full rounded bg-white text-[#355867]"
            >
              Busca
            </button>
          </form>
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
