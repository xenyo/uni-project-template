# xenyo/uni-project-template

Drupal project template for Xenyo Uni Framework.

## Quick start

### Decide project name

Decide on a name for your new project. The name must:

- Only include lowercase letters, digits and hyphens (-).
- Begin with the namespace of the client.
- End with `-project` or `-site`. This is to reduce confusion between project and module repositories.

### Create GitHub repository

Create a new GitHub repository based on this template. You can select this
template when creating the repository or click the *Use this template* button at
https://github.com/xenyo/uni-project-template.

Clone the new repository to your local machine.

### Update name and description

Update the name and description in the following files:

- composer.json
- docker-compose.yml
- README.md

Before proceeding, commit your changes and push.

## Docker

### Provide authentication details

Copy `auth.example.json` to `auth.json`.

Enter the username and password for packages.xenyo.net (obtained from the system administrator).

Go to https://github.com/settings/tokens and generate a personal access
token with no expiration and `repo` scope. Add the token to the `auth.json`.

### Adjust ports

Copy `.env.example` to `.env`. If necessary, edit the values to prevent port binding conflicts.

### Start containers

Create and start containers in the background:

```
docker compose up -d
```

### Attach to container

There are multiple ways to interact with the container.

First, you can simply launch bash from the command line:

```
docker compose exec drupal bash
```

Secondly, you can attach VS Code to the container using the *Docker* and
*Dev Containers* extensions.

Thirdly, you can use JetBrains Gateway to attach PHPStorm to the container via
SSH.

### Clone the project

Once inside the container, clone the project repository to `/var/www/html`:

```
git clone git@github.com:xenyo/example-project.git /var/www/html
```

### Set up Drupal

In `web/sites/default`, copy `default.settings.php` to `settings.php`.

Open the site in the browser and run the Drupal installer with the standard
profile.

Then, update the config sync directory in `settings.php` to the following:

```php
$settings['config_sync_directory'] = '../config/sync';
```

## Custom modules and themes

The `.gitignore` has been set up to ignore the entire `web` directory. This is intentional and you should not check in any files inside `web`.

Instead, a separate repository should be created for each custom theme and
module you want to add. Then, you can add them to your project with Composer.

See https://github.com/xenyo/uni_module_template and https://github.com/xenyo/uni_theme_template.

## Development configuration

### 1. development.services.yml

In `web/sites`, copy `development.services.yml` to the `default` directory and
add the following under the `parameters` key:

```yml
parameters:
  twig.config:
    debug: true
```

### 2. settings.local.php

In `web/sites`, copy `example.settings.local.php` to `default/settings.local.php` and make the following changes:

```php
// 1. Edit this line to point to the development.services.yml created above
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/default/development.services.yml';

// 2. Uncomment the following lines to disable caching
$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['discovery_migration'] = 'cache.backend.memory';
$settings['cache']['bins']['page'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';
```

### 3. settings.php

Uncomment the following lines in `web/sites/default/settings.php`:

```php
if (file_exists($app_root . '/' . $site_path . '/settings.local.php')) {
  include $app_root . '/' . $site_path . '/settings.local.php';
}
```

## Webhooks

See https://github.com/xenyo/github-webhooks-exec
