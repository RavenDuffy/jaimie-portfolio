.PHONY: start-dev
start-dev:
	BUILDKIT_PROGESS=plain docker-compose -f docker/docker-compose.development.yaml --env-file docker/.development.env up --build -d

.PHONY: stop-dev
stop-dev:
	docker-compose -f docker/docker-compose.development.yaml --env-file docker/.development.env down
