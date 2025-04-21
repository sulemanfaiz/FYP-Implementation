import { useState } from "react";
import { useEffect } from "react";

const Listing = () => {
  const token = localStorage.getItem("token");

  const [userListings, setUserListings] = useState([]);

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
        console.log("listings", result.listings);

        setUserListings(result.listings);
      } else if (error) {
        const details = error?.details[0].message;
      }
    } catch (err) {
      console.log("catch error", err);
    }
  };

  useEffect(() => {
    getUserListings();
  }, []);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  return (
    <>
      Listing Page
      {userListings.map((listing) => {
        return (
          <>
            <p>Name: {listing.title}</p>
            <p>Desc: {listing.desc}</p>
            <p>City: {listing.city}</p>
            <p>Images</p>
            {listing?.fileNames?.map((path, index) => {
              return (
                <img
                  src={`${API_URL}/uploads/${path}`}
                  alt={`property-image-${index}`}
                />
              );
            })}
          </>
        );
      })}
    </>
  );
};

export default Listing;
