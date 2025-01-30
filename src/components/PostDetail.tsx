import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Box, Typography, Button, TextField, Paper, Avatar, Divider } from "@mui/material";
interface Comment { id: number; text: string; children: Comment[]; }
interface Post { id: number; title: string; content: string; comments: Comment[]; }
interface PostDetailProps {
  posts: Post[];
  addComment: (postId: number, text: string) => void;
  addReplyToReply: (postId: number[], commentPath: number[], text: string) => void;
}
// Comment Form Component
const CommentForm = ({onSubmit,buttonText, buttonStyle}: {onSubmit: (e: React.FormEvent, text: string) => void; buttonText: string; }) => {
  const [text, setText] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(e, text);
    setText("");
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // Ensures the button and text field are aligned
        gap: 1,
        mt: 2,
        p: 1.5,
        borderRadius: "8px",
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
      }}
    >
      <Avatar sx={{ bgcolor: "#ff416c", boxShadow: "0 3px 8px rgba(0,0,0,0.2)" }}>U</Avatar>
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        sx={{
          input: { color: "#fff" },
          bgcolor: "rgba(255,255,255,0.1)",
          borderRadius: "6px",
          flexGrow: 1, // Ensure the TextField takes available space
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          textTransform: "none",
          bgcolor: "#ff416c",
          backgroundImage: "linear-gradient(135deg, #ff416c, #ff4b2b)",
          borderRadius: "20px",
          px: 3,
          fontWeight: "bold",
          minWidth: "100px",
          boxShadow: "0 4px 12px rgba(255, 65, 108, 0.4)",
          "&:hover": {
            backgroundImage: "linear-gradient(135deg, #ff4b2b, #ff416c)",
            boxShadow: "0 6px 20px rgba(255, 75, 43, 0.5)",
          },
          ...buttonStyle,
        }}
      > {buttonText} </Button>
    </Box>
  );
};

// PostDetail Component
export const PostDetail: React.FC<PostDetailProps> = ({ posts, addComment, addReplyToReply }) => {
  const { postId } = useParams();
  const currentPost = posts.find((post) => post.id === parseInt(postId || ""));
  const [replyingTo, setReplyingTo] = useState<number[] | null>(null);
  if (!currentPost) return <Typography variant="h6">Post not found!</Typography>;
  const handleCommentSubmit = (e: React.FormEvent, text: string) => {
    e.preventDefault();
    addComment(currentPost.id, text);
  };
  const handleReplySubmit = (e: React.FormEvent, commentPath: number[], text: string) => {
    e.preventDefault();
    addReplyToReply(currentPost.id, commentPath, text);
    setReplyingTo(null);
  };
  const renderComments = (comments: Comment[], path: number[]) => {
    return comments.map((comment) => {
      const newPath = [...path, comment.id];
      return (
        // <Box key={comment.id} sx={{ ml: `${path.length * 15}px`, mt: 1.5 }}>
        <Box key={comment.id} sx={{ ml: `10px`, mt: 1.5 }}> 
          <Paper
            sx={{
              p: 1.5,
              borderRadius: 1.5,
              backgroundColor: "rgba(40, 40, 40, 0.85)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar sx={{ bgcolor: "secondary.main", mr: 1 }}>A</Avatar>
              <Typography variant="body1" fontWeight="bold" color="#fff">
                User {comment.id}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "#ddd" }}>
              {comment.text}
            </Typography>
            <Button
              size="small"
              onClick={() => setReplyingTo(newPath)}
              sx={{ textTransform: "none", color: "#ff416c", fontWeight: "bold" }}
            >
              Reply
            </Button>
          </Paper>
          {replyingTo && replyingTo.join(",") === newPath.join(",") && (
            <CommentForm onSubmit={(e, text) => handleReplySubmit(e, newPath, text)} buttonText="Reply" />
          )}
          {comment.children.length > 0 && renderComments(comment.children, newPath)}
        </Box>
      );
    });
  };
  return (
    <Card variant="outlined" sx={{ p: 3, mb: 2, borderRadius: 2, background: "rgba(30, 30, 30, 0.9)", color: "#fff" }} >
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: "#ff416c" }}>
        {currentPost.title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, color: "#ccc" }}>
        {currentPost.content}
      </Typography>
      <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.2)" }} />
      <Typography variant="h6" fontWeight="bold" sx={{ color: "#ff4b2b" }}>
        Comments ({currentPost.comments.length})
      </Typography>
      <Box sx={{ mt: 2 }}>{renderComments(currentPost.comments, [currentPost.id])}</Box>
      <CommentForm onSubmit={handleCommentSubmit} buttonText="Send" />
    </Card>
  );
};