import styled from "@emotion/styled";
import { colors } from "../constants";

export const SideBarList = styled.ul({
  backgroundColor: colors.yellow,
  flexGrow: "1",
  border: `1px solid ${colors.black}`,
  overflow: "scroll",
});

export const SideBarListItem = styled.li({
  padding: "15px 5px",
  borderBottom: `1px solid ${colors.black}`,
});
