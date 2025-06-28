import {
  balconySvg,
  basementSvg,
  cableTvSvg,
  cctvSvg,
  centralCoolingSvg,
  centralHeatingSvg,
  cornerPlotSvg,
  diningRoomSvg,
  dirtyKitchnSvg,
  drawingRoomSvg,
  electricitySvg,
  furnishedSvg,
  gasSvg,
  hospitalSvg,
  internetSvg,
  laundryRoomSvg,
  lawnSvg,
  maintenanceSvg,
  mosqueSvg,
  restaurantSvg,
  schoolSvg,
  semiFurnishedSvg,
  servantQuaterSvg,
  sewerageSvg,
  storeRoomSvg,
  swimmingPoolSvg,
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

    case "SVQ":
      return servantQuaterSvg;
    case "CAB":
      return cableTvSvg;
    case "MAI":
      return maintenanceSvg;
    case "CCT":
      return cctvSvg;
    case "SWP":
      return swimmingPoolSvg;
    case "CHT":
      return centralHeatingSvg;
    case "CCL":
      return centralCoolingSvg;

    case "BAL":
      return balconySvg;
    case "COR":
      return cornerPlotSvg;
    case "BSM":
      return basementSvg;

    case "FUR":
      return furnishedSvg;
    case "SMF":
      return semiFurnishedSvg;

    default:
      break;
  }
};
