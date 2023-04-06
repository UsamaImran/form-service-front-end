# FormService: FrontEnd

## Running Frontend with Dev Environment (only FE server)

### PreSettings

1. setup `.env.local` :

- Create .env.local at root level and add these environment variables

  ```js
  NEXT_PUBLIC_URL = '' //URL for backend
  NEXT_PUBLIC_CLOUD_NAME = '' // Image storage cloud name
  NEXT_PUBLIC_PRESET = '' // Image storage Presets
  ```

- You can ask for env values on slack channel or you can use heroku/vercel deployment server environment list.
- Create a new branch from dev and start working on your feature. <your name>/<user story name>

### Run

1. `npm run dev` is a command use to run project but before running the project you have to setup .env.local

## Running Frontend with Local Environment (local mongo, local BE)

### PreSettings

1. create .env.local at root level
2. add the following:

```JS
NEXT_PUBLIC_URL = "http://localhost:8000/graphql" //URL for backend
NEXT_PUBLIC_CLOUD_NAME = "" // Image storage cloud name
NEXT_PUBLIC_PRESET = "" // Image storage Presets
```

3. You can ask for env values on slack channel.
4. Download Backend code and switch to dev branch and `npm run start-local` (Please check BE readme file to setup backend .env)

### Run

1. `npm run dev` || `npm run local`

- Test your feature for Dev environment by replacing the env values in .env.local or you can create .env.development.local (See NextJS env documentation https://nextjs.org/docs/basic-features/environment-variables )

## PR

- After US/Task completion OR before pushing a PR for dev, do the following:
  - Take a pull from dev to your branch. `git pull origin dev`
  - Run `npm run build` on your local machine to make sure there is no erors or warnings
  - In case you face any issue during build, resolve those issues locally and only then create a PR to dev.
