import { useEffect, useState } from "react"
import ClientCollection from "../backend/db/ClientCollection"
import Client from "../core/Client"
import ClientRepository from "../core/ClientRepository"
import useTableOrForm from "./useTableOrForm"

export default function useClients() {

    const { formIsVisible, tableIsVisible, showTable, showForm } = useTableOrForm()

    const repo: ClientRepository = new ClientCollection()

    const [clients, setClients] = useState<Client[]>([])
    const [client, setClient] = useState<Client>(Client.vazio())

    useEffect(getAllClients, [])

    function getAllClients() {
        repo.getAll().then(clients => {
            setClients(clients)
            showTable()
        })
    }

    function selectedClient(client: Client) {
        setClient(client)
        showForm()
    }

    function newClient() {
        setClient(Client.vazio())
        showForm()
    }

    async function deletedClient(client: Client) {
        await repo.delete(client)
        getAllClients()
    }

    async function saveClient(client: Client) {
        await repo.save(client)
        getAllClients()
    }

    return {
        tableIsVisible,
        client,
        clients,
        newClient,
        saveClient,
        deletedClient,
        selectedClient,
        getAllClients,
        showTable
    }
}