FROM xenyo/drupal:php8.1

RUN sudo rm -r /var/www/html
COPY --chown=ubuntu:ubuntu .git /var/www/html/.git
RUN git reset --hard
