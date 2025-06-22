import {
  balconySvg,
  diningRoomSvg,
  dirtyKitchnSvg,
  drawingRoomSvg,
  electricitySvg,
  gasSvg,
  hospitalSvg,
  internetSvg,
  laundryRoomSvg,
  lawnSvg,
  mosqueSvg,
  restaurantSvg,
  schoolSvg,
  servantQuaterSvg,
  sewerageSvg,
  storeRoomSvg,
  tvLoungeSvg,
  waterSupplySvg,
} from "../../svgs";

export const getFeatureIcon = (id) => {
  switch (id) {
    case "SEW":
      return sewerageSvg;
    case "ELE":
      return electricitySvg;
    case "WAT":
      return waterSupplySvg;
    case "GAS":
      return gasSvg;
    case "INT":
      return internetSvg;
    case "HOS":
      return hospitalSvg;
    case "SCH":
      return schoolSvg;
    case "MOS":
      return mosqueSvg;
    case "RES":
      return restaurantSvg;
    case "TVL":
      return tvLoungeSvg;
    case "STR":
      return storeRoomSvg;
    case "LDR":
      return laundryRoomSvg;
    case "DIN":
      return diningRoomSvg;
    case "DRW":
      return drawingRoomSvg;
    case "DTK":
      return dirtyKitchnSvg;
    case "LWN":
      return lawnSvg;

    default:
      break;
  }
};
