import { useEffect, useState } from "react";
import {
  LikedPropertiesPageHeaderStyled,
  LikedPropertiesPageStyled,
  LikedPropertiesWrapperStyled,
} from "./likedproperties.styles";
import { useNavigate } from "react-router-dom";
import { Footer, Header, Property } from "../../components";
import { NoDataFound } from "../../components/nodatafound";
import { NoDataFoundImgWrapperStyled } from "../../app.styles";
import { PageLoader } from "../../components/pageloader";

const LikedProperties = () => {
  const [listings, setListings] = useState([]);
  const [spinning, setSpinning] = useState(true);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const getUserLikedListings = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/likedlisting/get-user-liked-listings`,
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
        const allLiked = listings.map((listing) => {
          return {
            ...listing,
            isLiked: true,
          };
        });
        setListings(allLiked);
      } else if (error) {
        const details = error?.details[0].message;
      }
    } catch (err) {
      console.log("catch error", err);
    } finally {
      setSpinning(false);
    }
  };

  useEffect(() => {
    getUserLikedListings();
  }, []);

  const isLikedPropertiesExists = listings?.length > 0;

  return (
    <LikedPropertiesPageStyled>
      <Header />
      <PageLoader spinning={spinning} />

      <LikedPropertiesPageHeaderStyled>
        Liked Properties
      </LikedPropertiesPageHeaderStyled>
      <LikedPropertiesWrapperStyled>
        {isLikedPropertiesExists ? (
          listings?.map((card) => {
            return (
              <Property
                key={card?._id}
                card={card}
                width="300px"
                propsOnLikeOrDislike={getUserLikedListings}
              />
            );
          })
        ) : (
          <NoDataFoundImgWrapperStyled>
            <NoDataFound />
          </NoDataFoundImgWrapperStyled>
        )}
      </LikedPropertiesWrapperStyled>
      <Footer />
    </LikedPropertiesPageStyled>
  );
};

export default LikedProperties;
