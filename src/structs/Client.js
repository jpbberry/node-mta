const Constants = require('../Constants.js')
const Request = require('../../req')

const Stop = require('./Stop.js')

class MTAClient {
  /**
   * Base MTA client
   * @param {String} key MTA api key
   * @param {Objects} opts Extra options
   */
  constructor(key, opts) {
    this.key = key
    this.options = {
      ...Constants.defaultOptions,
      ...opts
    }
    this.api = Request(this.options.api)
  }
  
  /**
   * Fetches a stope
   * @param {String} code Stop code
   * @param {String} StopMonitoringDetailLevel Default: normal
   * @returns {Promise<Stop>} Fetched stop
   */
  async fetchStop(MonitoringRef, StopMonitoringDetailLevel = 'normal') {
    const data = await this.api
      .siri('stop-monitoring.json')
      .get({
        query: {
          key: this.key,
          MonitoringRef, StopMonitoringDetailLevel
        }
      })
    return new Stop(this, MonitoringRef, data)
  }
}

module.exports = MTAClient














