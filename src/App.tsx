import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PostList } from "./components/PostList.tsx";
import { PostDetail } from "./components/PostDetail.tsx";
import { useMockData } from "./hooks/useMockData.ts";
import { Header } from "./components/masterComponant/Header.tsx";
import { Footer } from "./components/masterComponant/Footer.tsx";
import { Container, Box } from "@mui/material";

function App() {
  const { posts, addPost, addComment, addReplyToReply } = useMockData();
  return (
    <Router>
      <Box>
        <Header />
        <Container sx={{ py: 4 }}>
          <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={4} >
            <Box sx={{ flex: "1 1 80%" }}>
              <Routes>
                <Route path="/" element={<PostList posts={posts} addPost={addPost} />} />
                <Route path="/post/:postId" element={
                    <PostDetail posts={posts} addComment={addComment} addReplyToReply={addReplyToReply} />
                  }
                />
              </Routes>
            </Box>
          </Box>
        </Container>
        <Footer />
      </Box>
    </Router>
  );
}
export default App;
