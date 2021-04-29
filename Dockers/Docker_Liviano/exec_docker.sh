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