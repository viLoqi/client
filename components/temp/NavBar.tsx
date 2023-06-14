import useIcon from '@/hooks/useIcon';

const NavBar = () => {
  const compassIcon = useIcon('compass');
  const bellIcon = useIcon('bell');
  const searchIcon = useIcon('search');
  const faqIcon = useIcon('faq');
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            {compassIcon}
          </label>
          <div className="divider m-0"></div>
        </div>
      </div>
      <div className="navbar-center"></div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">{searchIcon}</button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            {bellIcon}
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <button className="btn btn-ghost btn-circle">{faqIcon}</button>
      </div>
    </div>
  );
};

export default NavBar;
