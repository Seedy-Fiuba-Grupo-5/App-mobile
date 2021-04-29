# Docker

## Contruir
---
Ejecutar el siguiente comando para construir la imagen :  
```
sudo docker build -t light_expo .
```
"light_expo" : Nombre elegido para la imagen a construir.  
Nota : El "." al final de la linea indica que se va a contruir el Dockerfile ubicado en el directorio actual.  
  
Ejecutar el siguiente comando para listar las imagenes contruidas:  
```
sudo docker images
```

## Ejecutar
---
Ejecutar el script "exec_docker.sh", de la siguient forma :
```
sudo ./exec_docker.sh
```
Nota : El "./" indica que se desea ejecutar el archivo ubicado en el directorio actual.

### Problemas de ejecucion
Para permitir que el archivo sea ejecutable, se debe ejecutar el siguiente comando :
```
sudo chmod +x exec_docker.sh
```
"+x" : Otorga permisos de ejecucion

### Estrutctura del script exec_docker.sh
```
#!/bin/bash

docker run \
	-it \
	--rm \
	--env-file .env \
	-v $PWD:/workspace \
	-p 19000:19000 \
	-p 19001:19001 \
	light_expo \
	/bin/bash

```
"#!/bin/bash" : Todos los scripts de terminal deben contener esta primer linea.  
"-it" : Ejecuta el contenedor en modo iterativo.  
"--rm" : Remueve el proceso del contenedor cuando finaliza su ejecucion.  
"--env-file .env" : Sobreescribe las variables de entorno especificadas en el archivo ".env".  
"-v $PWD:/workspace" : Monta el directorio actual ($PWD) en la carpeta de trabajo "/worspace" definida en el Dockerfile. Esto permite que trabajar en el directorio actual por fuera del contender, y utilizar a este ultimo unicamente para la ejecucion de la aplicación.  
"-p <\Puerto OS>\:<\Puerto Conteneder>\" : Mapea un puerto del sistema operativo a un puerto del contenedor.  
"light_expo" : nombre de la imagen que deseamos ejecutar.  
"/bin/bash" : Ejecuta una terminal de bash por comodidad.  

### Archivo de variables de entorno .env
```
ADB_IP=192.168.55.100
REACT_NATIVE_PACKAGER_HOSTNAME=192.168.55.104
```
Para la misma red WiFi :  
"ADB_IP" : Especifica la direccion IP del dispositivo mobile cuyo sistema operativo es Android.  
"REACT_NATIVE_PACKAGER_HOSTNAME" : Especifica la direccion IP de la PC donde se esta ejecutando el docker.  


