"use client";

import {
    ChevronsUpDown,
    LogOut,
} from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";

interface UserProps {
    name: string;
    email: string;
    avatar?: string;
}

function User(props: UserProps) {
    return (
        <>
            <Avatar className="size-10 rounded-lg">
                <AvatarImage src={props.avatar} alt={props.name} />
                <AvatarFallback className="rounded-lg">{props.name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <p className="truncate font-medium">{props.name}</p>
                <h6 className="truncate">{props.email}</h6>
            </div>
        </>
    );
}

interface SidebarNavUserProps {
    user?: UserProps;
    onLogout?: () => void;
}

export function SidebarNavUser(props: SidebarNavUserProps) {
    const { isMobile } = useSidebar();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <User
                                {...(props.user ?? {
                                    name: "unknown",
                                    email: "m@example.com",
                                })}
                            />
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0">
                            <div className="flex items-center gap-2 px-1 py-1.5">
                                <User
                                    {...(props.user ?? {
                                        name: "unknown",
                                        email: "m@example.com",
                                    })}
                                />
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard />
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator /> */}
                        <DropdownMenuItem onClick={props.onLogout}>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
