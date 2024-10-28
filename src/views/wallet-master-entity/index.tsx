import React, { useEffect, useState } from "react";
import { axiosInstance, getAccessToken } from "../../utils/genericOps";
import { entityMaster } from "../../utils/constants";
import "./index.css";

export default function WalletMasterEntity(props: any) {
  const [entity, setEntity] = useState<any>({});

  useEffect(() => {
    const getMasterEntity = async () => {
      const token = await getAccessToken();
      const entityMasterRequest = await axiosInstance.get(
        `${import.meta.env.VITE_PUBLIC_API_ENTITIES}/${entityMaster}`,
        {
          headers: {
            "X-User-Bearer": `Bearer ${token}`,
          },
        }
      );
      setEntity(entityMasterRequest.data);
    };
    getMasterEntity();
  }, []);

  return (
    <>
      <div className="master-wallet-entity">
        <h1>Nombre completo: {entity?.name?.fullName}</h1>
        <h2>
          Tipo de entidad:
          {entity?.entityType === "legalEntity" ? "Entidad legal" : "Persona fisica"}
        </h2>
        <h2>Fecha de creación: {entity?.creationDate}</h2>
      </div>
    </>
  );
}
