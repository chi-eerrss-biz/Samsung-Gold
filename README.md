# Samsung Gold Daily Screenshot

매일 09:00 KST 스케줄로 GitHub Actions에서 Chromium을 실행하여 삼성금거래소 홈페이지의 실제 렌더링 화면을 캡처합니다.

## 수동 테스트

```bash
npm install
npx playwright install --with-deps chromium
npm run capture
```

캡처는 `screenshots/YYYY-MM/YYYY-MM-DD-0900.webp`에 저장됩니다.

## 참고

GitHub Actions scheduled workflow는 스케줄 지연이 발생할 수 있어 정확히 09:00:00 실행을 보장하지 않습니다. 정확한 시각이 필요하면 Cloud Scheduler/Cloud Run 또는 별도 cron 서버로 전환할 수 있습니다.
