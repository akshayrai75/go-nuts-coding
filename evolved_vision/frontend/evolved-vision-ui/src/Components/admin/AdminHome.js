import React, { useState, useEffect } from "react";
import "./AdminHome.css";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Card,
  CardBody,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import data from "../../testData/data.json";
import NewContent from "./NewContent";
import DetailsForm from "./DetailsForm";
import { useNavigate } from "react-router-dom";
import APIService from "../../utils/APIService";
import { extractDetails } from "../../utils/extractSubmittedList";

const AdminHome = () => {
  const [contentData, setContentData] = useState(null);
  const [msg, setMsg] = useState("");

  const [detailsViewData, setDetailsViewData] = useState({
    date: "",
    title: "",
    description: "",
    pdfFileName: "",
    pdfSummary: "PDF Summary...",
    modelFileName: "",
    targetImageFileName: "",
  });
  const {
    isOpen: isNewContent,
    onOpen: onNewContentOpen,
    onClose: onNewContentClose,
  } = useDisclosure();
  const {
    isOpen: isDetailsOpen,
    onOpen: onDetailsOpen,
    onClose: onDetailsClose,
  } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    APIService.getData("member", user.id)
      .then((res) => {
        console.log("User data received Successfully");
        setMsg("User data received Sucessfully");
        console.log(res.data);
        const formData = extractDetails(res.data);
        setContentData(formData);
      })
      .catch((error) => {
        setMsg("Internal server issue, hence try again later.");
        toast.error("Internal server issue, try again later.");
      });
  }, []);

  const handleNewContentCreation = () => {
    navigate("/new-content");
  };

  const handleViewDetails = (details) => {
    let tempDetails = {
      date: details["date"],
      title: details["title"],
      description: details["description"],
      pdfFileName: details["pdf_filename"],
      pdfSummary: details["pdfSummary"],
      modelFileName: details["model_filename"],
      targetImageFileName: details["target_image_filename"],
    };
    onNewContentClose();
    setDetailsViewData(tempDetails);
    onDetailsOpen();
  };

  const details =
    contentData?.[0] &&
    Object.keys(contentData[0]).filter(
      (key) => !["pdfSummary", "targetImage", "modelAddress"].includes(key)
    );
  const getTableHeaders = () => {
    let tblHeader = <Th key={"headers-loading"}>LOADING...</Th>;
    if (contentData) {
      tblHeader = details?.map((key, index) => {
        return <Th key={index + "_" + key}>{key.toUpperCase()}</Th>;
      });
    }
    return tblHeader;
  };

  const getTableRows = () => {
    let tblRows = <Th key={"body-loading"}>LOADING...</Th>;
    if (contentData) {
      tblRows = contentData.map((row, index) => {
        return (
          <Tr
            key={index}
            onClick={(e) => handleViewDetails(row)}
            style={{ cursor: "pointer" }}
          >
            {details.map((value, index) => {
              return <Td key={index}>{row?.[value]}</Td>;
            })}
          </Tr>
        );
      });
    }
    return tblRows;
  };

  return (
    <div className="admin_table_container">
      <ToastContainer />
      <div
        className="table-button"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Heading>Added Content History</Heading>
        <Button onClick={handleNewContentCreation} colorScheme="teal">
          Add New Content
        </Button>
      </div>
      <Card variant={"elevated"}>
        <CardBody>
          <TableContainer>
            <Table variant="striped" size={"md"}>
              <Thead>
                <Tr>{getTableHeaders()}</Tr>
              </Thead>
              <Tbody>{getTableRows()}</Tbody>
            </Table>
          </TableContainer>
          <NewContent
            isNewContent={isNewContent}
            onNewContentClose={onNewContentClose}
          />
          <DetailsForm
            isDetailsOpen={isDetailsOpen}
            onDetailsOpen={onDetailsOpen}
            detailsViewData={detailsViewData}
            setDetailsViewData={setDetailsViewData}
            onDetailsClose={onDetailsClose}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminHome;
