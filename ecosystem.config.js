module.exports = {
    apps: [{
        name: "confeccao-api",
        cwd: './dist/',
        script: "./index.js",
        watch: false,
        instances: 4,
        exec_mode: "cluster",
        source_map_support: true,
        log_date_format: 'YYYY-MM-DD HH:mm:ss',
        env: {
            DEVELOPMENT: true,
            PORT: 3030,
            CLIENT_SECRET: "48cf66a8095af6ef07061475dfb905de94db7a8f0d4d5a6008a12635f2f37117",
            TOKEN_EXPIRES: 3600,
            DB_HOST: "127.0.0.1",
            DB_PORT: 3306,
            DB_DATABASE: "confeccao",
            DB_USERNAME: "cesar",
            DB_PASSWORD: "91344356",
            PUSH_PUBLIC_KEY: "BKWiZwn04o6hd0jRj8YS2KQongnFBJGrqql7_yZQR6TWQuAIDYxPrkgfbC8Z16h_8s103A6fUJ1wQ0CHnzfi7gk",
            PUSH_PRIVATE_KEY: "XeUgymVifP_IpOivQTatBT1bjJP6turOez2veEFSjfY",
            BREVO_API_KEY: "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"
        },
    }]
}
