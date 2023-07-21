import styled from "@emotion/styled";
import { colors } from "./constants";

interface CircleProps {
  size?: string;
}

const Circle = styled.div(({ size = "30px" }: CircleProps) => ({
  width: size,
  height: size,
  border: `1px solid ${colors.black}`,
  borderRadius: size,
}));

export default Circle;
