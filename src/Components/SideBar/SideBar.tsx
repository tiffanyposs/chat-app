import { colors } from "../constants";

interface SideBarProps {
  children: string | JSX.Element | JSX.Element[],
}

function SideBar({ children }: SideBarProps) {
  return (
    <div style={{ 
      padding: '20px', 
      borderLeft: `1px solid ${colors.black}`, 
      height: '100%',
      overflow: 'hidden',
      minWidth: '300px',
      maxWidth: '400px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {children}
    </div>
  )
}

export default SideBar;