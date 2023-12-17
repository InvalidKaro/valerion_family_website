import logo from './images/valerion-logo.png';
import userLogo from './images/user.png';


const Header = () => {
    return (
    <header class="container header">
      <img src={logo} alt="logo" class="header__logo" />
      <nav>
        <ul class="header__menu">
          <li class="header__link"><a href="#">Our History</a></li>
          <li class="header__link"><a href="#">Family Tree</a></li>
          <li class="header__link"><a href="#">Supporters</a></li>
          <li class="header__link"><a href="#">Need Help?</a></li>
        </ul>
      </nav>
      <div class="header__rsection">
        <a href=""><button class="btn">BUY</button></a>
        <a href="#">
          <img
            src={userLogo}
            alt="userLogo"
            class="header__user__icon"
        /></a>
      </div>
    </header>
    );}

export default Header;