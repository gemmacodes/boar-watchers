import React, { useState, useEffect } from "react";
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

export default function SightingsTable(props) {

  const [sortedSightings, setSortedSightings] = useState([]);
	const {timestamp, latitude, longitude, adults, piglets, humanInteraction, comments } = sortedSightings;
	const [timerange, setTimerange] = useState({month: "", year: ""});
	const { month, year } = timerange;

// Adds all DB DATA IN sortedSightings ON LOADING PAGE
  useEffect(() => {
    fetch("/sightings")
      .then(res => res.json())
      .then(json => {
        setSortedSightings(json);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []); 


	//sorting columns (DOES NOT WORK)
	// const [allSightings, setAllSightings] = useState([]);
  // const {timestamp, latitude, longitude, adults, piglets, humanInteraction, comments } = allSightings;
  // sortedSightings = [...allSightings];
  // const fieldSort = (name, key) => {
  //   if (key === "asc"){
	// 		setSortedSightings(sortedSightings.sort((a, b) => {
	// 				if (a[name] < b[name]) return -1;
	// 				if (a[name] > b[name]) return 1;
	// 				else return 0;
	// 		}))
  //   } else if (key === "desc") {
	// 			setSortedSightings(sortedSightings.sort((a, b) => {
	// 					if (a[name] > b[name]) return -1;
	// 					if (a[name] < b[name]) return 1;
	// 					else return 0;
	// 			}))}  
	// 	console.log(sortedSightings)
	// }

	
// GETS USER INPUTS INTO timerange OBJECT
	const handleChange = (e) => {
			const { value, name } = e.target;
			setTimerange(state => ({...state, [name]: value})) 
	}

// CALLS sortByMonthYear ON SUBMIT (Filter button)
	const submitTimerange = (e) => {
		e.preventDefault();
		sortByMonthYear(timerange);
	}

// UPDATES sortedSightings ACCORDING TO DEFINED TIMERANGE
  const sortByMonthYear = async timerange => {
		const { month, year } = timerange;
    try {
      const res = await fetch(`/sightings/timerange/${year}/${month}`, {
        method: "GET"
      });
      const data = await res.json();
      setSortedSightings(data);
    } catch (err) {
      console.log(err);
    }
  };

// DELETES SIGHTING FROM DB ON delete BUTTON CLICK (AND RENDERS UPDATED DATABASE)
	const deleteEntry = async id => {
    try {
      const res = await fetch(`/sightings/${id}/`, {
        method: "DELETE"
      });
      const data = await res.json();
      setSortedSightings(data);
    } catch (err) {
      console.log(err);
    }
  };


// TEMPLATE
  return (
    <div className="container">

  {/* TABLE     */}
      <div>
        <h3>Sighting details</h3>
        <form>
            <label className="form-control">Select month
                <select className="form-control" name="month" value={month}  onChange={handleChange}>
										<option value="" selected>Select month</option>
										<option value="january">January</option>
                    <option value="february">February</option>
                    <option value="march">March</option>
                    <option value="april">April</option>
                    <option value="may">May</option>
                    <option value="june">June</option>
                    <option value="july">July</option>
                    <option value="august">August</option>
                    <option value="september">September</option>
                    <option value="october">October</option>
                    <option value="november">November</option>
                    <option value="december">December</option>
                </select> 
            </label>
            <label className="form-control">Select year
                <select className="form-control" name="year" value={year} onChange={handleChange}>
										<option value="" selected>Select year</option>
										<option value="2021">2021</option>
                    <option value="2022">2022</option>
                </select> 
            </label>
            <button className="btn btn-primary" onClick={(e)=>submitTimerange(e)}>Filter</button>
        </form>

        <Table className="table">
              <Thead>
                <Tr>
                  <Th scope="col">Date</Th>
                  <Th scope="col">Location</Th>
                  <Th scope="col">
                      Adults
                      {/* <button className="btn btn-outline-dark btn-sm" type="button" onClick={() => fieldSort("adults", "asc")}>↑</button>
                      <button className="btn btn-outline-dark btn-sm" type="button" onClick={() => fieldSort("adults", "desc")}>↓</button> */}
                  </Th>
                  <Th scope="col">Piglets</Th>
                  <Th scope="col">Interacting</Th>
                  <Th scope="col">Comments</Th>
									<Th scope="col">Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sortedSightings.map(sighting => (
                    <Tr>
                      <Td>{(sighting.timestamp).slice(0, 10)}</Td>
                      <Td><a href={`https://www.openstreetmap.org/#map=19/${sighting.latitude}/${sighting.longitude}`}>{`${sighting.latitude}, ${sighting.longitude}`}</a></Td>
                      <Td>{sighting.adults}</Td>
                      <Td>{sighting.piglets}</Td>
                      <Td>{sighting.humanInteraction === 0 ? "NO" : "YES"}</Td>
                      <Td>{sighting.comments}</Td>
											<Td>{sighting.comments}</Td>
											<Td><button className="btn btn-danger" type="button" onClick={()=>(deleteEntry(sighting.id))}>Delete</button></Td>
                    </Tr>
                  ))
                }
              </Tbody>
            </Table>
      </div>

    </div>
  )
}


