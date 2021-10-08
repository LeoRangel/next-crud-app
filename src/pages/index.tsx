import { useEffect, useState } from "react";
import ClientCollection from "../backend/db/ClientCollection";
import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Client from "../core/Client";
import ClientRepository from "../core/ClientRepository";
import useClients from "../hooks/useClients";

export default function Home() {

  const {
    tableIsVisible,
    client,
    clients,
    newClient,
    saveClient,
    deletedClient,
    selectedClient,
    getAllClients,
    showTable
  } = useClients()

  return (
    <div className={`
      flex h-screen justify-center items-center
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>

      <Layout title="Simple crud app">
        {tableIsVisible ? (
          <>
            <div className="flex justify-end">
              <Button
                color="green"
                className="mb-4"
                onClick={newClient}
              >
                New Client
              </Button>
            </div>

            <Table
              clients={clients}
              // Submit functions via direct communication to this component
              selectedClient={selectedClient}
              deletedClient={deletedClient}
            />
          </>

        ) : (
          <Form
            client={client}
            canceled={() => showTable}
            changedClient={saveClient}
          />
        )}
      </Layout>

    </div>
  )
}