import { useEffect, useState } from "react";
import Entity from "../../components/entity";
import "./index.css";
import { axiosInstance, getAccessToken } from "../../utils/genericOps";

export default function WalletEntities() {
    const [entities, setEntities] = useState<any>({});

    useEffect(() => {
        const getEntities = async () => {
            const token = await getAccessToken();
            console.log(`token de prueba`);
            console.log(token);

            const entitiesResponse = await axiosInstance.get(
                `${import.meta.env.VITE_PUBLIC_API_ENTITIES}?pageSize=50`,
                {
                    headers: {
                        "X-User-Bearer": `Bearer ${token}`,
                    },
                }
            );
            setEntities(entitiesResponse.data.entities);
        };
        getEntities();
    }, []);

    console.log(entities)

    return (
        <table>
            <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Fecha Creación</th>
            </tr>
            {entities?.map((entity) => (
                <Entity entity={entity} />
            ))}
        </table>
    );
}
