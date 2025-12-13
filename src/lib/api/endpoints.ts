export const API = {
  AUTH: {
    CHECK_EMAIL: "/email/check-email",
    SEND_CODE: "/email/send-code",
    VERIFY_CODE: "/email/verify-code",
    CHANGE_PASSWORD: "/email/change-password",
  },
  PHONE: {
    SEND: "/phone/send",
    VERIFY: "/phone/verify",
  },
  MEMBER: {
    SIGNUP: "/normalMembers",
    LOGIN: "/login",
    LOGOUT: "/logout",
  },
  MATCH: {
    REQUEST: "/matches/request",
    RESULT: "/matches/result",
  },
} as const;
