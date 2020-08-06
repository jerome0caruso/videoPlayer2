const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");//grabs anything with this attr.
const ranges = player.querySelectorAll(".player__slider");
const playRate = player.querySelector(".rate");
const fullScreen = player.querySelector(".fullBtn");

function togglePlay() {
    // using ternary op to determine to either start or pause video.  
    // method["Start"] instead of video.start().
    const method = video.paused? "play" : "pause";
    video[method]();
}

function updateButton() {
    let icon = this.paused ? "►" : "❚ ❚";
    toggle.textContent = icon;
  }
function skip() {
    //skip property is either -10 or 25 added to currentTime method
    video.currentTime += parseFloat(this.dataset.skip);
}

let isDown = false;
function rangeUpdate() {
    const playBackSliderName = "playbackRate";
    if(isDown === true){
        //if mouse down and over slider, set playBack or volume to value entered by
        //slider position, also added background highlight when at normal playback
        console.log(this.value, this.name)
        video[this.name] = this.value;
        if(this.name === playBackSliderName && this.value === "1"){
            playRate.setAttribute("style", "background-color: #222000;");
            setTimeout(() =>{
                playRate.removeAttribute("style", "background-color:#222000;");
            }, 300);
        }
    }
}

function handleProgress() { //runs every millsec the movie is player
    console.log("sec")
    const percent = (video.currentTime / video.duration) * 100 // gives whole number
    progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
    // the event is the mouse clicking on the progress bar which gives us the offsetX postion of that exact
    // spot so this(bar) is 640px if you click half way it will give 320 then div by total size(640)
    // will give half then * by duration will give you the spot of specific video, this case 50%
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
function getFullScreen() {
    video.requestFullscreen();

}


video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton); //listen to event 
video.addEventListener("pause", updateButton);
toggle.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", handleProgress);
let mouseProDown = false;
progress.addEventListener("click", scrub);
//***!will check the "flag"(true or false) ONLY if true will then run the Callback function. The event is passed for exact time clicked
progress.addEventListener("mousemove", (e) => mouseProDown && scrub(e));
progress.addEventListener("mousedown", () => mouseProDown = true);
progress.addEventListener("mouseup", () => mouseProDown = false);

fullScreen.addEventListener("click", getFullScreen);

skipButtons.forEach(button => button.addEventListener("click", skip));
ranges.forEach(range => range.addEventListener("mousemove", (rangeUpdate)));
ranges.forEach(range => range.addEventListener("mousedown", () => isDown = true));
//added feature so it only tracks range movement when mouse down and over the range slider
ranges.forEach(range => range.addEventListener("mouseup", () => isDown = false));