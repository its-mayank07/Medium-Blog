import AppBar from "../components/AppBar";
import { useAllUsers } from "../hooks";
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import { useState } from "react";
import AllUsersShimmer from "../components/Shimmer/AllUsersShimmer";
import { FaUsers } from "react-icons/fa";

function AllUsers() {
    const { allUsers, loading } = useAllUsers();
    const [searchTerm, setSearchTerm] = useState("");

    // Filter users based on search term
    const filteredUsers = allUsers.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if(loading) {
        return <AllUsersShimmer />;
    }

    return (
        <div>
            <AppBar />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <div className="p-2 bg-gray-900 rounded-lg">
                        <FaUsers className="text-white text-xl sm:text-2xl md:text-2xl drop-shadow-sm" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Discover Writers
                        </h1>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base text-center">Find and follow amazing writers on Medium</p>
                </div>

                {/* Search and Results Row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    {/* Search Bar */}
                    <div className="flex-1">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search writers by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 bg-white"
                            />
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Results Counter */}
                    <div className="flex-shrink-0">
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            {filteredUsers.length} {filteredUsers.length === 1 ? 'writer' : 'writers'} found
                        </span>
                    </div>
                </div>

                {/* Users List */}
                <div className="space-y-2">
                    {filteredUsers.map((user) => (
                        <Link 
                            key={user.id} 
                            to={`/user/${user.id}`}
                            className="block group"
                        >
                            <div className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-all duration-200 hover:border-gray-300">
                                {/* User Info Row */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                                        <div className="flex-shrink-0">
                                            <Avatar name={user.id} size="small" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h2 className="text-sm sm:text-base font-semibold text-gray-900 truncate group-hover:text-gray-700 transition-colors">
                                                {user.name || "Anonymous"}
                                            </h2>
                                            <p className="text-xs sm:text-sm text-gray-500 truncate">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Stats - Hidden on mobile */}
                                    <div className="hidden md:flex items-center space-x-4">
                                        <div className="text-center">
                                            <div className="text-xs font-semibold text-gray-900">
                                                {user.postsCount}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {user.postsCount === 1 ? 'Post' : 'Posts'}
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xs font-semibold text-gray-900">
                                                {user.followersCount}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {user.followersCount === 1 ? 'Follower' : 'Followers'}
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xs font-semibold text-gray-900">
                                                {user.followingCount}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Following
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors font-medium">
                                            View Profile →
                                        </div>
                                    </div>

                                    {/* Mobile: Show only arrow */}
                                    <div className="md:hidden">
                                        <div className="text-gray-600 group-hover:text-gray-700 transition-colors">
                                            →
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {filteredUsers.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                        <p className="text-gray-600 text-sm max-w-md mx-auto">
                            There are no users to display at the moment.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AllUsers;