import { useState } from "react";

export const useMockData = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Welcome to the Community",
      content: "Feel free to share your thoughts here!",
      comments: [
        {
          id: 1, text: "Great initiative! (Parent Comment 1)", children: [ { id: 2, text: "I agree!", children: [{ id: 6, text: "Reply to Reply...!", children: [] }] } ], },
        { id: 3, text: "Looking forward to participating.  (Parent Comment 2)", children: [], },
      ],
    },
    {
      id: 2,
      title: "Community Post 2",
      content: "Feel free to share your thoughts here!",
      comments: [
        {
          id: 4, text: "Great initiative! (Parent Comment 1)",
          children: [ { id: 5, text: "I agreed!", children: [] }, ],
        },
      ],
    },
  ]);
  // Add a new post
  const addPost = (title: string, content: string) => {
    const newPost = { id: Date.now(), title, content, comments: [] };
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };
  // Add a comment to a post
  const addComment = (postId: number, text: string) => {
    const newComment = { id: Date.now(), text, children: [] };
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };
  // Add a reply to a reply (nested replies)
  const addReplyToReply = (postId: number, commentPath: number[], text: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
  
    let target = post.comments;  // Start at the top-level comments
  
    // Traverse the path to find the correct comment to reply to
    for (let i = 1; i < commentPath.length; i++) {
      let found = target.find(c => c.id === commentPath[i]);
      if (!found) return;
      target = found.children;  // Move deeper
    }
  
    // Add new reply
    target.push({ id: Date.now(), text, children: [] });
  };
  // const addReplyToReply = (postId: number, commentId: number, replyId: number, text: string) => {
    
  //   console.log(' ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ '); 
  //   console.log(' postId ', postId, ' commentId ', commentId, ' replyId ', replyId, ' text ', text); 


  //   const newReply = { id: Date.now(), text, children: [] };
  //   setPosts((prevPosts) =>
  //     prevPosts.map((post) => {
  //       if (post.id === postId) {
  //         return {
  //           ...post,
  //           comments: post.comments.map((comment) => {
  //             if (comment.id === commentId) {
  //               return {
  //                 ...comment,
  //                 children: comment.children.map((reply) => {
  //                   if (reply.id === replyId) {
  //                     return {
  //                       ...reply,
  //                       children: [...reply.children, newReply], // Add new reply to the current reply's children
  //                     };
  //                   }
  //                   return reply; // Return other replies unchanged
  //                 }),
  //               };
  //             }
  //             return comment; // Return other comments unchanged
  //           }),
  //         };
  //       }
  //       return post; // Return other posts unchanged
  //     })
  //   );
  // };
  return { posts, addPost, addComment, addReplyToReply };
};
