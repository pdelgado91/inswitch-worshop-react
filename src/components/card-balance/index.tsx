import { useCallback, useEffect, useMemo, useState } from "react";
import "./index.css";
import { getDarkColor } from "../../utils/genericOps";

export default function CardBalance({
  paymentMethod,
}: {
  paymentMethod: {
    balance: {
      amounts: {
        amount: string;
        label: string;
      }[];
      currency: string;
    };
    paymentMethodAlias: string;
    paymentMethodReference: string;
    paymentMethodType: string;
    paymentMethodTypeClass: string;
    color: string;
  };
}) {
  const [copied, setCopied] = useState(false);
  const findAmount = (label: string) => {
    const amount = paymentMethod?.balance?.amounts?.find(
      (amount: any) => amount.label === label
    )?.amount;
    return amount ? parseFloat(amount).toFixed(2) : "n/a";
  };
  const available = findAmount("available");
  const reserved = findAmount("reserved");
  const unsettled = findAmount("unsettled");
  const disputing = useCallback(() => findAmount("disputing"), []);
  const currency = paymentMethod?.balance?.currency;
  const color = useMemo(() => getDarkColor(), []);

  const {
    paymentMethodAlias,
    paymentMethodReference,
    paymentMethodType,
    paymentMethodTypeClass,
  } = paymentMethod;

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentMethodReference);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  return (
    <div
      className="card-balance"
      style={{
        backgroundColor: color || "#fff",
      }}
    >
      <p className="card-balance__alias">
        <span className="card-balance__alias-label">Alias:</span>
        <span className="card-balance__alias-value">{paymentMethodAlias}</span>
      </p>
      <p className="card-balance__alias">
        <span className="card-balance__alias-label">Tipo y clase: </span>
        <span className="card-balance__alias-value">
          {paymentMethodType + " " + paymentMethodTypeClass}
        </span>
      </p>
      <div className="card-balance__amounts">
        <p>
          <span className="card-balance__label">Disponible:</span>
          <span className="card-balance__value">
            {available} {currency}
          </span>
        </p>
        <p>
          <span className="card-balance__label">Reservado:</span>
          <span className="card-balance__value">
            {reserved} {currency}
          </span>
        </p>
        <p>
          <span className="card-balance__label">Por liquidar:</span>
          <span className="card-balance__value">
            {unsettled} {currency}
          </span>
        </p>
        <p>
          <span className="card-balance__label">Disputando:</span>
          <span className="card-balance__value">
            {disputing()} {currency}
          </span>
        </p>
      </div>
      <div className="card-balance__reference">
        Referencia de método de pago: {paymentMethodReference}
        <button onClick={handleCopy}>{copied ? "Copiado!!" : "Copiar referencia"}</button>
      </div>
    </div>
  );
}
