#!/bin/sh
set -e

# Git 태그
GIT_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "latest")

PROJECT_NAME="playground3"
IMAGE_NAME="${PROJECT_NAME}-${GIT_TAG}"
CONTAINER_NAME="${PROJECT_NAME}-${GIT_TAG}-container"



echo "🔄 Docker 이미지를 빌드합니다... (태그: $GIT_TAG)"
docker build \
  -f ./docker/app.dockerfile \
  --platform linux/amd64 \
  -t $IMAGE_NAME .


echo "✅ Docker 이미지 빌드 완료: $IMAGE_NAME"

# 기존 컨테이너 정리
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
  echo "🗑️ 기존 컨테이너를 중지하고 삭제합니다..."
  docker stop $CONTAINER_NAME || true
  docker rm $CONTAINER_NAME || true
fi


