/** @jsxImportSource @emotion/react */
import Circle from './Circle';
import { css } from '@emotion/react';
import { colors } from './constants';

const navStyles = css({ 
  width: '100%', 
  // height: '40px',
  height: '10vh',
  backgroundColor: colors.pink,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '10px',
  borderBottom: `1px solid ${colors.black}`
});

function NavBar() {
  return (
    <nav css={navStyles}>
      <Circle size="50px" style={{ backgroundColor: colors.blue }}/>
      <Circle size="50px" style={{ marginLeft: '-20px', backgroundColor: colors.yellow }}/>
    </nav>
  )
}

export default NavBar;