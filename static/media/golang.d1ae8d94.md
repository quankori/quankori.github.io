# Golang Dockerfile

- Dockerfile Golang

```dockerfile
FROM golang

ARG app_env
ENV APP_ENV $app_env

# current working directory is /build in the container
RUN mkdir -p /projects

WORKDIR /projects

RUN ls -la /projects

COPY . /projects

RUN go get ./
RUN go build

CMD if [ ${APP_ENV} = production ]; \
	then \
	app; \
	else \
	go get github.com/pilu/fresh && \
	fresh; \
	fi

EXPOSE 8200
```
