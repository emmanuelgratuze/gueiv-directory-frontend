# Güeiv directory Front end app
Here is the frontend app of: http://directorio.gueiv.com.

## Setup
Install npm dependencies
```
npm install
```

### Contents and data
All the website's contents and data are versioned and separately stored in a distinct repository. They are included (via .gitmodules) in the `/contents` app folder. From now, the production's website raw data aren't publicly accessible, so you will need to specify your own repository to make the app working.

The app uses [Netlify CMS](https://www.netlifycms.org/) as content manager, which will also need to be configurated with your content repository.

#### Ready to use fake contents repository (read-only)
You only need to checkout the `with-fake-contents` branch. This branch version is configurated to work with https://github.com/emmanuelgratuze/gueiv-directory-contents-sample which is a light version of the production data (without brands data).

#### Custom contents Github repository
- First you need to define the `NETLIFY_CMS_BACKEND_REPO` environment variable, in order to tell Netlify CMS from where it should read and write the contents. In `/.env`, replace with your **Github** repository path:
```
{
  "NETLIFY_CMS_GITHUB_REPOSITORY": "emmanuelgratuze/gueiv-directory-contents"
}
```

- Then, tell git from where it should pull the contents into the project.
In `/.gitmodules, replace with your **Github** repository url as follow:
```
[submodule "contents"]
	path = contents
	url = git@github.com:emmanuelgratuze/gueiv-directory-contents.git
```

- Fetch the repository. In the project root, run:

  ```
  git submodule sync
  git submodule update --init --recursive --remote
  ```

### External services

The website requires configuring few external services to work:
- Cloudinary (image storing)
- Google analytics
- Mailchimp (newsletter subscription)

Here are the environment variables you will need to define:
```
# .env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=

GOOGLE_ANALYTICS_TRACKING_ID=

MAILCHIMP_USERNAME=
MAILCHIMP_U=
MAILCHIMP_ID=
MAILCHIMP_FORM_ID=
```

## Run in development mode
```
npm run dev
```

The app will start on : https://localhost:3000.

## Build

```
npm run production-build
```

The build files are generated in the `/out` directory.

### Lint code

Eslint + stylent

```
npm run lint
```
