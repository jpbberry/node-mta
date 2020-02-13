# node-mta

Library for requesting and reading MTA bus time systems. NYC

Current features:
- Fetching stops
- Telling arrival times for buses
- Telling info about arriving buses

Example, fetching stops, and telling time til arrival

```js
// Require the library
const { Client } = require('node-mta')

// Create client
const client = new Client(MTA_OBA_KEY)

// Fetch stop 305634
client.fetchStop('305634').then(stop => {
    // Getting closest bus
    const closestBus = stop.buses[0]
    
    // Finding time til arrival
    console.log(closestBus.arrives.in) // Minutes => 5
    
    // Finding stops away
    console.log(closestBus.distance.stops) // => 3
})
```