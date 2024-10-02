module.exports = {
    apps: [{
        name: "confeccao-api",
        script: "./dist/index.js",
        watch: false,
        instances: 4,
        exec_mode: "cluster",
        env_production: {
            NODE_ENV: "production"
        },
    }]
}
