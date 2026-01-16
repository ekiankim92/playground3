#!/bin/sh

BRANCH_NAME=$(git symbolic-ref --short HEAD)
if ! echo "$BRANCH_NAME" | grep -Eq '^(feat|fix|style|refactor|docs|test|chore)/'; then
  echo "❌ 브랜치 이름이 컨벤션에 맞지 않습니다: $BRANCH_NAME"
  echo "README의 브랜치 네이밍 규칙을 확인해주세요."
  exit 1
fi
