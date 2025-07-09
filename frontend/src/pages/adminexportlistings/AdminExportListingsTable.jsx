import React, { useState, useEffect } from "react";
import { Table, Spin, message } from "antd";
import { AddPropertyButtonStyled } from "../reviewlistings/reviewlistings.styles";
import * as XLSX from "xlsx";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const columns = [
  {
    title: "Listing Name",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Owner Name",
    dataIndex: "ownerName",
    key: "ownerName",
    render: (text, record) => text || record.ownerName || "-",
  },
  {
    title: "Owner Number",
    dataIndex: "ownerNumber",
    key: "ownerNumber",
    render: (text, record) => text || record.ownerNumber || "-",
  },
  {
    title: "Owner Email",
    dataIndex: "ownerEmail",
    key: "ownerEmail",
    render: (text, record) => text || record.ownerEmail || "-",
  },
  {
    title: "Price",
    dataIndex: "rent",
    key: "rent",
    render: (text, record) => text || record.price || "-",
  },
];

const AdminExportListingsTable = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/get-review-listings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await response.json();
        if (result.success) {
          setListings(result.listings || []);
        } else {
          setError(result.message || "Failed to fetch listings");
        }
      } catch (err) {
        setError("Error fetching listings");
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const handleExport = () => {
    if (!listings.length) {
      message.error("No data to export");
      return;
    }
    // Prepare data for Excel (row-wise)
    const exportData = listings.map(listing => ({
      "Listing Name": listing.title || "-",
      "Owner Name": listing.ownerName || "-",
      "Owner Number": listing.ownerNumber || "-",
      "Owner Email": listing.ownerEmail || "-",
      "Price": listing.rent || listing.price || "-",
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Listings");
    XLSX.writeFile(wb, "All_Listings_Table_Format.xlsx");
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Admin: All Listings (Table View)</h2>
      <AddPropertyButtonStyled onClick={handleExport} style={{ marginBottom: 25, marginTop: 24, position:"absolute",top:24,left:10 }}>
        Export All Listings to Excel
      </AddPropertyButtonStyled>
      {loading ? (
        <Spin />
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <Table
          dataSource={listings}
          columns={columns}
          rowKey={record => record._id || record.title + record.ownerName}
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default AdminExportListingsTable;
