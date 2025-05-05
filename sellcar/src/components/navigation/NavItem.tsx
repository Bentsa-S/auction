// components/NavItem.tsx
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss";

interface NavItemProps {
  to: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, label }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        {label}
      </NavLink>
    </li>
  );
};

export default NavItem;
