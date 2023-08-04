const lyricsContainer = document.getElementById("lyricsContainer");
const infoContainer = document.getElementById("infoContainer");

let currentLyricIndex = -1;
let previousLyricIndex = -1;
let randomizationStarted = false;

function startRandomization() {
  
  if (!randomizationStarted) {
    // Hide the explanatory text
    textContainer.style.display = "none";
    dano.style.display = "none";
    credits.style.display = "none";
    randomizationStarted = true;
}
    randomizationStarted = true;
    generateRandomLyric();
    const startBtnSvg = document.getElementById('startBtn');
    const newPathData = 'm33.5,0C15,0,0,15,0,33.5s15,33.5,33.5,33.5,33.5-15,33.5-33.5S52,0,33.5,0Zm-4.5,46h-6v-26h6v26Zm15,0h-6v-26h6v26Z'; // Replace this with your desired path data
    const pathElement = startBtnSvg.querySelector('path');
    pathElement.setAttribute('d', newPathData);

    startBtn.disabled = true;
}

// Fisher-Yates shuffle implementation
function fisherYatesShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let shuffledLyricsList = fisherYatesShuffle([...lyricsList]);

function generateRandomLyric() {
  if (randomizationStarted) {
      previousLyricIndex = currentLyricIndex;

      // Iterate through shuffledLyricsList
      currentLyricIndex = (currentLyricIndex + 1) % shuffledLyricsList.length;

      showLyric(currentLyricIndex);
  }
}
function showNextOrShuffleLyric() {
  previousLyricIndex = currentLyricIndex;

  if (!randomizationStarted) {
      startRandomization();
  } else {
      currentLyricIndex = (currentLyricIndex + 1) % shuffledLyricsList.length;
      showLyric(currentLyricIndex);
  }
}

function showPreviousLyric() {
  previousLyricIndex = currentLyricIndex;
  currentLyricIndex = (currentLyricIndex - 1 + shuffledLyricsList.length) % shuffledLyricsList.length;
  showLyric(currentLyricIndex);
}

function getRandomLyricIndex() {
    return Math.floor(Math.random() * lyricsList.length);
}

function applyColorTransitions(bgColor, textColor) {
    document.body.style.transition = "background-color 0.4s, color 0.4s";
    lyricsContainer.style.transition = "color 0.4s";
    infoContainer.style.transition = "color 0.4s";

    document.body.style.backgroundColor = bgColor;
    lyricsContainer.style.color = textColor;
    infoContainer.style.color = textColor;

    const svgElements = document.querySelectorAll("svg");
    svgElements.forEach(svg => {
        svg.style.transition = "fill 0.4s";
        svg.style.fill = textColor;
    });

    // Clear the transitions after a delay
    setTimeout(() => {
        document.body.style.transition = "";
        lyricsContainer.style.transition = "";
        infoContainer.style.transition = "";
        svgElements.forEach(svg => {
            svg.style.transition = "";
        });
    }, 400); // Set the same duration as the transition time
}

function showLyric(index) {
    const lyricData = lyricsList[index];
    const { lyric, song, artist, album, year, bgColor, textColor, albumCover } = lyricData;

    lyricsContainer.innerText = lyric;
    infos.innerHTML = `<strong>${song}</strong> <br/> ${artist}`;

    applyColorTransitions(bgColor, textColor);

    const albumCoverImg = document.getElementById("albumCover");
    albumCoverImg.src = albumCover;
}

document.getElementById("startBtn").addEventListener("click", startRandomization);
document.getElementById("backBtn").addEventListener("click", showPreviousLyric);
document.getElementById("shuffleBtn").addEventListener("click", showNextOrShuffleLyric);
document.getElementById("backBtn").addEventListener("click", showPreviousLyric);