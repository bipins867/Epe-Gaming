import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Table,
  Spinner,
} from "react-bootstrap";
import "./ImageSlider.css"; // Custom CSS for styling
import {
  addImagesHandler,
  deleteImageHandler,
  fetchImagesHandler,
  updateImageStatusHandler,
} from "../apiImageHandler";
import { useAlert } from "../../../../../../UI/Alert/AlertContext";

export const ImageSliderPage = () => {
  const [images, setImages] = useState([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isImagesLoading, setIsImageLoading] = useState(false);
  const [isInfoUpdated, setIsInfoUpdated] = useState(0);

  // Add these states for spinners
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { showAlert } = useAlert();

  const imageInputRef = useRef(null);

  const handleAddImage = () => {
    setShowAddForm(true);
  };

  const handleCancelAddImage = () => {
    setShowAddForm(false);
    setSelectedImage(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();

      formData.append("image", selectedImage);
      formData.append("title", "Image");
      formData.append("type", "*");

      const response = await addImagesHandler(
        formData,
        setIsUploading,
        showAlert
      );

      if (response) {
        setIsInfoUpdated(isInfoUpdated + 1);
        setSelectedImage(null);
        setShowAddForm(false);
      }
    }
  };

  useEffect(
    () => {
      const fetchImages = async () => {
        const response = await fetchImagesHandler(
          "*",
          null,
          null,
          setIsImageLoading,
          showAlert
        );

        if (response) {
          setImages(response.data);
        }
      };

      fetchImages();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isInfoUpdated]
  );

  const handleImageStatus = async (id, status) => {
    const response = await updateImageStatusHandler(
      id,
      status,
      setIsUpdating,
      showAlert
    ); // Replace with your actual API function
    if (response) {
      setIsInfoUpdated(isInfoUpdated + 1); // Update image list on success
    }
  };

  const deleteImage = async (id) => {
    const response = await deleteImageHandler(id, setIsDeleting, showAlert); // Replace with your actual API function
    if (response) {
      setIsInfoUpdated(isInfoUpdated + 1); // Update image list on success
    }
  };

  if (isImagesLoading) {
    return (
      <>
        <div className="loading-screen text-center">
          <Spinner animation="border" role="status" className="loading-spinner">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h4 className="loading-text">Fetching Images....</h4>
        </div>
      </>
    );
  }

  return (
    <Container className="image-slider-page mt-4">
      {/* Add Image Section */}
      <Row className="mb-4">
        <Col>
          {!showAddForm && (
            <Button
              variant="primary"
              onClick={handleAddImage}
              className="add-image-btn"
            >
              Add Image
            </Button>
          )}
          {showAddForm && (
            <Form className="add-image-form">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label className="form-label">Select an Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                  ref={imageInputRef}
                />
              </Form.Group>
              {selectedImage && (
                <div className="preview-image-container mb-3">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected Preview"
                    className="preview-image"
                  />
                </div>
              )}
              <Button
                variant="success"
                onClick={handleUpload}
                className="me-2"
                disabled={isUploading}
              >
                {isUploading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Upload"
                )}
              </Button>
              <Button variant="secondary" onClick={handleCancelAddImage}>
                Cancel
              </Button>
            </Form>
          )}
        </Col>
      </Row>

      {/* Image List Section */}
      <Row>
        <Col>
          <h3 className="image-list-title">Manage Slider Images</h3>
          <Table responsive className="image-list-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {images.map((img, index) => {
                const imageUrl =
                  process.env.REACT_APP_REMOTE_ADDRESS +
                  "/files/" +
                  img.imageUrl;

                return (
                  <tr key={img.id}>
                    <td>{index + 1}</td>
                    <td>
                      <Card.Img
                        src={imageUrl}
                        alt={`Image ${img.id}`}
                        className="list-image"
                      />
                    </td>
                    <td>
                      <span
                        className={`status-badge ${
                          img.isActive ? "active" : "inactive"
                        }`}
                      >
                        {img.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <Button
                        variant={img.isActive ? "warning" : "success"}
                        onClick={() => handleImageStatus(img.id, !img.isActive)}
                        className="me-2"
                        disabled={isUpdating} // Disable button while updating
                      >
                        {isUpdating ? (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : img.isActive ? (
                          "Deactivate"
                        ) : (
                          "Activate"
                        )}
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => deleteImage(img.id)}
                        disabled={isDeleting} // Disable button while deleting
                      >
                        {isDeleting ? (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          "Delete"
                        )}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
