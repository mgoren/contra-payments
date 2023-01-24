# Contra-Payments

Simple site to sell contra dance tickets via PayPal

Mostly front-end, with a dash of PHP

Relies on webhook to Zapier for handling sending receipt and adding info to Google Sheet

### Setup

[Set environment variables](https://docs.oracle.com/cd/B14099_19/web.1012/q20206/mod/mod_env.html) `THE_URL` and `AUTH` for use with Zapier webhook.

Or go wild and hardcode them into `register.php`.