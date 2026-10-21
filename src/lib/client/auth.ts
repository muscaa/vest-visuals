import { m } from "@shared/paraglide/messages";
import { createAuthClient } from "better-auth/react";
import { adminClient, twoFactorClient } from "better-auth/client/plugins";

/**
 * Sign in, sign up and account changes go through Better Auth's own endpoints, not server functions:
 * only those are rate limited and checked against cross-site requests.
 */
export const authClient = createAuthClient({
    plugins: [
        twoFactorClient(),
        adminClient(),
    ],
});

/** Better Auth error codes, see `BASE_ERROR_CODES` and the two factor plugin's codes. Others get a generic message. */
const errorMessages: Record<string, () => string> = {
    INVALID_EMAIL_OR_PASSWORD: m.auth_error_credentials,
    EMAIL_NOT_VERIFIED: m.auth_error_email_not_verified,
    INVALID_EMAIL: m.auth_error_email_invalid,
    PASSWORD_TOO_SHORT: m.auth_error_password_length,
    PASSWORD_TOO_LONG: m.auth_error_password_length,
    INVALID_PASSWORD: m.auth_error_password_wrong,
    USER_ALREADY_EXISTS: m.auth_error_email_taken,
    USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: m.auth_error_email_taken,
    // a reset link that expired while its page was open
    INVALID_TOKEN: m.auth_error_link,
    INVALID_CODE: m.auth_error_code,
    OTP_HAS_EXPIRED: m.auth_error_code_expired,
    TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE: m.auth_error_code_attempts,
    ACCOUNT_TEMPORARILY_LOCKED: m.auth_error_locked,
    INVALID_TWO_FACTOR_COOKIE: m.auth_error_sign_in_expired,
};

/** A message for an error from the auth client. */
export function authErrorMessage(error: { code?: string; status?: number }) {
    if (error.status === 429) {
        return m.auth_error_rate_limit();
    }

    return (error.code && errorMessages[error.code]?.()) || m.auth_error_generic();
}
