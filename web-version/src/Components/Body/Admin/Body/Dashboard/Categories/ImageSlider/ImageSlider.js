import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Table,
} from "react-bootstrap";
import "./ImageSlider.css"; // Custom CSS for styling

export const ImageSliderPage = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      url: "/Assets/Dashboard/Category/BattleRoyal/BGMI/bgmi.jpg",
      active: true,
    },
    {
      id: 2,
      url: "/Assets/Dashboard/Category/BattleRoyal/FreeFire/freefire.jpg",
      active: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleAddImage = () => {
    setShowAddForm(true);
  };

  const handleCancelAddImage = () => {
    setShowAddForm(false);
    setSelectedImage(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      const newImage = {
        id: images.length + 1,
        url: selectedImage,
        active: false,
      };
      setImages([...images, newImage]);
      setShowAddForm(false);
      setSelectedImage(null);
    }
  };

  const toggleActivation = (id) => {
    setImages(
      images.map((img) =>
        img.id === id ? { ...img, active: !img.active } : img
      )
    );
  };

  const deleteImage = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

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
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
              {selectedImage && (
                <div className="preview-image-container mb-3">
                  <img
                    src={selectedImage}
                    alt="Selected Preview"
                    className="preview-image"
                  />
                </div>
              )}
              <Button variant="success" onClick={handleUpload} className="me-2">
                Upload
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
              {images.map((img, index) => (
                <tr key={img.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Card.Img
                      src={img.url}
                      alt={`Image ${img.id}`}
                      className="list-image"
                    />
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        img.active ? "active" : "inactive"
                      }`}
                    >
                      {img.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant={img.active ? "warning" : "success"}
                      onClick={() => toggleActivation(img.id)}
                      className="me-2"
                    >
                      {img.active ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteImage(img.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
