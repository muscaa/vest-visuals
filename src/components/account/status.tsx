import { m } from "@shared/paraglide/messages";
import { Link } from "@tanstack/react-router";
import { SplitCard, SplitCardHeader } from "../cards/split";
import Bye1 from "../illustrations/bye-1.svg?react";
import MessageSent1 from "../illustrations/message-sent-1.svg?react";
import Success1 from "../illustrations/success-1.svg?react";
import Waiting3 from "../illustrations/waiting-3.svg?react";
import { buttonVariants } from "../ui/button";

/** What the links and forms pass on to the status page. */
export interface StatusInfo {
    /** the address an email went to */
    email?: string;
    /** where to go after signing in */
    redirect?: string;
}

interface Status {
    illustration: React.FC<React.SVGProps<SVGSVGElement>>;
    title: () => string;
    description: (info: StatusInfo) => string;
    action?: (info: StatusInfo) => React.ReactNode;
    /** shown instead when the link from the email didn't work */
    expired?: Omit<Status, "expired">;
}

const actions = {
    login: (info: StatusInfo) => (
        <Link to="/account/login" search={{ redirect: info.redirect }} className={buttonVariants({ size: "lg" })}>
            {m.login_submit()}
        </Link>
    ),
    backToLogin: () => (
        <Link to="/account/login" className={buttonVariants({ variant: "outline", size: "lg" })}>
            {m.common_back_to_login()}
        </Link>
    ),
    newResetLink: () => (
        <Link to="/account/forgot-password" className={buttonVariants({ size: "lg" })}>
            {m.reset_request_new()}
        </Link>
    ),
    settings: () => (
        <Link to="/account/settings" className={buttonVariants({ size: "lg" })}>
            {m.account_settings()}
        </Link>
    ),
    site: () => (
        <Link to="/home" className={buttonVariants({ variant: "outline", size: "lg" })}>
            {m.account_back_to_site()}
        </Link>
    ),
};

const linkExpired = {
    illustration: Waiting3,
    title: m.status_link_expired_title,
};

export const statusNames = [
    "signup",
    "password-requested",
    "email-verified",
    "password-changed",
    "reset-expired",
    "email-change-confirmed",
    "email-changed",
    "account-deleted",
] as const;

export type StatusName = (typeof statusNames)[number];

const statuses: Record<StatusName, Status> = {
    "signup": {
        illustration: MessageSent1,
        title: m.status_check_email,
        description: ({ email = "" }) => m.status_signup({ email }),
        action: actions.backToLogin,
    },
    "password-requested": {
        illustration: MessageSent1,
        title: m.status_check_email,
        description: ({ email = "" }) => m.status_password_requested({ email }),
        action: actions.backToLogin,
    },
    "email-verified": {
        illustration: Success1,
        title: m.status_email_verified_title,
        description: () => m.status_email_verified(),
        action: actions.login,
        // signing in sends a new link
        expired: { ...linkExpired, description: () => m.status_verify_expired(), action: actions.login },
    },
    "password-changed": {
        illustration: Success1,
        title: m.status_password_changed_title,
        description: () => m.status_password_changed(),
        action: actions.login,
    },
    "reset-expired": {
        ...linkExpired,
        description: () => m.auth_error_link(),
        action: actions.newResetLink,
    },
    "email-change-confirmed": {
        illustration: MessageSent1,
        title: m.status_email_change_confirmed_title,
        description: ({ email = "" }) => m.status_email_change_confirmed({ email }),
    },
    "email-changed": {
        illustration: Success1,
        title: m.status_email_changed_title,
        description: ({ email = "" }) => m.status_email_changed({ email }),
        action: actions.settings,
        expired: { ...linkExpired, description: () => m.status_email_change_expired(), action: actions.settings },
    },
    "account-deleted": {
        illustration: Bye1,
        title: m.status_account_deleted_title,
        description: () => m.status_account_deleted(),
        action: actions.site,
    },
};

export interface AccountStatusProps {
    name: StatusName;
    info: StatusInfo;
    /** the link from the email didn't work */
    expired?: boolean;
}

/** Where the auth emails' links and the forms that send them end: what happened, and where to go next. */
export function AccountStatus(props: AccountStatusProps) {
    const status = (props.expired && statuses[props.name].expired) || statuses[props.name];
    const Illustration = status.illustration;

    return (
        <SplitCard aside={<Illustration aria-hidden className="w-full max-w-xs h-auto" />}>
            <div className="flex flex-col items-center gap-6 text-center">
                <SplitCardHeader title={status.title()} description={status.description(props.info)} />
                {status.action?.(props.info)}
            </div>
        </SplitCard>
    );
}
