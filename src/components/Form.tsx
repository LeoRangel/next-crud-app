import { useState } from "react";
import Client from "../core/Client";
import Button from "./Button";
import Input from "./Input";

interface FormProps {
    client: Client
    changedClient?: (client: Client) => void
    canceled?: () => void
}

export default function Form(props: FormProps) {

    const id = props.client?.id ?? null
    const [name, setName] = useState(props.client?.name ?? '')
    const [age, setAge] = useState(props.client?.age ?? 0)

    return (
        <div>
            {id ? (
                <Input
                    readOnly
                    text="Código"
                    value={id}
                    className="mb-5"
                />
            ) : false}

            <Input
                text="Name"
                value={name}
                onChange={setName}
                className="mb-5"
            />
            <Input
                text="Age"
                type="number"
                value={age}
                onChange={setAge}
            />

            <div className="mt-7 flex justify-end">
                <Button
                    color={"blue"}
                    className="mr-2"
                    onClick={() => {
                        props.changedClient?.(new Client(name, +age, id))
                    }}
                >
                    Save
                </Button>

                <Button onClick={props.canceled}>
                    Cancel
                </Button>
            </div>
        </div>
    )
}