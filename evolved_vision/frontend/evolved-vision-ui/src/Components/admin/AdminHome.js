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
import data from "../../testData/data.json";
import NewContent from "./NewContent";

const AdminHome = () => {
  const [contentData, setContentData] = useState(data.data);
  const {
    isOpen: isNewContent,
    onOpen: onNewContentOpen,
    onClose: onNewContentClose,
  } = useDisclosure();

  useEffect(() => {
    // fetch details
  }, []);

  const getTableHeaders = () => {
    let tblHeader = <Th key={"headers-loading"}>LOADING...</Th>;
    if (contentData) {
      tblHeader = Object.keys(contentData[0]).map((key, index) => {
        if (["description", "pdfSummary"].includes(key)) return;
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
          <Tr key={index} style={{ cursor: "pointer" }}>
            {Object.values(row).map((value, index) => {
              if (![5, 6].includes(index)) return <Td key={index}>{value}</Td>;
            })}
          </Tr>
        );
      });
    }
    return tblRows;
  };

  return (
    <div className="admin_table_container">
      <div
        className="table-button"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Heading>Added Content History</Heading>
        <Button onClick={onNewContentOpen} colorScheme="teal">
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
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminHome;
