# syntax=docker/dockerfile:1

FROM node:12.18.1

# Expongo los puertos que usa Expo
EXPOSE 19000
EXPOSE 19001

WORKDIR /workspace

COPY ["package.json", "./"]
# Instalar Expo globalmente.
RUN npm install -g expo-cli@4.4.3
RUN npm install --prefix ./SeedyFiubaApp