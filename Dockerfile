FROM node:20-slim AS base

RUN apt-get update && apt-get install -y curl
# Install pnpm
RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY . /usr/src/app
