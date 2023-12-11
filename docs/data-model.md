# Data models

---

### Users

| name            | type         | unique | optional |
| --------------- | ------------ | ------ | -------- |
| id              | int          | yes    | no       |
| name            | string       | no     | no       |
| email           | string       | yes    | no       |
| password        | string       | no     | no       |
| zipcode         | string       | no     | no       |
| hashed_password | string       | no     | no       |

The `users` entity contains data about the user information 
that is submitted when an user signs up.

###  Status

| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| id               | int    | yes    | no       |
| status           | string | no     | no       |

The `status` entity contains data about the current status
of a todo that the user has created.

###  Watering Schedules

| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| id               | int    | yes    | no       |
| schedule         | string | no     | no       |

The `watering_schedule` entity contains data about the amount 
of times a plant should be watered in a certain time period.

### Plants

| name             | type    | unique | optional |
| ---------------- | ------- | ------ | -------- |
| id               | SERIAL  | yes    | no       |
| name             | string  | no     | no       |
| source           | string  | no     | no       |
| common_name      | string  | no     | yes      |
| type             | string  | no     | yes      |
| cycle            | string  | no     | yes      |
| watering         | string  | no     | yes      |
| sunlight         | string  | no     | yes      |
| indoor           | boolean | no     | yes      |
| care_level       | string  | no     | yes      |
| maintenance      | string  | no     | yes      |
| description      | string  | no     | yes      |
| hardiness        | string  | no     | yes      |
| original_url     | string  | no     | yes      |
| dimensions       | string  | no     | yes      |
| owner_id         | int     | no     | no       |
| watering_schedule| int     | no     | yes      |

The `plants` entity contains data about a plant when added to
the inventory. A majority of this data is fetched from the third
party API Perenual.

### Todos

| name           | type       | unique | optional |
| -------------- | ---------- | ------ | -------- |
| id             | id         | yes    | no       |
| todo           | string     | no     | no       |
| due_date       | datetime   | no     | no       |
| time_completed | datetime   | no     | yes      |
| complete       | boolean    | no     | yes      |
| status         | string     | no     | yes      |
| plant_id       | int        | no     | no       |
| owner_id       | int        | no     | no       |

The `todos` entity contains data about a task that the user has
added to their dashboard. 
