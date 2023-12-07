#APIS

##Users

- **Method** `POST`, `GET`, `PUT`,
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
    "email" : string,
    "password" : string,
    "name" : string,
    "zipcode" : integer,
    "id" : integer,
}
```

The Users API will create and update an account for a user to access the Wet Your Plants website. Users will need to enter all of the information listed to create an account.

## Plant Detail

- Method: `GET`, `POST`, `PUT`, `DELETE`
- Path: `/api/greenhouse/`, `/api/greenhouse/<int:id>/`

Input:

```json
{
    "name" : string,
    "source" : string,
    "common_name" : string,
    "type" : string,
    "cycle" : string,
    "watering" : string, 
    "sunlight" : string,
    "indoor" : boolean,
    "care_leve" : string,
    "maintainence" : string,
    "description" : string,
    "hardiness" : string,
    "original_url" : string,
    "dimensions" : string,
    "owner_id" : integer,
    "watering_schedule" : integer,
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
    "indoor" : boolean,
    "care_level" : string,
    "maintainence" : string,
    "description" : string,
    "hardiness" : string,
    "original_url" : string,
    "dimensions" : string,
    "owner_id" : integer,
    "watering_schedule" : integer,
    "id" : id,
}
```

To create a new plant users will search for plants in our database through a search bar in the front end. The Perenual API will return the name, source, common_name, type, cycle, watering, sunlight, indoor, care_level, maintenance, description, hardiness, original_url, dimensions, owner_id, and watering_schedule. Creating a plant adds an image of the plant and the common name to the user's greenhouse. The plant detail page will consist of all plant information for the user to properly determine how to take care of their plants.

## Watering Schedule

- Method: `GET`
- Path: `/api/watering-schedules/`

Input:

```json
{
  "schedule": string  
}
```

Output:

```json
{
  "schedule" : string,
  "id" : integer  
}
```

Add description here.

##






