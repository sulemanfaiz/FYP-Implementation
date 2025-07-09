import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  message,
  Spin,
  Button,
  Input,
  Select,
  Statistic,
  Row,
  Col,
  Card,
} from "antd";
import dayjs from "dayjs";
import { Header } from "../../components";
import styled from "styled-components";
import { saveAs } from "file-saver";

const AuditPageWrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  .ant-table-cell {
    white-space: nowrap;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

// Helper to convert transactions to CSV
const transactionsToCSV = (transactions) => {
  if (!transactions.length) return "";
  const header = [
    "Date",
    "Property Title",
    "Renter",
    "Landlord",
    "Total Rent Paid",
    "Commission Earned",
    "Status",
    "Stripe Payment ID",
  ];
  const rows = transactions.map((tx) => [
    dayjs(tx.createdAt).format("YYYY-MM-DD HH:mm"),
    tx.property?.title || "N/A",
    tx.renter?.name || "N/A",
    tx.landlord?.name || "N/A",
    `$${tx.totalAmount.toFixed(2)}`,
    `$${tx.commissionAmount.toFixed(2)}`,
    tx.status,
    tx.paymentIntentId || "",
  ]);
  return [header, ...rows].map((row) => row.join(",")).join("\n");
};

const AuditPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userFilter, setUserFilter] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [uniqueUsers, setUniqueUsers] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL || "";

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`${API_URL}/api/transactions/admin/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch transactions.");
        }

        const data = await res.json();
        setTransactions(data);
        setFilteredTransactions(data);
        // Collect unique users (renter and landlord)
        const users = [];
        data.forEach((tx) => {
          if (tx.renter && tx.renter._id)
            users.push({
              _id: tx.renter._id,
              name: tx.renter.name,
              email: tx.renter.email,
            });
          if (tx.landlord && tx.landlord._id)
            users.push({
              _id: tx.landlord._id,
              name: tx.landlord.name,
              email: tx.landlord.email,
            });
        });
        // Remove duplicates
        const unique = Array.from(
          new Map(users.map((u) => [u._id, u])).values()
        );
        setUniqueUsers(unique);
      } catch (error) {
        message.error(
          error.message || "An error occurred while fetching data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [API_URL]);

  // Filter transactions by user
  useEffect(() => {
    if (!userFilter) {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(
        transactions.filter(
          (tx) =>
            tx.renter?._id === userFilter || tx.landlord?._id === userFilter
        )
      );
    }
  }, [userFilter, transactions]);

  const handleExportCSV = () => {
    const csv = transactionsToCSV(filteredTransactions);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `transactions_audit_${dayjs().format("YYYYMMDD_HHmmss")}.csv`);
  };

  // Calculate total commission
  const totalCommission = filteredTransactions.reduce(
    (sum, tx) => sum + (tx.commissionAmount || 0),
    0
  );
  const totalRevenue = filteredTransactions.reduce(
    (sum, tx) => sum + (tx.totalAmount || 0),
    0
  );
  const totalTransactions = filteredTransactions.length;

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm"),
      sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
      defaultSortOrder: "descend",
    },
    {
      title: "Property Title",
      dataIndex: "property",
      key: "property",
      render: (property) => property?.title || "N/A",
    },
    {
      title: "Renter",
      dataIndex: "renter",
      key: "renter",
      render: (renter) => renter?.name || "N/A",
    },
    {
      title: "Landlord",
      dataIndex: "landlord",
      key: "landlord",
      render: (landlord) => landlord?.name || "N/A",
    },
    {
      title: "Total Rent Paid",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => `$${amount.toFixed(2)}`,
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: "Commission Earned",
      dataIndex: "commissionAmount",
      key: "commissionAmount",
      render: (amount) => `$${amount.toFixed(2)}`,
      sorter: (a, b) => a.commissionAmount - b.commissionAmount,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "succeeded" ? "green" : "volcano"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Stripe Payment ID",
      dataIndex: "paymentIntentId",
      key: "paymentIntentId",
      render: (id) => id || "N/A",
      ellipsis: true,
      width: 180,
    },
  ];

  return (
    <>
      <Header />
      <AuditPageWrapper>
        <Title>Transaction Audit</Title>
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={8}>
            <Statistic title="Total Transactions" value={totalTransactions} />
          </Col>
          <Col span={8}>
            <Statistic
              title="Total Revenue"
              value={`$${totalRevenue.toFixed(2)}`}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Total Commission"
              value={`$${totalCommission.toFixed(2)}`}
            />
          </Col>
        </Row>
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Select
              showSearch
              allowClear
              style={{ width: 300 }}
              placeholder="Filter by user (renter or landlord)"
              optionFilterProp="children"
              value={userFilter || undefined}
              onChange={setUserFilter}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {uniqueUsers.map((user) => (
                <Select.Option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </Select.Option>
              ))}
            </Select>
          </div>
          <Button onClick={handleExportCSV} type="primary">
            Export to CSV
          </Button>
        </div>
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={filteredTransactions}
            rowKey="_id"
            scroll={{ x: "max-content" }}
            pagination={{ pageSize: 10 }}
            summary={(pageData) => (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={5} align="right">
                  <b>Total Commission:</b>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} colSpan={2} align="left">
                  <b>${totalCommission.toFixed(2)}</b>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} colSpan={1} />
              </Table.Summary.Row>
            )}
          />
        </Spin>
      </AuditPageWrapper>
    </>
  );
};

export default AuditPage;
