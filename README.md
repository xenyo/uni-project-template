# xenyo/uni-project-template

## Requirements

- PHP 8.1 or above
- Composer v2 or above

## Authentication

The following steps must be performed once per development environment.

### Xenyo Composer repository

Ask the administrator to provide a username and password for the Xenyo Composer
repository (https://packages.xenyo.net).

Add the authentication details to Composer:

```
composer config --global http-basic.packages.xenyo.net username password
```

### Xenyo GitHub repositories

Go to https://github.com/settings/tokens and generate a new personal access
token with no expiration and `repo` scope.

Add the token to Composer:

```
composer config --global github-oauth.github.com token
```

GitHub authentication is not required if your project does not depend on any dev
versions of packages from Xenyo.

## Usage

Create a new repository for your project by clicking the **Use this template**
button. Project repository names must follow the pattern
`{client}-{title}-project`.

Clone the new repository to your development environment:

```
git clone git@github.com:xenyo/my-new-project
```

Install composer dependencies:

```
composer install
```

In `web/sites/default`, copy `default.settings.php` to `settings.php`.

Set the config sync directory:

```php
$settings['config_sync_directory'] = '../config/sync';
```

Open the site in the browser and run the Drupal installer with the standard
profile.

Add the base theme you want to build the site from:

```
composer require xenyo/uni_theme
```


## Custom modules and themes

The project repository must not contain the source code of any custom themes or modules. Instead, a separate repository should be created for each custom theme and module and added to the project using Composer.

See https://github.com/xenyo/uni_module_template and https://github.com/xenyo/uni_theme_template.

## Development

### 1. development.services.yml

In `web/sites`, copy `development.services.yml` to the `default` directory and
add the following under the `parameters` key:

```yml
parameters:
  twig.config:
    debug: true
```

### 2. settings.local.php

In `web/sites`, copy `example.settings.local.php` to `settings.local.php` and
make the following changes:

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
