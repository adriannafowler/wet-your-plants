# APIS

## Dashboard

- **Method**: `GET`,
- **Path**: `/api/dashboard/`,`/api/dashboard/{todo_id}`,`/api/complete/`

Input:

```json
{
  "todo": str,
  "due_date": str
}
```

Output:

```json
{
  "id": int,
  "todo": str,
  "due_date": str,
  "time_completed": Optional[str],
  "complete": bool,
  "status": Optional[str],
  "plant_id": int,
  "owner_id": int
}
```

The dashboard api allows for users to view their current todos for each plant. Creating one requires the user to insert a description of the todo and the desired due date. Users have the ability to update the status of the todo once the task is completed.

## Greenhouse

- **Method**: `GET`,`POST`
- **Path**: `/api/greenhouse/`

Input:

```json
{
  "name": str,
  "source": str,
  "species_id": int,
  "watering_schedule": int
}
```

Output:

```json
{
  "id": int,
  "name": str,
  "source": str,
  "common_name": str,
  "type": str,
  "cycle": str,
  "watering": str,
  "sunlight": str,
  "indoor": bool,
  "care_level": str,
  "maintenance": str,
  "description": str,
  "hardiness": str,
  "original_url": str,
  "dimensions": str,
  "owner_id": int,
  "watering_schedule": int
}
```

The greenhouse api allows for users to create a plant if provided the name, source, species_id, and watering schedule. The api will return information based on the species_id and water_schedule selected by the user.

## Plant Species

- **Method**: `GET`
- **Path**: `/api/species_ids/{query}`

Input:

```json
{
  "query": string
}
```

Output:

```json
{
  "query": string
}
```

The plant species api allows for users to search for plants in our database when creating a plant. A list of plants will appear in the dropdown based on what the user has entered into the search box.

## Plant Detail

- **Method**: `GET`, `PUT`, `DELETE`
- **Path**: `/api/greenhouse/`, `/api/greenhouse/<int:id>/`

Input:

```json
{
    "plant_id" : int,
}
```

Output:

```json
{
    "name" : string,
    "source" : string,
    "common_name" : string,
    "type" : string,
    "cycle" : string,
    "watering" : string, 
    "sunlight" : string,
    "indoor" : bool,
    "care_level" : string,
    "maintainence" : string,
    "description" : string,
    "hardiness" : string,
    "original_url" : string,
    "dimensions" : string,
    "owner_id" : int,
    "watering_schedule" : int,
    "id" : int,
}
```

The plant detail API returns information about a plant in the database when given the id of the plant. Users will also be able to update details of the plant of delete a plant from their inventory if desired.

##Users

- **Method** `GET`, `POST`, `PUT`
- **Path**: `/api/users/`, `/api/users/<int:id>/`

Input:

```json
{
    "email" : string,
    "password" : string,
    "name" : string,
    "zipcode" : integer,
}
```

Output:

```json
{
  "id" : integer,
  "email" : string,
  "name" : string,
  "zipcode" : integer,
}
```

The Users API will create and update an account for a user to access the Wet Your Plants website. Users will need to enter all of the information listed to create an account. Users will also be update their account info if desired.

## Watering Schedule

- **Method**: `GET`, `POST`, `PUT`, `DELETE`
- **Path**: `/api/watering-schedules/`

Input:

```json
{
  "id": int,
  "schedule": string  
}
```

Output:

```json
{
  "id" : integer,
  "schedule" : string,
}
```

The watering schedule API allows for users to create a watering schedule to designate to each plant. This adds the schedule to the database where users can edit or delete if desired. 











