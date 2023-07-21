/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { css } from '@emotion/react';
import { colors } from './constants';

const navStyles = css({ 
  width: '100%', 
  height: '40px', 
  backgroundColor: colors.pink,
  display: 'flex',
  justifyContent: 'flex-end'
});

const Circle = styled.div({
  width: '30px',
  height: '30px',
  border: `1px solid ${colors.black}`,
  borderRadius: '30px',
})

function NavBar() {
  return (
    <nav css={navStyles}>
      <Circle />
    </nav>
  )
}

export default NavBar;