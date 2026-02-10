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
    SIGNUP: "/auth/normalMembers",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ADD_TIKTOK_ID: "/profile/tiktok",
    PROFILE: "/profile/me",
    DELETE: "/profile/member",
    RESET_PASSWORD: "/auth/reset-password",
  },
  MATCH: {
    INSTA: {
      REQUEST: "/matches/request",
      RESULT: "/matches/result",
    },
    TIKTOK: {
      REQUEST: "/matches/tiktok/request",
      RESULT: "/matches/tiktok/result",
    },
  },
  ATTACHMENT: {
    QUESTIONS: "/attachment-test/questions",
    SUBMIT: "/attachment-test/submit",
    RESULT: "/attachment-test/result",
  },
  COMMUNITY: {
    POSTS: "/posts",
    POSTS_PAGED: "/posts/paged",
    COMMENTS_PAGED: (postId: number) => `/comments/post/${postId}/paged`,
    COMMENTS: "/comments",
  },
} as const;
