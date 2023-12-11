created all the folders and files so that our group knows where to work in

worked on the init.sql as a group mob coded to get it to what we like

worked on the marketplace made a base code block

marketplace has been moved to stretch goal will not be turned into final grade

changed enviroment password and email moved it to .env

added wait host and depnds_on so this prevents the api from running before the database

changed env so that it has the email and password changed react to VITE_APP_API_HOST and signing key

changed vite.config added watch userpolling so when a changes happen it triggers a browser refresh code change

finished up signup and signin

implemented galvanize reactjwt library for our react files so that way we don't have to use their library so we can edit the code to whatever we name since we are using email instead of username to login 

Now using the VITE api host value and packing it into the auth provider in app.jsx 
that way when we do our fetches with process.env.VITE_APP_API_HOST that way when we go to deploy we only have to change the local host in our .env once and it will apply throughtout the entire react application avoiding to having to change it everywhere

also need the keys file and also had to comment out everything that included acl.py imports didnt allow me to test anything since i didnt have the key file

created the homepage using material ui as a styling this has lots of cool features which allows me to simply create featured post and signin and signup buttons and images attached to them

routed everything to the home page so that the homepage is interactive. 

cleaned up the project going through and clearing any console.logs and //

worked on the readme.md with jason 

