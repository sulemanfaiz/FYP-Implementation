import { ProfileNavbar } from "../../components";
import { Tabs, Table } from "antd";

import {
  CardStyled,
  CardWrapperStyled,
  DashboardContentWrapperStyled,
  DashboardWrapperStyled,
  TableActionsWrapperStyled,
  TabsAndGridWrapperStyled,
} from "./dashboardstyles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { propertyOptions } from "../addlisting/addlisting.config";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

const { Column } = Table;

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#845EC2",
  "#D65DB1",
  "#FF6F91",
  "#FF9671",
];

function getAverageRentByType(listings) {
  const typeMap = {};
  listings.forEach((l) => {
    if (!l.propertyType || !l.rent) return;
    if (!typeMap[l.propertyType])
      typeMap[l.propertyType] = { total: 0, count: 0 };
    typeMap[l.propertyType].total += Number(l.rent);
    typeMap[l.propertyType].count += 1;
  });
  return Object.entries(typeMap).map(([type, { total, count }]) => ({
    propertyType: propertyOptions.find((p) => p.value === type)?.label || type,
    avgRent: count ? total / count : 0,
  }));
}

function getListingsByCity(listings) {
  const cityMap = {};
  listings.forEach((l) => {
    if (!l.city) return;
    cityMap[l.city] = (cityMap[l.city] || 0) + 1;
  });
  return Object.entries(cityMap).map(([city, count]) => ({ city, count }));
}

function getRentTrend(listings) {
  // If listings have a createdAt or date field, group by month
  const monthMap = {};
  listings.forEach((l) => {
    if (!l.createdAt || !l.rent) return;
    const date = new Date(l.createdAt);
    const month = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    if (!monthMap[month]) monthMap[month] = { total: 0, count: 0 };
    monthMap[month].total += Number(l.rent);
    monthMap[month].count += 1;
  });
  return Object.entries(monthMap)
    .map(([month, { total, count }]) => ({
      month,
      avgRent: count ? total / count : 0,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

const Dashboard = () => {
  const [userListings, setUserListings] = useState([]);
  const [tab, setTab] = useState("1");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getUserListings = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/listing/get-listings",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Important
          },
        }
      );
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        const listings = result.listings || [];
        console.log("listings", listings);
        setUserListings(listings);
      } else if (error) {
        const details = error?.details[0].message;
      }
    } catch (err) {
      console.log("catch error", err);
    }
  };

  const allListings = userListings;

  const activeListings = userListings.filter(
    (listing) => listing?.status === "ACT"
  );

  const inActiveListings = userListings.filter(
    (listing) => listing?.status === "INA"
  );

  const isAllActiveTab = tab === "1";
  const isActiveTab = tab === "2";

  const userProperties = isAllActiveTab
    ? allListings
    : isActiveTab
    ? activeListings
    : inActiveListings;

  useEffect(() => {
    getUserListings();
  }, []);

  const onChange = (key) => {
    setTab(key);
  };

  const dataSource = userProperties?.map((listing, index) => {
    const propType = listing?.propertyType;
    const id = listing?._id;

    const propTypeText =
      propertyOptions?.find((property) => property.value === propType)?.label ||
      "";

    return {
      key: id,
      title: listing?.title,
      propertyType: propTypeText,
      city: listing?.city,
      areaSizeUnit: `${listing?.areaSizeUnit} ${listing?.areaSizeMetric}`,
      rent: listing?.rent,
      bedrooms: listing?.bedrooms,
      bathrooms: listing?.bathrooms,
    };
  });

  const onViewListing = (record) => {
    const id = record?.key;
    navigate("/listing/" + id);
  };

  const lisitngsTable = (
    <Table dataSource={dataSource}>
      <Column title="Title" dataIndex="title" key="title" />
      <Column
        title="Property Type"
        dataIndex="propertyType"
        key="propertyType"
      />
      <Column title="City" dataIndex="city" key="city" />
      <Column title="Area Size" dataIndex="areaSizeUnit" key="areaSizeUnit" />
      <Column title="Monthly Rent" dataIndex="rent" key="rent" />
      <Column title="No. Of Bedrooms" dataIndex="bedrooms" key="bedrooms" />
      <Column title="No. Of Bathrooms" dataIndex="bathrooms" key="bathrooms" />

      <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <TableActionsWrapperStyled>
            <div onClick={() => onViewListing(record)}>View</div>
          </TableActionsWrapperStyled>
        )}
      />
    </Table>
  );
  const items = [
    {
      key: "1",
      label: "All Listings",
      children: lisitngsTable,
    },
    {
      key: "2",
      label: "Active Listings",
      children: lisitngsTable,
    },
    {
      key: "3",
      label: "Inactive Listings",
      children: lisitngsTable,
    },
  ];

  const averageRentByType = getAverageRentByType(userListings);
  const listingsByCity = getListingsByCity(userListings);
  const rentTrend = getRentTrend(userListings);

  return (
    <DashboardWrapperStyled>
      <ProfileNavbar />
      <DashboardContentWrapperStyled>
        <CardWrapperStyled>
          <CardStyled>
            <div>Total Listings</div>
            <div className="count">{userListings?.length}</div>
          </CardStyled>
          <CardStyled>
            <div>Active Listings</div>
            <div className="count">{activeListings?.length}</div>
          </CardStyled>
          <CardStyled>
            <div>Active Listings</div>
            <div className="count">{activeListings?.length}</div>
          </CardStyled>
        </CardWrapperStyled>
        {/* Market Insights Section */}
        <div
          style={{
            margin: "32px 0",
            background: "#fff",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <h2 style={{ marginBottom: 24 }}>Market Insights</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 32,
              justifyContent: "space-between",
            }}
          >
            {/* Average Rent by Property Type */}
            <div style={{ flex: 1, minWidth: 320, height: 300 }}>
              <h4>Average Rent by Property Type</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={averageRentByType}>
                  <XAxis dataKey="propertyType" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avgRent" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Listings by City */}
            <div style={{ flex: 1, minWidth: 320, height: 300 }}>
              <h4>Distribution of Listings by City</h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={listingsByCity}
                    dataKey="count"
                    nameKey="city"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {listingsByCity.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Rent Trend Over Time */}
            {rentTrend.length > 0 && (
              <div style={{ flex: 1, minWidth: 320, height: 300 }}>
                <h4>Rent Trend Over Time</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={rentTrend}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="avgRent" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
        {/* End Market Insights Section */}
        <TabsAndGridWrapperStyled>
          <div className="heading">Your Listings</div>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </TabsAndGridWrapperStyled>
      </DashboardContentWrapperStyled>
    </DashboardWrapperStyled>
  );
};

export default Dashboard;
