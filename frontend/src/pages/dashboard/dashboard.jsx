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

const { Column } = Table;

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
        <TabsAndGridWrapperStyled>
          <div className="heading">Your Listings</div>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </TabsAndGridWrapperStyled>
      </DashboardContentWrapperStyled>
    </DashboardWrapperStyled>
  );
};

export default Dashboard;
