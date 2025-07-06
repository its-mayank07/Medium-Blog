import Avatar from "./Avatar";
import { FiEdit3, FiTrash2 } from "react-icons/fi";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
}

interface CommentCardProps {
  comment: Comment;
  currentUserId: string | null;
  editingComment: string | null;
  editContent: string;
  deletingComment: string | null;
  savingComment: string | null;
  onEdit: (comment: Comment) => void;
  onSave: (commentId: string) => void;
  onCancel: () => void;
  onDelete: (commentId: string) => void;
  onEditContentChange: (content: string) => void;
}

const CommentCard = ({
  comment,
  currentUserId,
  editingComment,
  editContent,
  deletingComment,
  savingComment,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onEditContentChange,
}: CommentCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isAuthor = currentUserId === comment.author.id;
  const isEditing = editingComment === comment.id;
  const isSaving = savingComment === comment.id;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-3">
        <Avatar name={comment.author.id} size="small" isDisable={true} />
        
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">
                {comment.author.name || "Anonymous"}
              </span>
              <span className="text-gray-500 text-sm">
                {formatDate(comment.createdAt)}
              </span>
            </div>
            
            {/* Action buttons - only show for comment author */}
            {isAuthor && (
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => onSave(comment.id)}
                      disabled={isSaving}
                      className="text-sm text-green-600 hover:text-green-700 font-medium px-2 py-1 rounded hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={onCancel}
                      disabled={isSaving}
                      className="text-sm text-gray-600 hover:text-gray-700 font-medium px-2 py-1 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => onEdit(comment)}
                      className="text-gray-600 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors"
                      title="Edit comment"
                    >
                      <FiEdit3 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(comment.id)}
                      className="text-gray-600 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                      disabled={deletingComment === comment.id}
                      title="Delete comment"
                    >
                      {deletingComment === comment.id ? (
                        <span className="text-xs">Deleting...</span>
                      ) : (
                        <FiTrash2 size={16} />
                      )}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          
          {/* Content */}
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={editContent}
                onChange={(e) => onEditContentChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
                rows={3}
                placeholder="Edit your comment..."
                disabled={isSaving}
              />
            </div>
          ) : (
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {comment.content}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard; 