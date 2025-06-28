 const songs = [
      {
        title: "slow_music__calming_down_(128k)",
        src: "songs/Slow_music__calming_down_(128k).mp3",
        cover: "images/z56.jpg"
      },
      {
        title: "Achievement___Inspirational_Background_Music",
        src: "songs/Achievement___Inspirational_Background_Music_for_Video_by_MaxKoMusic_-_Free_Download(128k).mp3",
        cover: "images/z25.jpeg"
      },
      {
        title: "Phonk___Use_Headset_🎧",
        src: "songs/Phonk___Use_Headset_🎧.mp3",
        cover: "images/th.jpeg"
      }
      
    ];

    const audio = document.getElementById('audio');
    const title = document.getElementById('title');
    const artist = document.getElementById('artist');
    const cover = document.getElementById('cover');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const playBtn = document.getElementById('play-btn');
    const volumeSlider = document.getElementById('volume');
    const playlistEl = document.getElementById('playlist');
        const playlistScroll = document.querySelector('.playlist-scroll');
        


    let songIndex = 0;

    function loadSong(song) {
      title.textContent = song.title;
      artist.textContent = song.artist;
      audio.src = song.src;
      cover.style.backgroundImage = `url(${song.cover})`;
    }

    function togglePlay() {
      if (audio.paused) {
        audio.play();
        playBtn.textContent = '⏸️';
      } else {
        audio.pause();
        playBtn.textContent = '▶️';
      }
    }

    function prevSong() {
      songIndex = (songIndex - 1 + songs.length) % songs.length;
      loadSong(songs[songIndex]);
      audio.play();
      playBtn.textContent = '⏸️';
    }

    function nextSong() {
      songIndex = (songIndex + 1) % songs.length;
      loadSong(songs[songIndex]);
      audio.play();
      playBtn.textContent = '⏸️';
    }

    audio.addEventListener('timeupdate', () => {
      progress.value = (audio.currentTime / audio.duration) * 100;
      currentTimeEl.textContent = formatTime(audio.currentTime);
      durationEl.textContent = formatTime(audio.duration);
    });

    progress.addEventListener('input', () => {
      audio.currentTime = (progress.value / 100) * audio.duration;
    });

    volumeSlider.addEventListener('input', () => {
      audio.volume = volumeSlider.value;
    });

    function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    }

    function togglePlaylist() {
      playlistEl.style.display = playlistEl.style.display === 'flex' ? 'none' : 'flex';
    }

    // Populate playlist
    songs.forEach((song, index) => {
      const li = document.createElement('li');
      li.textContent = song.title;
      li.onclick = () => {
        songIndex = index;
        loadSong(song);
        audio.play();
        playBtn.textContent = '⏸️';
        playlistEl.style.display = 'none';
      };
      playlistScroll.appendChild(li);
      
    });

    audio.addEventListener('ended', nextSong);
    loadSong(songs[songIndex]);