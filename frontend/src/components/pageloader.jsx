import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { PageLoaderStyled } from "../app.styles";

export const PageLoader = (props) => {
  const { spinning } = props;
  return (
    <PageLoaderStyled>
      <Spin
        spinning={spinning}
        indicator={<LoadingOutlined spin style={{ fontSize: 55 }} />}
        size="large"
        fullscreen
      />
    </PageLoaderStyled>
  );
};
