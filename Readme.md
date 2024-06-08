# Pocketbase on CloudRun

It is now possible to run Pocketbase on Google Cloud Run because of the recent support for [mounting volumes](https://cloud.google.com/run/docs/configuring/services/cloud-storage-volume-mounts). This is a guide on how to deploy Pocketbase on Google Cloud Run.

> Disclaimer: This is not an official Google project.

## Prerequisites

- Google Cloud project
- Google Cloud Storage bucket
- Google Cloud SDK installed on your machine
- Docker installed on your machine

## Getting Started

Fork this repository or "Use this template" to create your own repository.

Deploy following the guide on the [official documentation](https://cloud.google.com/run/docs/building/containers#building_using_a_dockerfile).

## Steps

### Create a new service

![](/screenshots/create-service.png)

#### Google Cloud Build

- Setup with Cloud Build
  - Repository Provider: `GitHub`
  - Select Repository: `THIS_REPOSITORY_FORK`
- Branch: `main`
- Build Configuration: `Dockerfile`

#### General Settings

- Allow unauthenticated invocations
- CPU is only allocated when the service is handling requests
- Maximum number of requests per container is set to `1000`
- Maximum number of containers is set to `1`
- Timeout is set to `3600`
- Ingress is set to internal and `all` traffic

#### Container(s), Volumes, Networking, Security

##### Volumes

- Add volume
  - Volume type: `Google Storage bucket`
  - Volume name: `remote-storage (or any name you want)`
  - Bucket: `YOUR_BUCKET_NAME`
  - Read-only: `false`

##### Container(s)
- Delete any health checks
- Startup CPU boost is `enabled`
- Volume mount (s)
  - Volume name: `remote-storage`
  - Mount path: `/cloud/storage`

### Deployed

If everything goes well, you should see the service deployed.

![](/screenshots/deployed.png)

## FAQ

### What if I have local files that I want to use?

`pb_data`, `pb_public`, and `pb_hooks` are all directories you might use during development.

You can upload these directories to your Google Cloud Storage bucket you created earlier and upload the folders to the root.

### Can I use a custom domain?

Yes, you can use a custom domain. You can follow the guide on the [official documentation](https://cloud.google.com/run/docs/mapping-custom-domains).
