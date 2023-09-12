import { Link } from 'react-router-dom';
import './ProfileCard.css';
import '../shared/Buttons/RoundButton.css';

function ProfileCard(props) {
  const {
    cardTitle,
    userImage,
    userImageAlt,
    username,
    userAdsLink,
    userAdsLinkText,
  } = props;
  return (
    <div className="card-container">
      <div className="card-body">
        <p className="card-title">{cardTitle}</p>
        <div className="card-image">
          <img src={userImage} alt={userImageAlt} />
        </div>
        <h2>{username}</h2>
        <Link to={userAdsLink}>
          <button className="round-button" type="button">
            {userAdsLinkText}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProfileCard;
