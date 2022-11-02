const { queue, server, webhooks, logger } = require('github-webhooks-exec');

webhooks.on('push', event => {
  logger.info(`${event.payload.ref} was updated in ${event.payload.repository.full_name}.`);
  const commands = [
    'set -ex',
    'vendor/bin/drush cex -y',
    'git reset',
    'git add config',
    'git commit -m "Export active configuration" || true',
    'git pull --rebase --autostash',
    'git push',
    'composer install',
    'vendor/bin/drush cr',
    'vendor/bin/drush cim -y',
    'vendor/bin/drush cr',
    'pnpm install',
    'pnpm reload',
  ];
  queue.push(commands.join('; '));
});

server.listen(process.env.GITHUB_WEBHOOKS_PORT);
logger.info('Ready');
