[![Netlify Status](https://api.netlify.com/api/v1/badges/4648453a-08d1-4a44-975a-b78cd555f078/deploy-status)](https://app.netlify.com/sites/ziffur/deploys)

# Ziffur Demo

This repository contains a snapshot of the source code for Ziffur.com, a blog by the couple @bjarkips and @11sarah about Computer Science, Cybersecurity, and Web Development.

## Overview

Ziffur is a fast website built using modern code patterns and open-source tools with simplicity and performance in mind. Ziffur follows [JAMStack](https://jamstack.org/) principles to achieve great performance with cheap hosting and easy maintenance.

### Fast by Default

Ziffur uses the following tools to achieve high performance with minimal setup:

* **Next.js**: SPA routing and static site generation with a modern React boilerplate.
* **Netlify**: A global CDN with Continuous Deployment and serverless APIs (via AWS Lambda).
* **Cloudinary**: A CDN for responsive images in next-gen formats with flexible transformations and automatic caching.

### Nice and Neat

Ziffur uses the following tools to improve productivity and enforce best practices:

* **Material UI**: Styled React components based on the Material Design System.
* **ESLint**: Strict, consistent code style and quality using the AirBnB style guide.

## Local Dev

```
$ yarn install
$ yarn dev
```

## Static Export (Netlify)

```
$ yarn build
```
