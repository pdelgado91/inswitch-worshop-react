export default function Entity({ entity }) {
    return (
        <tr>
            <td>{entity?.entityId}</td>
            <td>{entity?.name?.fullName}</td>
            <td>{entity?.entityStatus}</td>
            <td>{entity?.creationDate}</td>
        </tr>);
}