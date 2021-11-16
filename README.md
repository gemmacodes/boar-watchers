# Boar Watchers: wild boar tracker :boar:

1. [Context](#context)
2. [Get started](#setup)
    - [Dependencies](#dependencies)
    - [Database prep](#database-prep)
    - [Development](#development)
3. [Architecture](#architecture)
    - [Database schema](#database-schema)
    - [API routes plan](#API-routes-plan)
    - [Components](#react-app-components)
4. [Possible future extensions](#possible-future-extensions)

## Context

**What does Boar Watchers do?**
This SPA allows users to report boar sightings.

**Why would somebody need to do that?**
The wild boar (*Sus scrofa*) is a native species in Catalonia. In recent years, it has proliferated to the point that there has been a significant increase in incidents caused by their presence in several populated areas around Collserola, including Barcelona. Urban food sources (troughs, food for cats, waste, etc.) are the reason that boar are colonising the urban environment in a process of adaption that has been evolving over several generations; however, wild boars are not an urban species and should therefore not be in the urban environment, because of the risks they bring and because they cannot be re-introduced into the wild afterwards.

Work must be done to keep them native to the natural environment and to remove them from the city, and being able to locate them and their urban food sources is the first step towards it.

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- Navigate into the app folder `cd client` and run `npm install`. This will install client dependencies (React).

This project uses several additional libraries, which should also get installed when you run `npm install`. Here you can find more information about them:
- React router https://reactrouter.com/
- Mapbox GL JS https://docs.mapbox.com/mapbox-gl-js/guides/
- react-map-gl https://visgl.github.io/react-map-gl/
- Geocoder https://github.com/visgl/react-map-gl
- Noty https://ned.im/noty/#/
- react-super-responsive-table https://github.com/coston/react-super-responsive-table
- Bootstrap https://getbootstrap.com/


### Database Prep

- Access the MySQL interface in a terminal by running `mysql -u root -p`
- Create a new database called boartracker: `create database boartracker`
- Add a `.env` file to the project folder of the repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=boartracker
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the project folder of the repository, in a new terminal window. This will create a table called 'sightings' in the boartracker database.


### Development

- Run `npm start` in project directory to start the Express server on port 5000
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.


Happy coding!

## Architecture

### Database schema

The "boartracker" database only has one table called "sightings":

| FIELD            | DATA TYPE                    |
|------------------|------------------------------|
| id               | integer (key, autogenerated) |
| timestamp        | timestamp                    |
| latitude         | float                        |
| longitude        | float                        |
| adults           | integer                      |
| piglets          | integer                      |
| humanInteraction | tinyint                      |
| comments         | varchar(255)                 |

### API routes plan

| URl                | HTTP METHOD | DESCRIPTION                 | REQUEST OBJECT                                                                                                                                                            | RESPONSE OBJECT                                                                                                                                                                   |
|--------------------|-------------|-----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /api/sightings     | GET         | Get all sightings           | n/a                                                                                                                                                                       | [ { id: integer, timestamp: timestamp, latitude: float, latitude: float, longitude: float, adults: integer, piglets: integer, humanInteraction: boolean, comments: string }, ...] |
| /api/sightings/:id | GET         | Get sighting by id          | n/a                                                                                                                                                                       | { id: integer, timestamp: timestamp, latitude: float, latitude: float, longitude: float, adults: integer, piglets: integer, humanInteraction: boolean, comments: string }         |
| /api/sightings/timerange/:year/:month | GET         | Get sightings by month and year          | n/a                                                                                                                                                                       | [{ id: integer, timestamp: timestamp, latitude: float, latitude: float, longitude: float, adults: integer, piglets: integer, humanInteraction: boolean, comments: string }...]         |
| /api/sightings     | POST        | Create new sighting         | { id: integer, timestamp: timestamp, latitude: float, latitude: float, longitude: float, adults: integer, piglets: integer, humanInteraction: boolean, comments: string } | [ { id: integer, timestamp: timestamp, latitude: float, latitude: float, longitude: float, adults: integer, piglets: integer, humanInteraction: boolean, comments: string }, ...] |
| /api/sightings/:id | PUT         | Edit sighting information   | { id: integer, timestamp: timestamp, latitude: float, latitude: float, longitude: float, adults: integer, piglets: integer, humanInteraction: boolean, comments: string } |                                                                                                                                                                                   |
| /api/sightings/:id | DELETE      | Delete sighting information |                                                                                                                                                                           | [ { id: integer, timestamp: timestamp, latitude: float, latitude: float, longitude: float, adults: integer, piglets: integer, humanInteraction: boolean, comments: string }, ...] |

### React app components

- **Navbar**: main menu.
- **NewEntry**: displays user input form and map required to submit a sighting report. It is connected to two components:
  - **Map**: map with draggable marker used to locate a sighting.
  - **FormatTimestamp**: converter from UNIX timestamp to mySQL timestamp format.
- **AllSightings**: displays map and table with all recorded sightings, with an option to filter by month/year. It displays two components:
  - **SightingsMap**: map with fixed markers/popups for selected sightings.
  - **SightingsTable**: table with information from selected sightings.

## Possible future extensions
- Admin panel: Build authentication so that only admins can access ‘all sightings’ information, edit/delete entries and apply further filters
- Photo upload: Improve user input form with the option to upload a picture of the sighting
- Adding educational resources: Add checklist with steps users should follow when spotting boars (who to call, how to act…)
- Pivot: Adapt app for other uses, eg. locate abandoned cats

 _This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._