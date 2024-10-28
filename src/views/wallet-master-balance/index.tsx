import React from "react";
import useGetBalance from "../../hooks/useGetBalance";
import { entityMaster } from "../../utils/constants";
import "./index.css";
import CardBalance from "../../components/card-balance";

export default function WalletMasterBalance() {
  const { balance, loading, error }: any = useGetBalance(entityMaster);

  return (
    <div className="master-wallet-balance">
      {loading && <h1>Cargando...</h1>}
      {error && <h1>Error al cargar el balance</h1>}
      <div className="master-wallet-balance__carrousel">
        {balance?.map((paymentMethod: any) => (
          <CardBalance
            key={paymentMethod.paymentMethodReference}
            paymentMethod={paymentMethod}
          />
        ))}
      </div>
    </div>
  );
}
