'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class Product
 */
class Product extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'ProductHook.method')
    // Indexes:
    // this.index({}, {background: true})
  }
  /**
   * Product's schema
   */
  static get schema () {
    return {

    }
  }
}

module.exports = Product.buildModel('Product')
