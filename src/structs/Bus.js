class MTABus {
  
  /**
   * Bus relative to stop
   * @param {MTAStop} Stop at which the bus object was received
   * @param {Object} data Bus object
   */
  constructor(stop, data) {
    this.stop = stop
    this.data = data.MonitoredVehicleJourney
  }
  
  /**
   * Bus ID
   * @type {String}
   */
  get vehicle() {
    return this.data.VehicleRef.split('_')[1]
  }
  
  /**
   * Bus Line Name (ex: B67)
   * @type {String}
   */
  get line() {
    return this.data.PublishedLineName
  }
  
  /**
   * Direction bus is going
   * @type {Integer}
   */
  get direction() {
    return parseInt(this.data.DirectionRef)
  }
  
  /**
   * Origin Stop Code
   * @type {String}
   */
  get origin() {
    return this.data.OriginRef.split('_')[1]
  }
  
  /**
   * Fetch the origin stop
   * @returns {Promise<Stop>} Origin stop
   */
  async fetchOrigin() {
    return this.stop.client.fetchStop(this.origin)
  }
  
  /**
   * Destination Stop Code
   * @type {String}
   */
  get destination() {
    return this.data.DestinationRef.split('_')[1]
  }
  
  /**
   * Fetch the destination stop
   * @returns {Promise<Stop>} Destination stop
   */
  async fetchDestination() {
      return this.stop.client.fetchStop(this.destination)
  }
  
  /**
   * Arrives object
   * @type {Object} obj
   * @prop {Date} at Date bus is expected to arrive
   * @prop {Integer} in Time in minutes til bus arrives
   */
  get arrives() {
    const arrivesAt = new Date(this.data.MonitoredCall.ExpectedArrivalTime)
    return {
      at: arrivesAt || null,
      in: ((arrivesAt.getTime() - this.stop.responseTimestamp.getTime()) / 60000).toFixed(0) || null
    }
  }
  
  /**
   * Distance object
   * @type {Object} obj
   * @prop {String} text Presentable text describing how far away the bus is
   * @prop {Integer} stops Stops away
   * @prop {Integer} meters Length (in meters) bus is from stop
   */
  get distance() {
    const Distance = this.data.MonitoredCall.Extensions.Distances
    return {
      text: Distance.PresentableDistance,
      stops: Distance.StopsFromCall,
      meters: Distance.DistanceFromCall
    }
  }
  
  /**
   * Longitude of bus
   * @type {Integer}
   */
  get long() {
    return this.data.VehicleLocation.Longitude
  }
  
  /**
   * Latitude of bus
   * @type {Integer}
   */
  get lat() {
      return this.data.VehicleLocation.Latitude
  }
}

module.exports = MTABus
