import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class PivotProductsFeature extends BaseModel {
  @column()
  declare feature_id : string;

  @column()
  declare product_id : string;
   
}