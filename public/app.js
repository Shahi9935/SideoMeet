const localImageEl = $('#local-image');
const localVideoEl = $('#local-video');
const formEl = $('.form');
// const remoteVideoTemplate = Handlebars.compile($('#remote-video-template').html());
const remoteVideosEl = $('#remote-video');
let remoteVideosCount=0;

localVideoEl.hide();

  const webrtc = new SimpleWebRTC({
    localVideoEl: 'local-video',
    remoteVideosEl: 'remote-videodiv',
    autoRequestMedia: true,
    debug: false,
    detectSpeakingEvents: true,
    autoAdjustMic: false,
    autoRemoveVideos:true
  });

  webrtc.on('localStream', () => {
    localImageEl.hide();
    localVideoEl.show();
  });

  webrtc.on('videoAdded', (video, peer) => {
    // const id = webrtc.getDomId(peer);
    // const html = remoteVideoTemplate({ id });
    //   remoteVideosEl.html(html);
    if(remoteVideosCount==1){
        alert("Room is Full");
        return;
    }
    $("#remote-videodiv").html(video);
    console.log(peer);
    // $("#remote-videodiv video").height("400px");
    // $(`#${id} video`).addClass('ui image medium');
    remoteVideosCount += 1;
  });

  const createRoom = (roomName) => {
    webrtc.createRoom(roomName, (err, name) => {
        console.log(`Created ${roomName}`);
    //   formEl.form('clear');
    //   showChatRoom(name);
    //   postMessage(`${username} created chatroom`);
    });
  };

  const joinRoom = (roomName,userName) => {
    webrtc.joinRoom(roomName);
    console.log(`Joined ${roomName}`);
    // showChatRoom(roomName);
    // postMessage(`${username} joined chatroom`);
  };
  function pauseVideo(){
webrtc.pauseVideo();
document.getElementById('rv').disabled = false;
document.getElementById('pv').disabled = true;
  }
  function resumeVideo(){
    webrtc.resumeVideo();
    document.getElementById('pv').disabled = false;
document.getElementById('rv').disabled = true;
  }
  function pauseAudio(){
    webrtc.mute();
    document.getElementById('ra').disabled = false;
document.getElementById('pa').disabled = true;
      }
  function resumeAudio(){
        webrtc.unmute();
        document.getElementById('pa').disabled = false;
document.getElementById('ra').disabled = true;
      }

  $('.submit').on('click', (event) => {
    username = $('#username').val();
    const roomName = $('#roomName').val().toLowerCase();
    $("#formEle").html(`Room - ${roomName}`);
    if (event.target.id === 'create-btn') {
      createRoom(roomName);
    } else {
      joinRoom(roomName,username);
    }
    return false;
  });

