import React, { useState } from 'react';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import AppStore from '../store/App-Store';
import { useNavigate } from 'react-router-dom';

const ViewPosts = () => {
  const { posts, deletePost } = AppStore();
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
 const navigate = useNavigate()
  const handleDeleteClick = (postId) => {
    setPostToDelete(postId); // Store the ID of the post to delete
    setShowModal(true); // Show confirmation modal
  };
  const handleUpdatePost = (postId) => {
    navigate(`/Dashboard/edit/${postId}`); // Navigate to the Edit Post route
  };

  const confirmDelete = () => {
    if (postToDelete) {
      deletePost(postToDelete); // Call the delete function from AppStore
    }
    setShowModal(false); // Close the modal
  };

  const cancelDelete = () => {
    setPostToDelete(null); // Clear selected post
    setShowModal(false); // Close the modal
  };

  return (
    <div className="table-container">
      <h2>View Posts</h2>
      <table className="styled-table">
        <thead>
          <tr>
            {/* <th>Title</th> */}
            <th>Content</th>
            <th>Tags</th>
            <th>Image</th>
            <th>Likes</th>
            <th>Created At</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              {/* <td>{post.title}</td> */}
              <td>{post.content}</td>
              <td>{post.tags.join(', ')}</td>
              <td>
                {post.images.length > 0 ? (
                  <img
                    src={post.images[0]?.url || 'placeholder-image-url.jpg'}
                    alt="Post"
                    className="post-image"
                  />
                ) : (
                  'No Image'
                )}
              </td>
              <td>{post.likes}</td>
              <td>{new Date(post.createdAt).toLocaleString()}</td>
              <td>{post.coment}</td>
              <td style={{ display: 'flex' }}>
                <button
                  onClick={() => handleDeleteClick(post._id)}
                  style={{
                    fontSize: '23px',
                    color: 'red',
                    border: 'none',
                    background: 'transparent',
                  }}
                >
                  <RiDeleteBin6Fill />
                </button>
                <button
                onClick={()=> handleUpdatePost(post._id)}
                  style={{
                    fontSize: '23px',
                    color: 'blue',
                    border: 'none',
                    background: 'transparent',
                  }}
                >
                  <FaRegEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for delete confirmation */}
      <Modal show={showModal} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this post? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewPosts;
