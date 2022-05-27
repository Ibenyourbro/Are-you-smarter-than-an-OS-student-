import React, { useState } from 'react';
import EditUsername from '../Components/EditUsername.jsx';
import EditImage from '../Components/EditImage.jsx';
import { Typography, Toolbar, Box } from '@mui/material';

// do axios request to patch a user when they click certain buttons
// send along whatever you need
// get user again to update info
// patch should always send an object where {thingtochange: changed info}
// seperate username and avatar to diffrent sides of screen
// make avatar clickable to then show a component that allows you to change your avatar
// add edit button to side of username, when clicked do show component

const UserProfile = ({ user, getUser, editable }) => {
  const [displayEditImage, setDisplayEditImage] = useState(false);

  return (
    <div
      className='userProfile'
      style={{ marginLeft: '20%', marginRight: '20%' }}
    >
      <div
        className='left'
        style={{
          width: '50%',
          float: 'left',
        }}
      >
        <Toolbar
          sx={{ marginLeft: '20%', marginTop: '8%', textAlign: 'center' }}
        >
          <Typography className='profileName' variant='h3'>
            {user ? user.username : 'Loading...'}
          </Typography>
          {editable && <EditUsername user={user} getUser={getUser} />}
        </Toolbar>
        <h1 className='profileAvatar'>
          {user ? (
            <div>
              {editable ? (
                <div
                  className='overlayBox'
                  onClick={() => {
                    // console.log('click');
                    setDisplayEditImage(!displayEditImage);
                  }}
                  style={{ marginLeft: '21%' }}
                >
                  <img src={user.imageUrl} className='image' />
                  <div className='overlay'>
                    <div className='overlayText'>Click to Change</div>
                  </div>
                </div>
              ) : (
                <div style={{ marginLeft: '21%' }}>
                  <img src={user.imageUrl} className='image' />
                </div>
              )}
              {displayEditImage && editable && (
                <EditImage
                  user={user}
                  getUser={getUser}
                  setDisplayEditImage={setDisplayEditImage}
                  displayEditImage={displayEditImage}
                />
              )}
            </div>
          ) : (
            'Loading...'
          )}
        </h1>
      </div>
      <div
        className='right'
        style={{
          width: '50%',
          float: 'right',
        }}
      >
        <h1 className='profileStats'>
          {user ? (
            <div>
              <h1 className='profileStats'>Stats</h1>
              Games Won: {user.wins}
              <br></br>
              Games Played : {user.totalGames} <br></br>
              Win Percentage :
              {Math.round((user.wins / user.totalGames) * 100) > 0
                ? ' ' + Math.round((user.wins / user.totalGames) * 100) + '%'
                : ' -'}
              <br></br>
              Question Correct : {user.qCorrect}
              <br></br>
              Question Attempted : {user.qAttempted}
              <br></br>
              Percent Correct :
              {Math.round((user.qCorrect / user.qAttempted) * 100)
                ? ' ' +
                  Math.round((user.qCorrect / user.qAttempted) * 100) +
                  '%'
                : ' -'}
              <br></br>
            </div>
          ) : (
            'Loading...'
          )}
        </h1>
      </div>
      {/* {console.log(user)} */}
    </div>
  );
};

export default UserProfile;
