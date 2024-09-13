const CategorySelect = () => {
    return (
      <select id="make" name="make" className="select rounded">
        <option></option>
        <optgroup label="Popular Brand"></optgroup>
        <option value="Cars">Cars</option>
        <option value="Bikes">Bikes</option>
        <option value="Mobile Phones">Mobile Phones</option>
        <option value="Mobile Phones">Computer and Accsesories</option>
        <option value="Home Appliances">Home Appliances</option>
        <option value="Land">Land</option>
        <option value="Services">Services</option>
      </select>
    );
  };
  
  const StateSelect = ({ states, setLocation }) => {
    return (
      <select
        id="state"
        name="state"
        className="select rounded"
        onChange={(e) => {
          const { value } = e.target;
          setLocation(prevLocation => ({
            ...prevLocation,
            state: value,
            city: "",  // Reset city and place when state changes
            place: ""
          }));
        }}
      >
        <option value="">Select a State</option>
        {states.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
    );
  };
  
  const CitySelect = ({ cities, state, setLocation }) => {
    return (
      <select
        id="city"
        name="city"
        className="select rounded"
        onChange={(e) => {
          const { value } = e.target;
          setLocation(prevLocation => ({
            ...prevLocation,
            city: value,
            place: ""  // Reset place when city changes
          }));
        }}
      >
        <option value="">Select a City</option>
        {cities[state] && cities[state].map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    );
  };
  
  const PlaceSelect = ({ places, city, setLocation }) => {
    return (
      <select
        id="place"
        name="place"
        className="select rounded"
        onChange={(e) => {
          const { value } = e.target;
          setLocation(prevLocation => ({
            ...prevLocation,
            place: value
          }));
        }}
      >
        <option value="">Select a Place</option>
        {places[city] && places[city].map(place => (
          <option key={place} value={place}>{place}</option>
        ))}
      </select>
    );
  };

// Named exports
export { CategorySelect, StateSelect, CitySelect, PlaceSelect };

// Default export
export default { CategorySelect, StateSelect, CitySelect, PlaceSelect };