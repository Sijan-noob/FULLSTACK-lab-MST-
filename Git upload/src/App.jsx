import React, { useState } from "react";
import "./App.css";

function App() {
  const [post, setPost] = useState("");
  const [platform, setPlatform] = useState("Twitter");
  const [posts, setPosts] = useState([]);

  const limit = platform === "Twitter" ? 280 : 3000;

  const isExceeded = post.length > limit;
  const isEmpty = post.trim().length === 0;

  // Post the content
  const handlePost = () => {
    if (isEmpty || isExceeded) {
      return;
    }

    const newPost = {
      id: Date.now(),
      text: post,
      platform: platform,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setPosts([newPost, ...posts]);
    setPost("");
  };

  // Enter = Post
  // Shift + Enter = New Line
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePost();
    }
  };

  // Delete a post
  const deletePost = (id) => {
    setPosts(posts.filter((item) => item.id !== id));
  };

  return (
    <div className="app">

      {/* Background decoration */}
      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      <div className="main-container">

        {/* Header */}
        <header className="top-header">
          <div>
            <div className="logo">
              <span className="logo-icon">✦</span>
              PostFlow
            </div>

            <p className="tagline">
              Create. Share. Connect.
            </p>
          </div>

          <div className="online">
            <span></span>
            Online
          </div>
        </header>

        {/* Composer */}
        <section className="composer-card">

          <div className="composer-title">
            <div>
              <h1>Create a Post</h1>
              <p>Share your thoughts with your audience.</p>
            </div>

            <div className="avatar">
              S
            </div>
          </div>

          {/* Platform Selection */}
          <div className="platform-area">

            <p className="section-label">
              Select Platform
            </p>

            <div className="platforms">

              <button
                className={
                  platform === "Twitter"
                    ? "platform-btn twitter active"
                    : "platform-btn twitter"
                }
                onClick={() => setPlatform("Twitter")}
              >
                <span className="platform-icon">𝕏</span>

                <span>
                  <strong>Twitter</strong>
                  <small>280 characters</small>
                </span>

                {platform === "Twitter" && (
                  <span className="check">✓</span>
                )}
              </button>

              <button
                className={
                  platform === "LinkedIn"
                    ? "platform-btn linkedin active"
                    : "platform-btn linkedin"
                }
                onClick={() => setPlatform("LinkedIn")}
              >
                <span className="platform-icon linkedin-icon">
                  in
                </span>

                <span>
                  <strong>LinkedIn</strong>
                  <small>3000 characters</small>
                </span>

                {platform === "LinkedIn" && (
                  <span className="check">✓</span>
                )}
              </button>

            </div>
          </div>

          {/* Text Area */}
          <div
            className={
              isExceeded
                ? "editor error-editor"
                : "editor"
            }
          >

            <textarea
              value={post}
              onChange={(e) => setPost(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What's on your mind?"
              rows="7"
            />

            <div className="editor-bottom">

              <span className="hint">
                Press <b>Enter</b> to post ·{" "}
                <b>Shift + Enter</b> for a new line
              </span>

              <span
                className={
                  isExceeded
                    ? "counter danger"
                    : post.length > limit * 0.9
                    ? "counter warning"
                    : "counter"
                }
              >
                {post.length} / {limit}
              </span>

            </div>
          </div>

          {/* Error */}
          {isExceeded && (
            <div className="error-message">
              <span>⚠</span>
              <div>
                <strong>Character limit exceeded</strong>
                <p>
                  Remove {post.length - limit} characters to post.
                </p>
              </div>
            </div>
          )}

          {/* Bottom controls */}
          <div className="composer-footer">

            <div className="limit-display">
              <span className="limit-circle">
                {Math.max(0, limit - post.length)}
              </span>

              <div>
                <strong>Characters left</strong>
                <small>
                  {platform} limit: {limit}
                </small>
              </div>
            </div>

            <button
              className="post-button"
              onClick={handlePost}
              disabled={isEmpty || isExceeded}
            >
              <span>🚀</span>
              Post
            </button>

          </div>

        </section>

        {/* Posts */}
        <section className="posts-section">

          <div className="posts-heading">
            <div>
              <h2>Your Posts</h2>
              <p>
                {posts.length === 0
                  ? "Your published posts will appear here."
                  : `${posts.length} ${
                      posts.length === 1 ? "post" : "posts"
                    } published`}
              </p>
            </div>

            {posts.length > 0 && (
              <span className="post-count">
                {posts.length}
              </span>
            )}
          </div>

          {posts.length === 0 ? (

            <div className="empty-state">
              <div className="empty-icon">
                ✨
              </div>

              <h3>No posts yet</h3>

              <p>
                Write something above and hit the Post button
                to see it here.
              </p>
            </div>

          ) : (

            <div className="posts-list">

              {posts.map((item) => (

                <article className="post-card" key={item.id}>

                  <div className="post-top">

                    <div className="user-info">

                      <div className="mini-avatar">
                        S
                      </div>

                      <div>
                        <strong>Srijan</strong>

                        <span>
                          @{item.platform.toLowerCase()} ·{" "}
                          {item.time}
                        </span>
                      </div>

                    </div>

                    <div
                      className={
                        item.platform === "Twitter"
                          ? "post-platform twitter-label"
                          : "post-platform linkedin-label"
                      }
                    >
                      {item.platform === "Twitter"
                        ? "𝕏 Twitter"
                        : "in LinkedIn"}
                    </div>

                  </div>

                  <div className="post-content">
                    {item.text}
                  </div>

                  <div className="post-actions">

                    <span>
                      ♥ Like
                    </span>

                    <span>
                      💬 Comment
                    </span>

                    <span>
                      ↗ Share
                    </span>

                    <button
                      onClick={() => deletePost(item.id)}
                    >
                      🗑 Delete
                    </button>

                  </div>

                </article>

              ))}

            </div>

          )}

        </section>

        {/* Footer */}
        <footer>
          <span>PostFlow</span>
          <span>React Post Composer</span>
        </footer>

      </div>
    </div>
  );
}

export default App;