import { id } from '@swimlane/ngx-datatable';

export const USER_URLS = {
  POST_CHANGE_PASSWORD: '/user/ChangePassword',
  GET_ALL_URL: '/User',
  GET_USER_URL: (id: string) => `/User/${id}`,
  GET_USER_POSITIONS_URL: (id: string) => `/User/${id}/positions`,
};
export const ACCOUNT_URLS = {
  POST_AUTH: '/Account/Auth',
  GET_TOKEN: '/Account/GetToken',
  GET_SIGN_OUT: '/Account/SignOut',
  POST_SEND_CONFIRMATION_CODE_PASSWORD_RESET:
    '/Account/SendConfirmationCodePasswordReset',
  POST_SEND_VERIFY_CODE_PASSWORD_RESET:
    '/Account/VerifyConfirmationCodePasswordReset',
  POST_SEND_PASSWORD_RESET: '/Account/PasswordReset',
  USER_INFO_URL: '/Account/GetAuthorizedUser',
  CAN_ACCESS_TO_SECTION_URL: (companyId: number, tableName: string) =>
    `/Account/CanAccessToSection/${companyId}/${tableName}`,
  GET_AUTH_USER_ACCESSIBLE_SECTIONS_URL: `/Account/GetAuthorizedUserAccessibleSections`,
  GET_REFRESH_TOKEN: '/Account/refresh-token',
  POST_REMOVE_TOKEN_URL: '/Account/remove-token',
  START_IMPERSONATE_URL: '/Account/start-impersonate',
  STOP_IMPERSONATE_URL: '/Account/stop-impersonate',
};

