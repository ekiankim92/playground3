# 1. 의존성 설치, 정적 스토리북 빌드
FROM node:22-alpine AS base

# 디펜던시 설치 스테이지
FROM base AS deps

WORKDIR /app

# 패키지 매니저 파일만 먼저 복사 (캐시 최적화)
COPY package.json yarn.lock ./

# 의존성 설치
RUN yarn install --frozen-lockfile

# 전체 소스 복사
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Storybook 정적 빌드 (빌드 산출물: storybook-static)
RUN yarn storybook:build

# 실행 스테이지
FROM base AS runner
WORKDIR /app

# 빌드 산출물만 복사 (이미지 경량화)
COPY --from=builder /app/storybook-static ./storybook-static

# 스토리북 기본 포트 오픈
EXPOSE 6006

# serve로 정적 결과물을 서비스
CMD ["npx", "http-server", "storybook-static","-p", "6006"]
