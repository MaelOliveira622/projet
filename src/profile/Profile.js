import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faBookmark, faHome, faUser, faCheck, faCalendarDay, faEdit, faSave, faSignOutAlt, faTrash, faBars, faCog } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import pp from '../images/pp.jpg';
import './Profile.css';

function Profile() {
  const { username } = useParams();
  const [commentText, setCommentText] = useState('');
  const [tweets, setTweets] = useState([]);
  const [role, setRole] = useState('Citoyen');
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Admin');
  const [usernameInput, setUsernameInput] = useState(username);
  const [bio, setBio] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et sapien eu nunc fringilla iaculis.');
  //const [location, setLocation] = useState('New York, USA');
  const [userProfile, setUserProfile] = useState({
    username,
    name,
    bio,
    profilePic: pp,
    joinDate: 'Rejoins en Avril 2024'
  });

  const handleLikeToggle = (tweetId) => {
    setUserProfile((prevUserProfile) => {
      const updatedTweets = prevUserProfile.tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return { ...tweet, isLiked: !tweet.isLiked };
        }
        return tweet;
      });
      return { ...prevUserProfile, tweets: updatedTweets };
    });
  };

  useEffect(() => {
    async function fetchFeed() {
      try {
        const response = await fetch('http://localhost:3000/feed', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch tweets');
        }
        const data = await response.json();
        // Récupérer les tweets
        const filteredTweets = data.posts.filter((post) => post.status === 'Actif');
        const tweetsWithUserInfo = await Promise.all(filteredTweets.map(async (tweet) => {
          const userResponse = await fetch(`http://localhost:3000/user/${tweet.utilisateur_id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!userResponse.ok) {
            throw new Error('Failed to fetch user data');
          }
          const userData = await userResponse.json();
          return {
            ...tweet,
            userFullName: `${userData.prenom} ${userData.nom}`,
            userUsername: `${userData.prenom}${userData.nom}`,
            userProfilePic: userData.profilePic,
            status: 'Actif', 
          };
        }));
        setTweets(tweetsWithUserInfo);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    }
  
    fetchFeed();
  }, []);
  const handleBookmarkToggle = (tweetId) => {
    setUserProfile((prevUserProfile) => {
      const updatedTweets = prevUserProfile.tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return { ...tweet, isBookmarked: !tweet.isBookmarked };
        }
        return tweet;
      });
      return { ...prevUserProfile, tweets: updatedTweets };
    });
  };

  const handleComment = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleCommentSubmit = (event, tweetId) => {
    event.preventDefault();
    const newComment = {
      content: commentText,
      user: {
        name: 'Anonymous',
        username: 'anonymous'
      }
    };
    setUserProfile((prevUserProfile) => {
      const updatedTweets = prevUserProfile.tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return { ...tweet, comments: [...tweet.comments, newComment] };
        }
        return tweet;
      });
      return { ...prevUserProfile, tweets: updatedTweets };
    });
    setCommentText('');
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    setUserProfile({
      ...userProfile,
      name,
      username: usernameInput,
      bio,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  const handleDeleteProfile = async () => {
    try {
      const response = await fetch(`http://localhost:3000/user/${4}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete profile');
      }
      localStorage.removeItem('token');
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const handleRoleChange = async (newRole) => {
    try {
      const response = await fetch(`http://localhost:3000/user/role/4`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newRole }), 
      });
      if (!response.ok) {
        throw new Error('Failed to update role');
      }
      setRole(newRole);
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };
  


  return (
    <div className="profile">
      <div className="sidebar">
        <div className="gear-icon"onClick={() => {
          const sidebar = document.querySelector('.sidebar');
          sidebar.classList.toggle('active');
        }}>
          <FontAwesomeIcon icon={faCog} />
        </div>
        <div className="search-user">
          <input type="text" placeholder="Rechercher un utilisateur" />
        </div>
        <div className="user-links">
            <Link to="/accueil">
              <FontAwesomeIcon icon={faHome} /> 
              Accueil
            </Link>
            <Link to={`/profile/${username}`}>
              <FontAwesomeIcon icon={faUser} /> 
              Mon Profil
            </Link>
            <Link to="/favoris">
              <FontAwesomeIcon icon={faBookmark} /> 
              Favoris
            </Link>
            <Link to="/jugement">
              <FontAwesomeIcon icon={faCheck} /> 
              Publication
            </Link>
          </div>
        <div className="filter-posts">
        </div>
        <div className="user-links deconnexion">
          <Link to="/" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> 
            Déconnexion
          </Link>
        </div>
      </div>

      <div className="profile-header">
        <div className="profile-header-left">
        </div>
        <div className="profile-header-right">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="profile-info">
              <h2>{isEditing ? <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> : userProfile.name}</h2>
              <p>@{userProfile.name}</p>
            </div>
            <div className='modification'>
               {isEditing ? (
                <div>
                  <button className="edit-profile-button" onClick={handleSaveProfile}>
                    <FontAwesomeIcon icon={faSave} /> Sauvegarder
                  </button>
                  <button className="delete-profile-button" onClick={handleDeleteProfile}>
                    <FontAwesomeIcon icon={faTrash} /> Supprimer
                  </button>
                </div>
              ) : (
                <div>
                  <button className="edit-profile-button" onClick={handleEditProfile}>
                    <FontAwesomeIcon icon={faEdit} /> Modifier
                  </button>
                  <button className="delete-profile-button" onClick={handleDeleteProfile}>
                    <FontAwesomeIcon icon={faTrash} /> Supprimer
                  </button>
                </div>
              )}
            </div>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic" className='delete-profile-button'>
                Choisir un rôle
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <ul style={{ listStyleType: 'none', padding: 0 }}> {/* Style pour supprimer les puces */}
                  <li onClick={() => handleRoleChange('Citoyen')}>Citoyen</li>
                  <li onClick={() => handleRoleChange('Mod_rateur')}>Modérateur</li>
                  <li onClick={() => handleRoleChange('Administrateur')}>Administrateur</li>
                  <li onClick={() => handleRoleChange('Super_administrateur')}>Super Administrateur</li>
                </ul>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {isEditing ? <textarea value={bio} onChange={(e) => setBio(e.target.value)} /> : <p className='bio'>{userProfile.bio}</p>}
          <div className="location-join-date">
            <p><FontAwesomeIcon icon={faCalendarDay}/> {userProfile.joinDate}</p>
          </div>
          <a href={userProfile.website} target="_blank" rel="noopener noreferrer">{userProfile.website}</a>
          <div className="profile-stats">
          </div>
          <div className="gear-icon"onClick={() => {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('active');
          }}>
            <FontAwesomeIcon icon={faCog} />
          </div>
        </div>
      </div>
      <div className="profile-tweets">
        {tweets.map((tweet) => (
          <div className="tweet" key={tweet.id}>
            <div className="tweet-header">
              <Link to={`/profile/${userProfile.username}`}>
              </Link>
              <div className="user-info">
                <h3>{userProfile.name}</h3>
                <p>@{userProfile.name}</p>
              </div>
            </div>
            <div className="tweet-content">
              <p>{tweet.contenu}</p>
            </div>
            <div className="tweet-footer">
              <div>
                <FontAwesomeIcon icon={faComment} onClick={handleComment}/>
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faBookmark}
                  style={{ color: tweet.isBookmarked ? 'black' : 'grey' }}
                  onClick={() => handleBookmarkToggle(tweet.id)}
                />
              </div>
              <div onClick={() => handleLikeToggle(tweet.id)}>
                <FontAwesomeIcon icon={faHeart} style={{ color: tweet.isLiked ? 'red' : 'black' }} />
              </div>
            </div>
            {showCommentInput && (
              <form onSubmit={(event) => handleCommentSubmit(event, tweet.id)}>
                <input
                  type="text"
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                  placeholder="Votre commentaire..."
                />
                <button type="submit">Commenter</button>
              </form>
            )}
           <div className="comments">
            {tweet.comments && tweet.comments.map((comment, index) => (
              <div className="comment" key={index}>
                <span>{comment.user.name}</span>: {comment.content}
              </div>
            ))}
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
