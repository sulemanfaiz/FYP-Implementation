import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageBanner from "../../components/pagebanner";
import Header from "../../components/header/header";
import { ReviewPropertyCard } from "../../components";
import { MyPopertyPageStyled, MyPopertyPageWrapperStyled, PropertyListingStyled } from "./AdminReviewProperty.styles";

const AdminReviewProperty = () => {
  const [property, setProperty] = useState({});
  const params = useParams();
  const propertyId = params.id;
  const token = localStorage.getItem("token");

  const getListingDetailBasedOnId = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/listing/get-listing-detail/${propertyId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        setProperty(result.data || {});
      } else {
        console.error("Error fetching property details:", result.message);
      }
    } catch (err) {
      console.error("Catch error:", err);
    }
  };

  useEffect(() => {
    getListingDetailBasedOnId();
  }, []);

  return (
    <MyPopertyPageStyled>
      <Header />
      <MyPopertyPageWrapperStyled>
        <PageBanner
          heading="Review Property"
          description={`Reviewing property: ${property?.title}`}
        />
        <PropertyListingStyled>
          <ReviewPropertyCard listing={property} />
        </PropertyListingStyled>
      </MyPopertyPageWrapperStyled>
    </MyPopertyPageStyled>
  );
};

export default AdminReviewProperty;
