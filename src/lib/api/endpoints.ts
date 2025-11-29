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
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
  },
} as const;
