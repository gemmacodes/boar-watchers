import * as React from 'react';

export default function ControlPanel(props) {
    
    const eventNames = ['onDragStart', 'onDrag', 'onDragEnd'];

    function round5(value) {
        return (Math.round(value * 1e5) / 1e5).toFixed(5);
    }
    
  return (
    <div className="control-panel">
      <h3>Draggable Marker</h3>
      <p>Try dragging the marker to another location.</p>
      <div>
        {eventNames.map(eventName => {
          const {events = {}} = props;
          const lngLat = events[eventName];
          return (
            <div key={eventName}>
              <strong>{eventName}:</strong> {lngLat ? lngLat.map(round5).join(', ') : <em>null</em>}
            </div>
          );
        })}
      </div>
    </div>
  );
}