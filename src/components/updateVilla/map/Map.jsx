import React from 'react'

const Map = () => {
  const position = [36.68169635500119, 29.09769630376116];
  return (
    <>
        <div className="mapCoordinats">
            <div>
              <label>Latitude:</label>
              <input type="text" placeholder="Latitude Coordinat" />
            </div>
            <div>
              <label>Longitude:</label>
              <input type="text" placeholder="Longitude Coordinat" />
            </div>
          </div>
          <div>
            <Map position={position} />
          </div>
    </>
  )
}

export default Map