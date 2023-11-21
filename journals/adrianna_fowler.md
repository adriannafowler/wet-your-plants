NOV 15, 2023
    -mob coded, edited docker-compose.yaml to get containers up and running
    -explored database options as a group, and after some trial and error,
     decided to use the demonstrated method with init.sql

NOV 17, 2023
    - added acls.py and keys.py files, tested both functions that pull from perenual api in shell, both were working correctly
NOV 20, 2023
     - running into a blocker with getting my create_plant up and running. When I try a post request in swagger, I get a status code 500, and this error in my container log:
     psycopg.errors.StringDataRightTruncation: value too long for type character varying(50)
     - posted as a blocker for team to work on together tomorrow
