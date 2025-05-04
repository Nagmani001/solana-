'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Crown, Medal, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


// Mock Data - Replace with actual data fetching
const leaderboardData = {
  overall: [
    { rank: 1, name: 'SolanaSage', points: 15000, avatar: 'https://picsum.photos/id/1011/50/50', level: 'Advanced' },
    { rank: 2, name: 'CryptoKnight', points: 13500, avatar: 'https://picsum.photos/id/1025/50/50', level: 'Advanced' },
    { rank: 3, name: 'NFTNinja', points: 12800, avatar: 'https://picsum.photos/id/237/50/50', level: 'Intermediate' },
    { rank: 4, name: 'DeFiDev', points: 11200, avatar: 'https://picsum.photos/id/10/50/50', level: 'Intermediate' },
    { rank: 5, name: 'PixelPioneer', points: 9800, avatar: 'https://picsum.photos/id/30/50/50', level: 'Intermediate' },
    { rank: 6, name: 'CodeCrafter', points: 8500, avatar: 'https://picsum.photos/id/40/50/50', level: 'Beginner' },
    { rank: 7, name: 'TokenTrekker', points: 7200, avatar: 'https://picsum.photos/id/50/50/50', level: 'Beginner' },
  ],
  weekly: [
     { rank: 1, name: 'NFTNinja', points: 1200, avatar: 'https://picsum.photos/id/237/50/50', level: 'Intermediate' },
     { rank: 2, name: 'SolanaSage', points: 1150, avatar: 'https://picsum.photos/id/1011/50/50', level: 'Advanced' },
     { rank: 3, name: 'PixelPioneer', points: 950, avatar: 'https://picsum.photos/id/30/50/50', level: 'Intermediate' },
     { rank: 4, name: 'CodeCrafter', points: 800, avatar: 'https://picsum.photos/id/40/50/50', level: 'Beginner' },
     { rank: 5, name: 'DeFiDev', points: 750, avatar: 'https://picsum.photos/id/10/50/50', level: 'Intermediate' },
  ]
};

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('');

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="h-4 w-4 text-yellow-400" />;
  if (rank === 2) return <Medal className="h-4 w-4 text-gray-400" />;
  if (rank === 3) return <Medal className="h-4 w-4 text-orange-400" />;
  return null;
};

const getLevelBadge = (level: string) => {
  switch (level.toLowerCase()) {
    case 'beginner': return <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/50">Beginner</Badge>;
    case 'intermediate': return <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">Intermediate</Badge>;
    case 'advanced': return <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/50">Advanced</Badge>;
    default: return <Badge variant="outline">{level}</Badge>;
  }
}

export function Leaderboard() {
  const renderTable = (data: typeof leaderboardData.overall) => (
     <Table>
       <TableHeader>
         <TableRow>
           <TableHead className="w-[50px]">Rank</TableHead>
           <TableHead>User</TableHead>
           <TableHead>Level</TableHead>
           <TableHead className="text-right">Points</TableHead>
         </TableRow>
       </TableHeader>
       <TableBody>
         {data.map((user) => (
           <TableRow key={user.rank}>
             <TableCell className="font-medium flex items-center gap-1">
               {getRankIcon(user.rank)}
               {user.rank}
               </TableCell>
             <TableCell>
               <div className="flex items-center gap-2">
                 <Avatar className="h-8 w-8">
                   <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="profile picture user avatar"/>
                   <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                 </Avatar>
                 <span>{user.name}</span>
               </div>
             </TableCell>
              <TableCell>{getLevelBadge(user.level)}</TableCell>
             <TableCell className="text-right font-mono flex items-center justify-end gap-1">
                {user.points.toLocaleString()} <Sparkles className="h-3 w-3 text-primary"/>
            </TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
  )

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Leaderboard</CardTitle>
        <CardDescription>See who's leading the SolanaQuest!</CardDescription>
      </CardHeader>
      <CardContent>
         <Tabs defaultValue="overall" className="w-full">
           <TabsList className="grid w-full grid-cols-2 mb-4">
             <TabsTrigger value="overall">Overall</TabsTrigger>
             <TabsTrigger value="weekly">This Week</TabsTrigger>
           </TabsList>
           <TabsContent value="overall">
             {renderTable(leaderboardData.overall)}
           </TabsContent>
           <TabsContent value="weekly">
              {renderTable(leaderboardData.weekly)}
           </TabsContent>
         </Tabs>
      </CardContent>
    </Card>
  );
}
