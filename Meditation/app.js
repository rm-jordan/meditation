// Meditation app

const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  // this is so we can call the outline of the play button
  const outline = document.querySelector('.moving-outline circle')
  const video = document.querySelector('.vid-container video');

  // Sounds
const sounds = document.querySelectorAll('.sound-selector button')
  //Time display
  const timeDisplay = document.querySelector('.time-display');
  const timeSelect = document.querySelectorAll('.time-selector button')
  // get the length of the outline
  const outlineLength = outline.getTotalLength();
  console.log(outlineLength);
  //Duration
  let fakeDuration = 600;

    //this is to animate the outer ring  
    outline.style.strokeDasharray = outlineLength;
    //animated backwards replaces blue outline 
    outline.style.strokeDashoffset= outlineLength;

    //this is done after the video pause at song end is sorted
    // pick different sounds
    sounds.forEach(sound => {
      sound.addEventListener('click', function() {
        song.src = this.getAttribute('data-sound')
        video.src = this.getAttribute('data-video')
        checkPlaying(song);   
      })
    })

    //Play sound
    play.addEventListener('click', ()=> {
      // check to make sure the click works make checkPlaying function down below then call
      checkPlaying(song);
    })

    // This was done after all the functions below

    // Select sound
    timeSelect.forEach(option => {
      option.addEventListener('click' ,function() {
        fakeDuration = this.getAttribute('data-time');
        timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)} `
      });
    });

    //Create a function specific to stop and play the sounds
  
    const checkPlaying = song => {
      if(song.paused) {
        song.play();
        video.play();
        // if song is paused song will play
        play.src ='./svg/pause.svg';
      } else {
        song.pause();
        video.pause();
        play.src = './svg/play.svg'
      }
    };

    // We can animate circle and check the time, this runs every time the song runs
    song.ontimeupdate = () => {
      let currentTime = song.currentTime;
      let elapsed = fakeDuration - currentTime;
      let seconds = Math.floor(elapsed % 60);
      let minutes = Math.floor (elapsed / 60);


      //Animate the circle
      let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
      outline.style.strokeDashoffset = progress;

      //Animate the text
      timeDisplay.textContent = `${minutes}:${seconds}`;
      //completed after timeSelect function is made

      if(currentTime >= fakeDuration){
        song.pause();
        song.currentTime = 0;
        play.src = './svg/play.svg';
        video.pause();
      }

    };
  
};

app();