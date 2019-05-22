'use strict'
const Product = use('App/Models/Product')

class GalleryController {
  async index ({ request }) {
    request.query = request.all().q || {}
    let findQuery = {}
    Object.keys(request.query).forEach((prop) => {
      if (prop === 'carat' || prop === 'price' || prop === 'color') {
        let param = request.query[prop].split('-')
        console.log(prop, typeof param[0])
        if (!Number.isNaN(parseFloat(param[0]))) {
          param[0] = parseFloat(param[0])
          param[1] = parseFloat(param[1])
        }
        findQuery[prop] = { $gte: param[0], $lte: param[1] }
      } else {
        const allowedFields = ['clarity', 'cut', 'polish', 'symmetry', 'fluorescent']
        allowedFields.forEach((allowedField) => {
          if (allowedField in request.query) {
            findQuery[allowedField] = { $in: request.query[allowedField].split(',') }
          }
        })
      }
    })
    let q = Product.find(findQuery)
    q.limit(100)
    let data = await q
    return {
      'server': { 'totalPages': 56, 'resultsCount': { 'min': 1, 'max': 18, 'total': '195,313' } },
      'products': data,
      'isDyoe': false,
      'isDyo': true,
      'isFancyGal': false,
      'isCTDyo': false,
      'queryFlatMode': false,
      'firstTimePage': true,
      'firstTimeLoad': true,
      'viewType': 'list',
      'ready': false,
      'rpp': 18,
      'pageCopy': 1,
      'query': {
        'carat': [0.299999999999999988897769753748434595763683319091796875, 14],
        'clarity': [3, 10],
        'color': [14, 23],
        'cut': [1, 5],
        'depth': [45, 85],
        'polish': [1, 5],
        'price': [1, 599999],
        'symmetry': [1, 5],
        'fluorescence': [1, 5],
        'table': [45, 85],
        'fancy_intensity': [2, 6]
      },
      'selectedSort': { 'selection': {} },
      'group': 'group_id',
      'extraData': {},
      'sortOptions': [{ 'text': 'Choose a sort' }, {
        'value': 'price ASC',
        'text': 'Price - low to high'
      }, { 'value': 'price DESC', 'text': 'Price - high to low' }, {
        'value': 'carat ASC',
        'text': 'Carat - low to high'
      }, { 'value': 'carat DESC', 'text': 'Carat - high to low' }, {
        'value': 'diamond_cut ASC',
        'text': 'Cut - low to high'
      }, { 'value': 'diamond_cut DESC', 'text': 'Cut - high to low' }, {
        'value': 'color ASC',
        'text': 'Color - low to high'
      }, { 'value': 'color DESC', 'text': 'Color - high to low' }, {
        'value': 'clarity ASC',
        'text': 'Clarity - low to high'
      }, { 'value': 'clarity DESC', 'text': 'Clarity - high to low' }],
      'queryParams': {
        'q': { 'has_diamond_video': '', 'has_real_image': '', 'fancy_color': '', 'shape': '' },
        'page': 1
      },
      'pageType': 'gallery',
      'filterLoopArray': {
        'price': { 'range-filter': true },
        'carat': { 'range-filter': true },
        'color': { 'range-filter': true, 'alphabet-range-filter': true },
        'clarity': { 'alphabet-range-filter': true },
        'cut': { 'fairToFinest': true },
        'polish': { 'fairToFinest': true },
        'symmetry': { 'fairToFinest': true },
        'fluorescence': { 'noneToVeryStrong': true },
        'table': { 'range-filter': true },
        'depth': { 'range-filter': true }
      },
      'priceRangeSlider': {
        'minValue': 1,
        'maxValue': 599999,
        'grid_num': 8,
        'min_pos': -87.7000000000000028421709430404007434844970703125
      },
      'caratRangeSlider': {
        'minValue': 0.299999999999999988897769753748434595763683319091796875,
        'maxValue': 14,
        'grid_num': 8,
        'min_pos': 2,
        'step': 0.1000000000000000055511151231257827021181583404541015625
      },
      'cutRangeSlider': { 'minValue': 1, 'maxValue': 5, 'steps': ['Fair', 'Good', 'Very Good', 'Excellent', 'Finest'] },
      'fancy_intensityRangeSlider': null,
      'colorRangeSlider': {
        'minValue': 'D',
        'maxValue': 'M',
        'steps': ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']
      },
      'clarityRangeSlider': {
        'minValue': 3,
        'maxValue': 10,
        'steps': ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1']
      },
      'polishRangeSlider': {
        'minValue': 1,
        'maxValue': 5,
        'steps': ['Fair', 'Good', 'Very Good', 'Excellent', 'Finest']
      },
      'symmetryRangeSlider': {
        'minValue': 1,
        'maxValue': 5,
        'steps': ['Fair', 'Good', 'Very Good', 'Excellent', 'Finest']
      },
      'fluorescenceRangeSlider': {
        'minValue': 1,
        'maxValue': 5,
        'steps': ['None', 'Faint', 'Medium', 'Strong', 'Very Strong']
      },
      'tableRangeSlider': { 'minValue': 45, 'maxValue': 85 },
      'depthRangeSlider': { 'minValue': 45, 'maxValue': 85 },
      'ajaxUrl': 'dyo/diamond.dhtml',
      'ajaxJsonUrl': 'diamonds',
      'ajaxDataStatus': 'loaded'
    }
  }
}

module.exports = GalleryController
