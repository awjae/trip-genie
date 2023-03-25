# Trip Genie
AI 여행 플래너

# Commit Convention
```bash
[ADD] : 신기능 추가/개선
[BUG] : 버그 수정 #113132
[CLN] : 불필요한 코드 제거
[BLD] : 빌드관련 프로세스 수정
[PERF] : 속도 개선
[DOC] : 문서화
[TST] : 테스트
```

# Info / 우려사항
- zeroshot AI 형태 (예시 없이 곧바로 처리)
- prompt engineering (JSON 포맷)
- https://platform.openai.com/docs/guides/fine-tuning (추후 fine-tuning / 현재는 node 서버 요구됨)
- fact checking 이 필요함
- Deploy : Cloud Type
- API : NAVER BLOG, NAVER IMAGE, chatGPT

# build 팁
- .env : GENERATE_SOURCEMAP=false (소스트리맵 없애고 싶을때)
