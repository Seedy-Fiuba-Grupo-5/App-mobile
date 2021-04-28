# syntax=docker/dockerfile:1

# Imagen Docker para desarrollo en React-Native-Android 
# de la comunidad de React Native
FROM reactnativecommunity/react-native-android

# Expongo los puertos que usa Expo
EXPOSE 19000
EXPOSE 19001

WORKDIR /workspace

COPY ["package.json", "./"]
# Instalar Expo globalmente.
RUN npm install -g expo-cli@4.4.3
