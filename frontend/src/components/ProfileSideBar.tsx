import type { Blog } from "../hooks";
import Avatar from "./Avatar";
import { faker } from "@faker-js/faker";
import Followers from "./Followers";
import Followings from "./Followings";
import { useIsFollowing } from "../hooks";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useState, useEffect } from "react";

const generateAuthorBio = () => {
    return faker.person.bio(); // Returns realistic bios
};

export default function ProfileSidebar({ blogs, isOwnProfile, userId }: { blogs: Blog[], isOwnProfile: boolean, userId: string }) {
  const authorId = userId;
  const [authorName, setAuthorName] = useState<string>("Loading...");
  const [authorEmail, setAuthorEmail] = useState<string>("Loading...");

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      setAuthorName(blogs[0].author.name || (isOwnProfile ? "Your Profile" : "Anonymous"));
      setAuthorEmail(blogs[0].author.email || (isOwnProfile ? "Your Profile" : "Anonymous"));
    } else if (authorId) {
      const getProfile = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/v1/user/${authorId}/profile`, {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          });
          const name = response.data.name;
          setAuthorName(name || (isOwnProfile ? "Your Profile" : "Anonymous"));
          const email = response.data.email;
          setAuthorEmail(email || (isOwnProfile ? "Your Profile" : "Anonymous"));
        } catch {
          setAuthorName(isOwnProfile ? "Your Profile" : "Anonymous");
          setAuthorEmail(isOwnProfile ? "Your Profile" : "Anonymous");
        }
      };
      getProfile();
    }
  }, [blogs, authorId, isOwnProfile]);

  const { isFollowing: initialIsFollowing, loading: isFollowingLoading } = useIsFollowing(authorId);
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"followers" | "following">("followers");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setIsFollowing(initialIsFollowing);
  }, [initialIsFollowing]);

  const handleFollow = async () => {
    if (!authorId || isFollowing === null) return;
    setActionLoading(true);
    try {
      if (isFollowing) {
        await axios.delete(`${BACKEND_URL}/api/v1/user/${authorId}/unfollow`, {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        });
        setIsFollowing(false);
      } else {
        await axios.post(`${BACKEND_URL}/api/v1/user/${authorId}/follow`, {}, {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        });
        setIsFollowing(true);
      }
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <aside className="w-full max-w-xs mx-auto md:w-72 lg:w-96 md:pl-8 flex-shrink-0 mb-8 md:mb-0 md:self-start">
      <div className="bg-white rounded-xl p-6 flex flex-col items-center">
        <Avatar name={authorId || "U"} size="forProfile" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900 text-center">
          {authorName}
        </h1>
        <p className="text-gray-500 text-sm mb-2 text-center">
          {authorEmail}
        </p>
        <p className="text-gray-500 text-sm mb-2 text-center italic">
          {/* Author bio placeholder */}
          {generateAuthorBio() || "No bio provided yet."}
        </p>
        <div className="flex flex-col items-stretch w-full gap-3 mt-4">
          {!isOwnProfile && (
            isFollowingLoading || actionLoading ? (
              <div className="flex items-center justify-center w-full">
                <span
                  className="inline-block w-7 h-7 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"
                  aria-label="Loading"
                />
              </div>
            ) : (
              <button
                onClick={handleFollow}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 w-full justify-center ${actionLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={actionLoading}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )
          )}
        </div>
        {/* Tab Navbar for Followers/Following */}
        <div className="flex w-full justify-center mb-4 mt-4">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-l ${activeTab === "followers" ? "bg-gray-200 text-gray-900" : "bg-gray-100 text-gray-500"}`}
            onClick={() => setActiveTab("followers")}
          >
            Followers
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-r ${activeTab === "following" ? "bg-gray-200 text-gray-900" : "bg-gray-100 text-gray-500"}`}
            onClick={() => setActiveTab("following")}
          >
            Following
          </button>
        </div>
        <div className="w-full">
          {activeTab === "followers" ? (
            <Followers id={authorId} refreshKey={refreshKey} />
          ) : (
            <Followings id={authorId} refreshKey={refreshKey} />
          )}
        </div>
      </div>
    </aside>
  );
}