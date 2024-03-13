import factory from '@adonisjs/lucid/factories'
import Catalog from '#models/catalog'

export const CatalogFactory = factory
  .define(Catalog, async ({ faker }) => {
    return {}
  })
  .build()