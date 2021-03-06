export enum UserError {
    // Must Exist
    NAME_MUST_BE_PROVIDED = 'NAME_MUST_BE_PROVIDED',
    EMAIL_MUST_BE_PROVIDED = 'EMAIL_MUST_BE_PROVIDED',
    LOGIN_INFO_BE_PROVIDED = 'LOGIN_INFO_BE_PROVIDED',
    PHONE_MUST_BE_PROVIDED = 'PHONE_MUST_BE_PROVIDED',
    PASSWORD_MUST_BE_PROVIDED = 'PASSWORD_MUST_BE_PROVIDED',
    CANNOT_FIND_USER = 'CANNOT_FIND_USER',
    // Unique
    EMAIL_IS_EXISTED = 'EMAIL_IS_EXISTED',
    PHONE_IS_EXISTED = 'PHONE_IS_EXISTED',
    // Validate
    EMAIL_INCORRECT = 'EMAIL_INCORRECT',
    INVALID_LOG_IN_INFO = 'INVALID_LOG_IN_INFO',
    INVALID_USER_INFO = 'INVALID_USER_INFO',
    // Change Password
    OLD_PASSWORD_MUST_BE_PROVIDED = 'OLD_PASSWORD_MUST_BE_PROVIDED',
    NEW_PASSWORD_MUST_BE_PROVIDED = 'NEW_PASSWORD_MUST_BE_PROVIDED',
    OLD_PASSWORD_INCORRECT = 'OLD_PASSWORD_INCORRECT',
    // Role related
    PERMISSION_DENIED = 'PERMISSION_DENIED',
    USER_INFO_EXPIRED = 'USER_INFO_EXPIRED'
}