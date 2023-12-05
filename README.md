# Module3 Project Gamma

## Getting started

You have a project repository, now what? The next section
lists all of the deliverables that are due at the end of the
week. Below is some guidance for getting started on the
tasks for this week.

## Install Extensions

- Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
- Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>

## Deliverables

- [ ] Wire-frame diagrams
- [ ] API documentation
- [ ] Project is deployed to Caprover (BE, DB) & GitLab-pages (FE)
- [ ] GitLab issue board is setup and in use (or project management tool of choice)
- [ ] Journals

## Project layout

The layout of the project is just like all of the projects
you did with `docker-compose` in module #2. You will create
a directory in the root of the repository for each service
that you add to your project just like those previous
projects were setup.

### Directories

Several directories have been added to your project. The
directories `docs` and `journals` are places for you and
your team-mates to, respectively, put any documentation
about your project that you create and to put your
project-journal entries. See the _README.md_ file in each
directory for more info.

The other directories, `ghi` and `api`, are services, that
you can start building off of.

Inside of `ghi` is a minimal React app that has an "under
construction" page. It is setup similarly to all of the
other React projects that you have worked on.

Inside of `api` is a minimal FastAPI application.
"Where are all the files?" you might ask? Well, the
`main.py` file is the whole thing, and go take look inside
of it... There's not even much in there..., hmm? That is
FastAPI, we'll learn more about it in the coming days. Can
you figure out what this little web-application does even
though you haven't learned about FastAPI yet?

Also in `api` is a directory for your migrations.
If you choose to use PostgreSQL, then you'll want to use
migrations to control your database. Unlike Django, where
migrations were automatically created for you, you'll write
yours by hand using DDL. Don't worry about not knowing what
DDL means; we have you covered. There's a sample migration
in there that creates two tables so you can see what they
look like.

The Dockerfile and Dockerfile.dev run your migrations
for you automatically.

### Other files

The following project files have been created as a minimal
starting point. Please follow the guidance for each one for
a most successful project.

- `docker-compose.yaml`: there isn't much in here, just a
  **really** simple UI and FastAPI service. Add services
  (like a database) to this file as you did with previous
  projects in module #2.
- `.gitlab-ci.yml`: This is your "ci/cd" file where you will
  configure automated unit tests, code quality checks, and
  the building and deployment of your production system.
  Currently, all it does is deploy an "under construction"
  page to your production UI on GitLab and a sample backend
  to CapRover. We will learn much more about this file.
- `.gitignore`: This is a file that prevents unwanted files
  from getting added to your repository, files like
  `pyc` files, `__pycache__`, etc. We've set it up so that
  it has a good default configuration for Python projects.
- `.env.sample`: This file is a template to copy when
  creating environment variables for your team. Create a
  copy called `.env` and put your own passwords in here
  without fear of it being committed to git (see `.env`
  listed in `.gitignore`). You can also put team related
  environment variables in here, things like api and signing
  keys that shouldn't be committed; these should be
  duplicated in your deployed environments.

## How to complete the initial deploy

There will be further guidance on completing the initial
deployment, but it just consists of these steps:

### Setup GitLab repo/project

- make sure this project is in a group. If it isn't, stop
  now and move it to a GitLab group
- remove the fork relationship: In GitLab go to:

  Settings -> General -> Advanced -> Remove fork relationship

- add these GitLab CI/CD variables:
  - PUBLIC_URL : this is your gitlab pages URL
  - REACT_APP_API_HOST: enter "blank" for now

#### Your GitLab pages URL

You can't find this in GitLab until after you've done a deploy
but you can figure it out yourself from your GitLab project URL.

If this is your project URL

https://gitlab.com/GROUP_NAME/PROJECT_NAME

then your GitLab pages URL will be

https://GROUP_NAME.gitlab.io/PROJECT_NAME

### Initialize CapRover

1. Attain IP address and domain from an instructor
1. Follow the steps in the CD Cookbook in Learn.

### Update GitLab CI/CD variables

Copy the service URL for your CapRover service and then paste
that into the value for the REACT_APP_API_HOST CI/CD variable
in GitLab.

### Deploy it

Merge a change into main to kick off the initial deploy. Once the build pipeline
finishes you should be able to see an "under construction" page on your GitLab
pages site.
# Smelli Belli

- Jordan Frerichs
- Elliott Klaassen
- Jaiden Sy
- Cindy Luu
- Nicholas Tan

Smelli Belli – bringing you all the scents you want, and none of the ones you don’t.

Smelli Belli - a lifestyle.

Smelli Belli - choose your own scent-venture.

## Design

- [API design](docs/apis.md)
- [Data model](docs/data-model.md)
- [GHI](docs/ghi.md)
- [Integrations](docs/integrations.md)

## Intended market

We are targeting general consumers in the self-care market who are looking for a tailored shopping experience. Consumers of skincare products, bath & body products, and home goods who can find a wide array of products that conform to their tastes.

## Functionality

- Visitors to the site can take a home or body scent profile quiz that will filter Smelli Belli’s products to match their tastes:
  - A home quiz to find them a home product that matches their scent profile
  - A body quiz to find them a body product that matches their scent profile
- Users can click on suggested products to go to product detail page to either wish list or add to cart
- Products page for a plain list view of all products
- Accounts
- Employees can add new products, view/search inventory, and update inventory stock
- Wish list for registered accounts so users can build a list of products based on their preferences/quiz results and save those grouped products for later
- About Page with company info, ingredient sourcing info, and FAQ
- Social Media Links/Contact at the footer
- Contact => Email or Help Chat via Facebook Messenger for questions/suggestions
- Main Page features popular products and quizzes
- The cart features products that was added from the product page
  - update quantity with an increment and decrement counter
  - can checkout and will populate the order end point

## Project Initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run `docker volume create smelli-db`
4. Run `docker compose build`
5. Run `docker compose up`
6. Run `docker exec -it smelli-belli-inventory-api-1 bash`
7. Run `python manage.py loaddata products.json`
8. Exit the container's CLI, and enjoy Smelli Belli to its fullest!
