export default () => ({
  kafka: {
    bootstrapServer: process.env.KAFKA_BOOTSTRAP_SERVER,
    schemaRegistry: process.env.SCHEMA_REGISTRY_URL,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
})
