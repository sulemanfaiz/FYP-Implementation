import styled from "styled-components";

export const ListingWrapperStyled = styled.div`
  padding: 25px;
  font-family: Lato;

  .listing-title {
    font-family: Lato;
    font-size: 35px;
    color: rgb(51, 51, 51);
    text-transform: capitalize;
    font-weight: bolder;
    text-align: left;
    margin-bottom: 10px;
  }
`;

export const ListingDetailWrapperStyled = styled.div`
  background: rgb(244, 245, 247);
  padding: 25px;
  display: flex;
  flex-direction: column;
  row-gap: 18px;
`;

export const DetailCardStyled = styled.div`
  background: white;
  border-radius: 4px;
  padding: 25px;

  .name-price-wrapper {
    display: flex;
    justify-content: space-between;
    font-family: Lato;
    margin-bottom: 15px;

    .property-name {
      font-size: 20px;
      color: rgb(51, 51, 51);
    }

    .property-rent {
      display: flex;
      align-items: center;
      column-gap: 5px;
      .rent {
        font-size: 20px;
        color: rgb(51, 51, 51);
      }

      .month {
        font-size: 14px;
        color: rgb(105, 105, 105);
      }
    }
  }

  .decription {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    row-gap: 10px;

    .heading {
      font-size: 20px;
      color: rgb(51, 51, 51);
    }

    .text {
      font-size: 15px;
      color: rgb(105, 105, 105);
    }
  }
`;

export const CarasolWrapperStyled = styled.div`
  background: rgb(244, 245, 247);
  padding: 25px;

  .property-image {
    width: 100%;
    height: 75vh;
  }

  .slick-arrow {
    color: black;
  }
`;

export const DetailsCardStyled = styled.div`
  background: white;
  border-radius: 4px;
  padding: 25px;

  .heading {
    text-align: left;
    font-size: 20px;
    color: rgb(51, 51, 51);
    font-weight: bold;
    margin-bottom: 18px;
  }

  .overview-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    column-gap: 30px;
    margin-top: 15px;

    .row-item {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      padding: 15px 0;
      box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.07);
      height: 75px;

      :nth-child(2) {
        font-weight: bold;
      }
    }
  }
`;

export const AddressCardStyled = styled.div`
  background: white;
  border-radius: 4px;
  padding: 25px;

  .heading {
    text-align: left;
    font-size: 20px;
    color: rgb(51, 51, 51);
    font-weight: bold;
    margin-bottom: 18px;
  }

  .adress-row {
    display: grid;
    grid-template-columns: 150px 1fr;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 20px;

    .value {
      display: grid;
      align-items: flex-start;
      justify-content: flex-start;
    }

    .key {
      font-weight: bold;
    }
  }
`;
