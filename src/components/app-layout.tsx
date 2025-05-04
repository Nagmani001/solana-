'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Home,
  GraduationCap,
  Trophy,
  User,
  Rocket,
  LifeBuoy,
  Settings,
  Sparkles,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset, // Import SidebarInset
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation';
import { WalletConnectButton } from '@/components/wallet-connect-button';
import { useProfile } from '@/contexts/profile-context'; // Import useProfile hook
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { profileData, isLoading, updateProfileData } = useProfile(); // Consume context

   const getInitials = (name: string) => {
       if (!name) return 'QE';
       return name.split(' ').map(n => n[0]).join('').toUpperCase();
   };

  // Effect to update profile data when it changes in the context
  // This ensures the sidebar reflects the latest name after editing
  React.useEffect(() => {
      // No need to explicitly update local state here, as we read directly from context
  }, [profileData]);


  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" side="left" variant="sidebar">
        <SidebarHeader className="items-center gap-2">
           <div className="flex items-center gap-2 w-full">
            <Sparkles className="size-6 text-primary" />
            <span className="text-xl font-semibold group-data-[collapsible=icon]:hidden">
               SolanaQuest
             </span>
           </div>
            <SidebarTrigger className="ml-auto md:hidden" />
        </SidebarHeader>

        <SidebarContent className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/'}
                tooltip="Dashboard"
              >
                <Link href="/">
                  <Home />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/trailhead' || pathname.startsWith('/trailhead/')}
                tooltip="Trailhead"
              >
                <Link href="/trailhead">
                  <GraduationCap />
                  <span>Trailhead</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/leaderboard'}
                tooltip="Leaderboard"
              >
                <Link href="/leaderboard">
                  <Trophy />
                  <span>Leaderboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <SidebarMenuButton
                 asChild
                 isActive={pathname === '/profile'}
                 tooltip="My Profile"
               >
                 <Link href="/profile">
                   <User />
                   <span>My Profile</span>
                 </Link>
               </SidebarMenuButton>
             </SidebarMenuItem>
             <SidebarMenuItem>
               <SidebarMenuButton
                 asChild
                 isActive={pathname === '/path'}
                 tooltip="My Path"
               >
                 <Link href="/path">
                   <Rocket />
                   <span>My Path</span>
                 </Link>
               </SidebarMenuButton>
             </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-2 space-y-2">
            {/* User Profile Link */}
           <SidebarMenu>
             <SidebarMenuItem>
               <SidebarMenuButton asChild tooltip="User Profile" size="lg">
                 <Link href="/profile" className="justify-start">
                    {isLoading ? (
                        <Skeleton className="size-8 rounded-full" />
                    ) : (
                       <Avatar className="size-8">
                         {profileData.avatar && <AvatarImage src={profileData.avatar} alt={profileData.name} data-ai-hint="profile picture user avatar" />}
                         <AvatarFallback>{getInitials(profileData.name)}</AvatarFallback>
                       </Avatar>
                    )}
                   <div className="flex flex-col items-start group-data-[collapsible=icon]:hidden">
                     {isLoading ? (
                         <>
                             <Skeleton className="h-4 w-24 mb-1" />
                             <Skeleton className="h-3 w-32" />
                         </>
                     ) : (
                        <>
                          {/* Read name directly from profileData context */}
                          <span className="font-medium">{profileData.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {profileData.solPoints} SOL Points - {profileData.level}
                          </span>
                        </>
                     )}
                   </div>
                 </Link>
               </SidebarMenuButton>
             </SidebarMenuItem>
          </SidebarMenu>

           {/* Wallet Connect Button - Visible when sidebar expanded */}
           <div className="group-data-[collapsible=icon]:hidden px-1">
               <WalletConnectButton className="w-full" />
           </div>

           {/* Wallet Connect Button - Icon only when sidebar collapsed */}
            <div className="hidden group-data-[collapsible=icon]:block">
                {/* Wrap icon-only button in tooltip */}
                <SidebarMenuButton
                 asChild
                 tooltip="Connect Wallet"
                 className="!w-8 !h-8 !p-0 justify-center" // Center icon
                 variant="ghost" // Use ghost for icon only
                >
                  <WalletConnectButton className="!w-8 !h-8 !p-0 !bg-transparent !border-none !shadow-none [&>img]:hidden [&>svg]:block" />
                </SidebarMenuButton>
            </div>


           <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Help & Support" isActive={pathname === '/help'}>
                <Link href="/help">
                  <LifeBuoy />
                  <span>Help</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings" isActive={pathname === '/settings'}>
                <Link href="/settings">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:hidden">
            <div className="flex items-center gap-2">
             <Sparkles className="size-6 text-primary" />
             <span className="text-lg font-semibold">SolanaQuest</span>
           </div>
            <div className="flex items-center gap-2">
               <WalletConnectButton className="!h-8 !text-xs" /> {/* Smaller button for mobile header */}
               <SidebarTrigger />
            </div>
         </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
