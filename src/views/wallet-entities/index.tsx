import { useEffect, useState } from "react";
import "./index.css";
import { axiosInstance, getAccessToken } from "../../utils/genericOps";
import Paper from "@mui/material/Paper/Paper";
import { DataGrid } from "@mui/x-data-grid/DataGrid/DataGrid";
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import Typography from "@mui/material/Typography/Typography";

export default function WalletEntities() {
    const [entities, setEntities] = useState<any>({});
    // const [totalCount, setTotalCount] = useState<any>({});
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nombre', width: 130 },
        { field: 'entityStatus', headerName: 'Estado', width: 130 },
        { field: 'creationDate', headerName: 'Fecha Creación', width: 130 }
    ];

    useEffect(() => {
        const getEntities = async () => {
            const token = await getAccessToken();
            const entitiesResponse = await axiosInstance.get(
                `${import.meta.env.VITE_PUBLIC_API_ENTITIES}?pageSize=50`,
                {
                    headers: {
                        "X-User-Bearer": `Bearer ${token}`,
                    },
                }
            );
            const data = entitiesResponse.data.entities.map((entity) => {
                return {
                    id: entity.entityId,
                    name: entity.name.fullName,
                    entityStatus: entity.entityStatus,
                    creationDate: entity.creationDate
                };
            }
            );
            setEntities(data);
            // setTotalCount(entitiesResponse.data.totalCount);
        };
        getEntities();
    }, []);

    return (
        <>
            <Typography variant="h3" gutterBottom>
                Entidades
            </Typography>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={entities}
                    columns={columns}
                    sx={{ border: 0 }}
                />
            </Paper>
        </>
    );
}


