# Güeiv directory Front end app
Here is the frontend app of: http://directorio.gueiv.com.

## Setup
Install npm dependencies
```
npm install
```

### Contents and data
All the website's contents and data are versioned and separately stored in a dedicated repository. They are included (via .gitmodules) in the `/contents` app folder and editable with Netlify CMS.

From now, the production's website raw data aren't publicly accessible, so running the app on master or dev branch will result on an empty app. But a ready-to-use version can be run, based on light contents (without the brands). You can also use your own repository.

#### Ready-to-use version (light contents, read-only)
Purpose: if you only want to run the app with light contents and not edit it.

- Checkout the `with-fake-contents` branch. This branch version is configured to work with https://github.com/emmanuelgratuze/gueiv-directory-contents-sample which is a light version of the production data (only two fake brands).

#### Custom version (custom Github repository)
Purpose: if you want to run the app with you own contents, and be able to edit it with the Netlify CMS.

- First you need to change the `NETLIFY_CMS_GITHUB_REPOSITORY` configuration variable, in order to tell Netlify CMS from where it should read and write the contents.
In `/app.config.json`, replace the `NETLIFY_CMS_GITHUB_REPOSITORY` property with your **Github** repository path:
```
{
  "NETLIFY_CMS_GITHUB_REPOSITORY": "emmanuelgratuze/gueiv-directory-contents"
}
```

- Then, tell git from where it should pull the contents into the project.
In `/.gitmodules`, set the url value with your **Github** repository url:
```
[submodule "contents"]
	path = contents
	url = git@github.com:emmanuelgratuze/gueiv-directory-contents.git
```

- Fetch the contents repository. In the project root, run:
  ```
  git submodule sync
  git submodule update --init --recursive --remote
  ```

### Admin panel
The app uses [Netlify CMS](https://www.netlifycms.org/) as content manager. The admin panel is available at: https://localhost:3000/admin. Content edition will only be available if a custom contents Github repository have been configured.

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
Eslint + stylelint

```
npm run lint
```