interface MainLayoutProps {
  children: string | JSX.Element | JSX.Element[];
}
function MainLayout({ children }: MainLayoutProps) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      flexGrow: '1' 
    }}>
      {children}
    </div>
  )
}

export default MainLayout;