import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: var(--background-navbar-color);
  --background-navbar-color
`;

export const Wrapper = styled.div`
  width: 100%;

  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.2rem;
  font-family: sans-serif;

  p {
    &:nth-child(2) {
      padding-right: 10px;
      color: #fff;
    }

    &:nth-child(3) {
      font-size: 1.5rem;
      font-weight: 500;
      color: #e07924;
    }
  }

  svg {
    fill: #e07924;
    margin-right: 0.8rem;
    margin-left: 0.6rem;
  }
`;

export const Menu = styled.ul`
  height: 100%;
  display: flex;
  justify-content: space-between;
  list-style: none;

  @media screen and (max-width: 960px) {
    background-color: var(--background-navbar-color);
    position: absolute;
    top: 70px;
    right: ${({ open }) => (open ? '0' : '-100%')}; //Import
    /* Establece un valor inicial para open */
    opacity: ${({ open }) => (open ? '1' : '0')};
    width: 60%;
    height: 50vh;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    transition: 0.5s all ease;
  }
`;

export const MenuItem = styled.li`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 0.6rem;

  @media screen and (max-width: 960px) {
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const MenuItemLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0.5rem 2.5rem;

  font-family: sans-serif;
  font-size: 1rem;
  font-weight: 300;
  cursor: pointer;
  transition: 0.5s all ease;

  &:hover {
    color: var(--font-hover-color);
    background-color: var(--background-hover-color);
    transition: 0.5s all ease;

    div {
      svg {
        fill: #23394d;
      }
    }
  }

  div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      display: none;
      fill: var(--background-iconFa-color);
      margin-right: 0.5rem;
    }
  }

  @media screen and (max-width: 960px) {
    width: 100%;

    div {
      width: 30%;
      justify-content: left;

      svg {
        display: flex;
      }
    }
  }

  @media screen and (max-width: 880px) {
    div {
      width: 40%;
      justify-content: left;

      svg {
        display: flex;
      }
    }
  }

  @media screen and (max-width: 500px) {
    div {
      width: 60%;
      justify-content: left;

      svg {
        display: flex;
      }
    }
  }

  @media screen and (max-width: 260px) {
    div {
      width: 100%;
      justify-content: left;

      svg {
        display: flex;
      }
    }
  }
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 960px) {
    display: flex;
    align-items: center;
    cursor: pointer;

    svg {
      fill: var(--background-menu-movil-color);
      margin-right: 0.5rem;
    }
  }
`;
