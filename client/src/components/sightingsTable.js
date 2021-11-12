import React, { useState, useEffect } from "react";
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

export default function SightingsTable({sightings, deleteEntry}) {


// TEMPLATE
  return (
    <div>

  {/* TABLE     */}

        <Table className="table">
          <Thead>
            <Tr>
              <Th scope="col">Date</Th>
              <Th scope="col">Location</Th>
              <Th scope="col">Adults </Th>
              <Th scope="col">Piglets</Th>
              <Th scope="col">Interacting</Th>
              <Th scope="col">Comments</Th>
              <Th scope="col">Options</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              sightings && sightings.map(sighting => (
              <Tr>
                <Td>{(sighting.timestamp).slice(0, 10)}</Td>
                <Td><a href={`https://www.openstreetmap.org/#map=19/${sighting.latitude}/${sighting.longitude}`}>{`${sighting.latitude}, ${sighting.longitude}`}</a></Td>
                <Td>{sighting.adults}</Td>
                <Td>{sighting.piglets}</Td>
                <Td>{sighting.humanInteraction === 0 ? "NO" : "YES"}</Td>
                <Td>{sighting.comments}</Td>
                <Td><button className="btn btn-outline-danger" type="button" onClick={()=>(deleteEntry(sighting.id))}>Delete</button></Td>
              </Tr>
              ))
            }
          </Tbody>
        </Table>

    </div>
  )
}


