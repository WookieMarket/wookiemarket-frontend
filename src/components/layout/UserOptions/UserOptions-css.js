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
    fill: #e07924;
    margin-right: 0.5rem;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #23394d;
  width: 200px;
  display: ${({ open }) => (open ? 'block' : 'none')};
`;

export const MenuItem = styled(NavLink)`
  display: flex;
  flex-direction: column
  padding: 0.5rem 1rem;
  color: #64b2ff;
  font-family: sans-serif;
  font-size: 1rem;
  font-weight: 300;
  cursor: pointer;
  transition: 0.5s all ease;

  &:hover {
    color: #fff;
    background-color: #e0792a;
    transition: 0.5s all ease;
  }
`;
