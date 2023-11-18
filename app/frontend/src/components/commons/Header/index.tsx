import { NavLink } from 'react-router-dom';

import logo from '@assets/icons/morak.svg';
import profile from '@assets/icons/profile.svg';

import { SIDE_MENU } from '@constants/index';

import * as styles from './index.css';

export function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <NavLink to="/" className={styles.title}>
          <img src={logo} alt="logo" className={styles.logo} />
          <div className={styles.logoTitle}>morak</div>
        </NavLink>
        <div className={styles.sideMenu}>
          {SIDE_MENU.map((menu: string) => (
            <NavLink
              key={menu}
              to={menu}
              className={({ isActive }) => (isActive ? styles.sideMenuButtonActive : styles.sideMenuButton)}
            >
              {menu}
            </NavLink>
          ))}
          <NavLink to="/profile">
            <img src={profile} alt="" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}