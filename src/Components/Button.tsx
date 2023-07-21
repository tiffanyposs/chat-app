import { colors } from "./constants";

interface ButtonProps {
  children: string | JSX.Element;
  backgroundColor?: string;
  color?: string;
}

function Button({ 
  backgroundColor = colors.pink, 
  color = colors.black, 
  children 
}: ButtonProps) {
  return (
    <button style={{ 
      backgroundColor, 
      color, 
      outline: 'none', 
      border: `1px solid ${colors.black}` ,
      padding: '5px 10px',
      fontSize: '1em',
    }}>
      {children}
    </button>
  )
}

export default Button;