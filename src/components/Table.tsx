import Client from "../core/Client";
import { IconDelete, IconEdit } from "./Icons";

interface TableProps {
    clients: Client[]
    // Receive functions through direct communication from the component that calls that component
    selectedClient?: (client: Client) => void
    deletedClient?: (client: Client) => void
}

export default function Table(props: TableProps) {

    // Functions have been passed?
    const displayActions = (props.selectedClient || props.deletedClient)

    function renderTableHeader() {
        return (
            <tr>
                <th className="text-left p-4">Code</th>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Age</th>
                {displayActions ? <th className="p-4">Actions</th> : false}
            </tr>
        )
    }

    function renderTableRows() {
        return props.clients.map((client, i) => {
            return (
                <tr
                    key={client.id}
                    className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}
                >
                    <td className="text-left p-4">{client.id}</td>
                    <td className="text-left p-4">{client.name}</td>
                    <td className="text-left p-4">{client.age}</td>

                    {/* Render all array clients as table rows */}
                    {displayActions ? renderActions(client) : false}
                </tr>
            )
        })
    }

    function renderActions(client: Client) {
        return (
            <td className="flex justify-center">

                {props.selectedClient ? (
                    <button onClick={() => props.selectedClient?.(client)} className={`
                        flex justify-center itens-center
                        text-green-600 rounded-full p-2 m-1
                        hover:bg-purple-50
                    `}>
                        {IconEdit}
                    </button>
                ) : false}

                {props.deletedClient ? (
                    <button onClick={() => props.deletedClient?.(client)} className={`
                    flex justify-center itens-center
                    text-red-500 rounded-full p-2 m-1
                    hover:bg-purple-50
                `}>
                        {IconDelete}
                    </button>
                ) : false}

            </td>
        )
    }

    return (
        <table className={`w-full rounded-xl overflow-hidden`}>
            <thead className={`
                text-gray-100
                bg-gradient-to-r from-purple-500 to-purple-800
            `}>
                {renderTableHeader()}
            </thead>
            <tbody>
                {renderTableRows()}
            </tbody>
        </table>
    )
}