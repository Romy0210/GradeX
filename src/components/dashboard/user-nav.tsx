"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { LogOut, User as UserIcon, Settings } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

export function UserNav() {
  const { user, role, logout } = useAuth();

  if (!user) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }
  
  const isStudent = role === 'student';
  const name = isStudent ? (user as any).name : 'Admin';
  const email = user.email;
  const avatarUrl = isStudent ? (user as any).avatar : `https://picsum.photos/seed/admin/100/100`;
  const profileUrl = isStudent ? '/student/profile' : '/admin/settings';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
             <Link href={profileUrl}>
                {isStudent ? <UserIcon className="mr-2 h-4 w-4" /> : <Settings className="mr-2 h-4 w-4" />}
                <span>{isStudent ? "Profile" : "Settings"}</span>
             </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
