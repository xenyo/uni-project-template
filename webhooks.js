const { queue, server, webhooks, logger } = require('github-webhooks-exec');

webhooks.on('push', event => {
  const commands = [
    'vendor/bin/drush cex -y',
    'git add config',
    'git commit -m "Export active configuration"',
    'git pull --rebase --autostash',
    'git push',
    'composer install',
    'vendor/bin/drush cr',
    'vendor/bin/drush cim -y',
    'pnpm install',
    'pm2 reload ecosystem.config.js',
  ];
  queue.push(commands.join(' && '));
});

server.listen(process.env.GITHUB_WEBHOOKS_PORT);
logger.info('Ready');
