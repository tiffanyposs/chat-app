import { CSSProperties } from "react";
import { colors } from "./constants";

interface ButtonProps {
  children: string | JSX.Element;
  backgroundColor?: string;
  color?: string;
  style?: CSSProperties;
}

function Button({ 
  backgroundColor = colors.pink, 
  color = colors.black,
  style = {},
  children 
}: ButtonProps) {
  return (
    <button style={{ 
      backgroundColor, 
      color, 
      outline: 'none', 
      border: `1px solid ${colors.black}` ,
      padding: '6px 10px',
      fontSize: '1em',
      cursor: 'pointer',
      ...style
    }}>
      {children}
    </button>
  )
}

export default Button;