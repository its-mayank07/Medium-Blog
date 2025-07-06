import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
}

const Comments = ({ id }: { id: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [deletingComment, setDeletingComment] = useState<string | null>(null);
  const [savingComment, setSavingComment] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    setCurrentUserId(storedUserId);
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}/comments`, {
          headers: {
            Authorization: sessionStorage.getItem("token") || "",
          },
        });
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [id]);

  const createComment = async () => {
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/${id}/comment`,
        { content: newComment.trim() },
        {
          headers: {
            Authorization: sessionStorage.getItem("token") || "",
          },
        }
      );
      setComments((prev) => [response.data.comment, ...prev]);
      setNewComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const updateComment = async (commentId: string) => {
    if (!editContent.trim()) return;

    setSavingComment(commentId);
    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/blog/${id}/comment/${commentId}`,
        { content: editContent.trim() },
        {
          headers: {
            Authorization: sessionStorage.getItem("token") || "",
          },
        }
      );

      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: editContent.trim() }
            : comment
        )
      );
      setEditingComment(null);
      setEditContent("");
    } catch (error) {
      console.error("Error updating comment:", error);
    } finally {
      setSavingComment(null);
    }
  };

  const deleteComment = async (commentId: string) => {
    setDeletingComment(commentId);
    try {
      await axios.delete(
        `${BACKEND_URL}/api/v1/blog/${id}/comment/${commentId}`,
        {
          headers: {
            Authorization: sessionStorage.getItem("token") || "",
          },
        }
      );
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setDeletingComment(null);
    }
  };

  const handleEdit = (comment: Comment) => {
    setEditingComment(comment.id);
    setEditContent(comment.content);
  };

  const handleCancel = () => {
    setEditingComment(null);
    setEditContent("");
  };

  const handleEditContentChange = (content: string) => {
    setEditContent(content);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add a comment</h3>
        <div className="flex gap-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
            rows={2}
            disabled={submitting}
          />
          <button
            onClick={createComment}
            disabled={!newComment.trim() || submitting}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors self-start"
          >
            {submitting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Comments ({comments.length})
        </h3>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse flex gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No comments yet. Be the first to comment!
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                currentUserId={currentUserId}
                editingComment={editingComment}
                editContent={editContent}
                deletingComment={deletingComment}
                savingComment={savingComment}
                onEdit={handleEdit}
                onSave={updateComment}
                onCancel={handleCancel}
                onDelete={deleteComment}
                onEditContentChange={handleEditContentChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
