import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  position: relative;
`;

export const MobileIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    fill: var(--background-iconFa-options-color);
    margin-right: 0.5rem;
    
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--background-navbar-color);
  width: 200px;
  display: ${({ open }) => (open ? 'block' : 'none')};
  z-index: 1000;
`;

export const MenuItem = styled(NavLink)`
  display: flex;
  flex-direction: column
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  font-family: sans-serif;
  font-size: 1rem;
  font-weight: 300;
  cursor: pointer;
  transition: 0.5s all ease;
    svg {
      fill: var(--background-iconFa-color);
      margin-right: 0.5rem;
    }

  &:hover {
    color: var(--font-hover-color);
    background-color: var(--background-hover-color);
    transition: 0.5s all ease;
      svg {
        fill: var(--secondary-color);
      }
    
  }
`;
