import React, { useState, useEffect } from "react";
import "./AdminHome.css";
import { Button, Table, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import APIService from "../../utils/APIService";
import { extractDetails } from "../../utils/extractSubmittedList";

const AdminHome = () => {
  const [contentData, setContentData] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setLoading(true);
    APIService.getData("member", user.id)
      .then((res) => {
        console.log("User data received Successfully");
        setMsg("User data received Sucessfully");
        console.log(res.data);
        const formData = extractDetails(res.data);
        console.log("formData", formData);
        setContentData(formData);
      })
      .catch((error) => {
        setMsg("Internal server issue, hence try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleNewContentCreation = () => {
    navigate("/new-content");
  };

  const handleViewDetails = (details) => {
    navigate("/AR-content-details", {
      state: details,
    });
    // let tempDetails = {
    //   date: details["date"],
    //   title: details["title"],
    //   description: details["description"],
    //   pdfFileName: details["pdf_filename"],
    //   pdfSummary: details["pdfSummary"],
    //   modelFileName: details["model_filename"],
    //   targetImageFileName: details["target_image_filename"],
    // };
    // setNewContent(false);
    // setDetailsViewData(tempDetails);
    // setDetailsOpen(true);
  };

  const details =
    contentData?.[0] &&
    Object.keys(contentData[0]).filter(
      (key) =>
        ![
          "pdfSummary",
          "targetImage",
          "modelAddress",
          "customTemplate",
          "images",
          "videos",
          "orgTargetImage",
        ].includes(key)
    );

  const getTableHeaders = () => {
    if (contentData) {
      return details?.map((key, index) => (
        <th key={index + "_" + key}>{key.toUpperCase()}</th>
      ));
    }
    return null;
  };

  const getTableRows = () => {
    if (contentData) {
      return contentData.map((row, index) => (
        <tr
          key={index}
          onClick={() => handleViewDetails(row)}
          style={{ cursor: "pointer" }}
        >
          {details.map((value, index) => (
            <td key={index}>{row?.[value]}</td>
          ))}
        </tr>
      ));
    }
    return null;
  };

  return (
    <div className="admin_table_container">
      <div
        className="table-button"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h1>Added Content History</h1>
        <Button onClick={handleNewContentCreation} variant="info">
          Add New Content
        </Button>
      </div>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>{getTableHeaders()}</tr>
          </thead>
          <tbody>{getTableRows()}</tbody>
        </Table>
      )}
    </div>
  );
};

export default AdminHome;
