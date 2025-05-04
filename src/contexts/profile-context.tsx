'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';

// Define the structure of profile data
// Ensure this matches or is compatible with UserProfileData in user-profile.tsx
export interface UserProfileData {
    name: string;
    username: string;
    bio: string;
    avatar?: string;
    level: string;
    levelProgress: number;
    solPoints: number;
    achievements: Array<{ name: string; icon: React.ElementType; color: string; description: string; }>;
    completedModules: number;
    totalModules: number; // Make sure this aligns with actual module count
    joinedDate: string | null;
    lastActive: string;
    certificates: Array<{ name: string; url?: string; date: string }>; // Example structure
    nftsEarned: Array<{ name: string; imageUrl: string }>; // Example structure
    github: string;
    twitter: string;
}

// Default mock data - Can be loaded from localStorage or API later
const defaultUserProfileData: UserProfileData = {
    name: 'Quest Explorer',
    username: '',
    bio: '',
    avatar: '',
    level: 'Beginner',
    levelProgress: 0,
    solPoints: 0,
    achievements: [],
    completedModules: 0,
    totalModules: 5, // Keep this updated or fetch dynamically
    joinedDate: null, // Will be set client-side
    lastActive: 'Now',
    certificates: [],
    nftsEarned: [],
    github: '',
    twitter: '',
};

interface ProfileContextType {
    profileData: UserProfileData;
    updateProfileData: (newData: Partial<UserProfileData>) => void;
    isLoading: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [profileData, setProfileData] = useState<UserProfileData>(defaultUserProfileData);
    const [isLoading, setIsLoading] = useState(true); // Simulate loading

    // Simulate initial data loading and set joinedDate client-side
    useEffect(() => {
        // In a real app, fetch data from backend/localStorage here
        const initialData = {
            ...defaultUserProfileData,
            joinedDate: new Date().toLocaleDateString(), // Set joined date on load
            // Potentially load saved data here
        };
        setProfileData(initialData);
        setIsLoading(false);
    }, []);

    const updateProfileData = useCallback((newData: Partial<UserProfileData>) => {
        setProfileData(prevData => ({
            ...prevData,
            ...newData,
            lastActive: 'Now', // Update last active time on change
        }));
        // In a real app, save data to backend/localStorage here
    }, []);

    const value = { profileData, updateProfileData, isLoading };

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = (): ProfileContextType => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};
