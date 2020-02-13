const Bus = require('./Bus.js')

class MTAStop {
  /**
   * MTA Bus Stop
   * @param {MTAClient} client Instantiating client
   * @param {String} stop Stop code
   * @param {Object} data Data received from api
   */
  constructor(client, stop, data) {
    console.log(data)
    this.client = client
    this.data = data.Siri.ServiceDelivery
    this.stop = stop
  }
  
  /**
   * Timestamp of request response
   * @type {Date} Timestamp
   */
  get responseTimestamp() {
    return new Date(this.data.ResponseTimestamp)
  }
  
  /**
   * Buses relative to stop
   * @type {Array<Bus>} Array of buses
   */
  get buses() {
    return this.data
      .StopMonitoringDelivery[0]
      .MonitoredStopVisit
      .map(x => new Bus(this, x))
  }
}

module.exports = MTAStop
