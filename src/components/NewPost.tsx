import React, { useState } from "react";
import { Box, TextField, Button, Typography } from '@mui/material';

interface NewPostProps {
  addPost: (title: string, content: string) => void;
  setModel: (open: boolean) => void;
}

export const NewPost: React.FC<NewPostProps> = ({ addPost, setModel }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      addPost(title, content);
      setTitle(""); 
      setContent(""); 
      setModel(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        margin: 'auto',
        borderRadius: 2,
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {/* Title of the Form */}
      <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Add New Post
      </Typography>

      {/* Title Input Field */}
      <TextField
        label="Post Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{
          // marginBottom: 2,
          borderRadius: 1,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ccc", // Border color
            },
            "&:hover fieldset": {
              borderColor: "#FF6F61", // Color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FF6F61", // Focus color
            },
          },
        }}
      />

      {/* Content Input Field */}
      <TextField
        label="Post Content"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{
          // marginBottom: 3,
          borderRadius: 1,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ccc", // Border color
            },
            "&:hover fieldset": {
              borderColor: "#FF6F61", // Hover border color
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FF6F61", // Focus border color
            },
          },
        }}
      />

      {/* Submit Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
                type="submit" variant="contained"
                sx={{
                  textTransform: "none",
                  bgcolor: "#ff416c",
                  backgroundImage: "linear-gradient(135deg, #ff416c, #ff4b2b)",
                  borderRadius: "20px",
                  px: 3,
                  fontWeight: "bold",
                  boxShadow: "0 4px 12px rgba(255, 65, 108, 0.4)",
                  "&:hover": {
                    backgroundImage: "linear-gradient(135deg, #ff4b2b, #ff416c)",
                    boxShadow: "0 6px 20px rgba(255, 75, 43, 0.5)",
                  },
                }}
              >
          Create Post
        </Button>
      </Box>
    </Box>
  );
};
