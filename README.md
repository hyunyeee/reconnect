# reconnect

SNS 기반 신원 확인(Instagram, TikTok)과 심리 분석(애착 유형 테스트)을 결합한 재회 매칭 서비스입니다.

이 프로젝트는 단순 매칭 기능 구현이 아니라,  
**인증 일관성 유지, 상태 책임 분리, SSR/CSR 경계 설계, Web → WebView 확장 대응**을 중심으로 설계되었습니다.

---

## 🏗️ Architecture Overview

### 1️⃣ 인증 구조 — 쿠키 기반 세션 + 401 중앙 처리

```
Client Request
   ↓
fetch(credentials: 'include')
   ↓
Backend (HTTPOnly Cookie 인증)
   ↓
401 / 403 응답
   ↓
React Query QueryCache.onError
   ↓
인증 만료 UX 처리 → 로그인 이동
```

#### 핵심 설계

- **HTTPOnly 쿠키 사용**
  - 클라이언트 JS에서 직접 토큰 접근 불가
  - XSS 노출 위험 최소화
- `credentials: 'include'` 기반 API 통신
- 401(AUTH_EXPIRED) / 403(FORBIDDEN) 명확히 분리 처리
- 다중 탭 환경에서 인증 만료 confirm이 한 번만 실행되도록 전역 플래그 제어

#### 프론트의 역할

- 인증 만료 UX 일관성 유지
- 다중 탭 race condition 방지
- 인증 실패 시 Query 정리 후 로그인 페이지 이동

---

## 🧠 State Management Strategy

### Jotai + TanStack Query 역할 분리

| 영역         | 도구        | 역할                               |
| ------------ | ----------- | ---------------------------------- |
| 영속 인증    | Cookie      | 토큰 저장                          |
| 서버 데이터  | React Query | 프로필, 매칭 상태, 커뮤니티 데이터 |
| UI 즉시 반응 | Jotai       | 로그인 여부, 네비게이션 상태       |

### 설계 원칙

- 서버 데이터는 **React Query가 단일 진실(Single Source of Truth)**
- 전역 상태는 최소화
- 서버 상태와 클라이언트 상태를 혼합하지 않음

---

## ⚙️ Rendering Strategy (SSR + CSR)

### SSR 단계

- `cookies()`로 토큰 **존재 여부만 판단**
- 로그인 여부 boolean 결정
- LCP 영역(헤더, 설명 문구) 서버 렌더링

### CSR 단계

- `/member/profile` 재검증
- Jotai 상태 갱신
- 로그인 여부에 따른 조건부 렌더링

### 트레이드오프

- ✅ 초기 렌더링 성능 및 SEO 확보
- ⚠️ 서버/클라이언트 상태 동기화 관리 필요

---

## 💬 댓글 페이지 전략

- 무한스크롤 대신 **“이전 페이지 불러오기” 방식 채택**
- 서버 정렬 기준 신뢰
- Query invalidate 범위 최소화
- 클라이언트 재정렬 제거

> UX 단순성과 정렬 일관성을 우선한 설계

---

## 🔄 매칭 상태 흐름 제어

매칭 상태는 서버 기준으로 다음 3단계로 구분됩니다:

1. 매칭 요청 없음
2. 대기 중
3. 매칭 완료

`MatchGate`에서 서버 응답 기반으로 자동 라우팅:

- `matched === true` → `/success`
- `matched === false` → `/waiting`
- `null` → 폼 화면 유지

### 효과

- 뒤로가기/새로고침 시 상태 불일치 방지
- 클라이언트 추정 상태 제거
- 서버 기준 상태 흐름 유지

---

## 📱 Web → Toss Mini App 확장

- `isTossMiniApp` 환경 감지 유틸 구현
- 내비게이션 API 분기 처리
- Zod 스키마 및 API 계층 로직은 수정 없이 유지

> 단일 코드베이스로 웹 + WebView 환경 지원

---

## 🧩 기술 스택

- Next.js (App Router)
- React 18
- TypeScript
- TanStack Query v5
- Jotai
- React Hook Form
- Zod

---

## 📁 주요 구조

```
src/
├── app/
│   ├── layout.tsx              # SSR 쿠키 확인
│   ├── Providers.tsx           # Jotai + QueryProvider
│   ├── (auth)/                 # 인증 관련 페이지
│   ├── (match)/                # 매칭 플로우
│
├── atoms/
│   └── auth.ts                 # authAtom 정의
│
├── hooks/query/
│   ├── useAuth.ts
│   ├── useMatch.ts
│   └── ...
│
├── lib/api/
│   ├── client.ts               # 통합 fetch 래퍼
│   ├── authExpireGuard.ts      # 다중 탭 제어
│   └── ...
```

---

## 📌 설계 원칙 요약

- 인증은 “기능”이 아니라 **운영 시나리오 문제**
- 상태는 역할 기준으로 분리
- 서버 데이터를 클라이언트 전역 상태에 복제하지 않음
- 에러 흐름을 먼저 설계
- 플랫폼이 달라져도 도메인 로직은 유지
