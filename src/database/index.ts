import { Connection, createConnection, getConnectionOptions } from "typeorm"

export default async ():Promise<Connection> => {
    const defaultConnection = await getConnectionOptions()

    return (
        createConnection(
            Object.assign(defaultConnection, {
                database: process.env.NODE_ENV == "test " ? "./src/database/jest-test.sqlite" : defaultConnection.database
            })
        )
    )
}