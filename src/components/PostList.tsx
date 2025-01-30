import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NewPost } from "./NewPost.tsx";
import { Box, Typography, Card, Button, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface PostListProps {
  posts: Array<any>;
  addPost: (title: string, content: string) => void;
}

export const PostList: React.FC<PostListProps> = ({ posts, addPost }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* Add New Post Button */}
      <Button
        variant="contained"
        sx={{
          mb: 3,
          background: "linear-gradient(45deg, #FF6F61, #FF8A80)", 
          borderRadius: "50px",
          padding: "12px 24px", 
          fontWeight: "bold",
          textTransform: "none", 
          "&:hover": {
            backgroundColor: "#FF5252", 
          },
        }}
        onClick={handleOpen}
      >
        Add New Post
      </Button>

      {/* Modal for Creating New Post */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              xs: "80%",  // 90% width on extra small screens (mobile)
              sm: "80%",  // 80% width on small screens (tablet)
              md: 500,    // 500px width on medium screens (desktop)

            },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 4,
            backdropFilter: "blur(10px)", 
            transition: "all 0.3s ease", 
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#888",
              "&:hover": {
                color: "#000", 
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* New Post Form */}
          <NewPost addPost={addPost} setModel={setOpen} />
        </Box>
      </Modal>

      {/* Display Posts */}
      {posts.map((post) => (
        <Card
          key={post.id}
          variant="outlined"
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            mb: 3,
            borderRadius: 5,
            boxShadow: 3, 
            "&:hover": {
              boxShadow: 8, 
              transform: "scale(1.02)", 
              transition: "all 0.3s ease", 
            },
          }}
        >
          <Box>
            <Typography
              sx={{ fontFamily: "Poppins", fontSize: "1.2rem", color: "#333", fontWeight: "bold" }}
              variant="h6"
              gutterBottom
            >
              <Link
                to={`/post/${post.id}`}
                style={{
                  textDecoration: "none",
                  color: "#FF6F61", 
                  fontWeight: "bold",
                }}
              >
                {post.title}
              </Link>
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1, fontSize: "1rem", lineHeight: 1.6 }}
            >
              {post.content}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1, fontSize: "0.9rem", fontStyle: "italic" }}
            >
              {post.comments.length} Comments
            </Typography>
          </Box>
        </Card>
      ))}
    </div>
  );
};
