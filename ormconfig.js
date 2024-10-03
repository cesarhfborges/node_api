module.exports = {
    type: "mysql",
    host: "192.168.68.230",
    port: 3306,
    username: "cesar",
    password: "91344356",
    database: "confeccao",
    synchronize: true,
    entities: [
        "src/entities/*{.js,.ts}"
    ],
    // subscribers: [
    //     "src/subscriber/*.js"
    // ],
    // migrations: [
    //     "src/migration/*.js"
    // ],
    cli: {
        entitiesDir: "src/entities",
        // "migrationsDir": "src/migration",
        // "subscribersDir": "src/subscriber"
    }
}