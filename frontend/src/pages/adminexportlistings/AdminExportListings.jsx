import React, { useState, useEffect } from "react";
import { Button, Spin, Modal } from "antd";
import * as XLSX from "xlsx";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const AdminExportListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);

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

  // Helper to format listings for Excel export (vertical format)
  const formatListingsForExcel = () => {
    let rows = [];
    listings.forEach((listing, idx) => {
      rows.push([`${idx + 1}`]);
      rows.push([`Listing Name: ${listing.title || "-"}`]);
      rows.push([`Owner Name: ${listing.ownerName || listing.owner || "-"}`]);
      rows.push([`Owner Number: ${listing.ownerPhone || listing.ownerNumber || "-"}`]);
      rows.push([`Owner Email: ${listing.ownerEmail || listing.email || "-"}`]);
      rows.push([`Price: ${listing.rent || listing.price || "-"}`]);
      rows.push([""]); // Empty row for separation
    });
    return rows;
  };

  const handleExport = () => {
    const data = formatListingsForExcel();
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Listings");
    XLSX.writeFile(wb, "All_Listings_Vertical_Format.xlsx");
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Admin: Export All Listings</h2>
      {loading ? (
        <Spin />
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <>
          <Button type="primary" onClick={handleExport} style={{ marginBottom: 16 }}>
            Export All Listings to Excel
          </Button>
          <Button onClick={() => setPreviewVisible(true)} style={{ marginLeft: 8 }}>
            Preview Data
          </Button>
          <Modal
            visible={previewVisible}
            onCancel={() => setPreviewVisible(false)}
            footer={null}
            width={500}
            title="Listings Preview"
          >
            <div style={{ maxHeight: 400, overflowY: "auto" }}>
              {listings.map((listing, idx) => (
                <div key={listing._id || idx} style={{ marginBottom: 16, borderBottom: "1px solid #eee", paddingBottom: 8 }}>
                  <div><b>{idx + 1}</b></div>
                  <div>Listing Name: {listing.title || "-"}</div>
                  <div>Owner Name: {listing.ownerName || listing.owner || "-"}</div>
                  <div>Owner Number: {listing.ownerPhone || listing.ownerNumber || "-"}</div>
                  <div>Owner Email: {listing.ownerEmail || listing.email || "-"}</div>
                  <div>Price: {listing.rent || listing.price || "-"}</div>
                </div>
              ))}
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default AdminExportListings;
