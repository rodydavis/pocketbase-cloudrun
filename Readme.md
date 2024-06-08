# Pocketbase on CloudRun

It is now possible to run Pocketbase on Google Cloud Run because of the recent support for [mounting volumes](https://cloud.google.com/run/docs/configuring/services/cloud-storage-volume-mounts). This is a guide on how to deploy Pocketbase on Google Cloud Run.

> Disclaimer: This is not an official Google project.

## Prerequisites

- Google Cloud project
- Google Cloud Storage bucket
- Google Cloud SDK installed on your machine
- Docker installed on your machine
