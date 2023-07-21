/** @jsxImportSource @emotion/react */
import Circle from './Circle';
import { css } from '@emotion/react';
import { colors } from './constants';

const navStyles = css({ 
  width: '100%', 
  height: '40px', 
  backgroundColor: colors.pink,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '50px 20px',
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