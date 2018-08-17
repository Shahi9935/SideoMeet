const localImageEl = $('#local-image');
const localVideoEl = $('#local-video');
const formEl = $('.form');
// const remoteVideoTemplate = Handlebars.compile($('#remote-video-template').html());
const remoteVideosEl = $('#remote-video');
let remoteVideosCount=0;

localVideoEl.hide();

  const webrtc = new SimpleWebRTC({
    localVideoEl: 'local-video',
    remoteVideosEl: 'remote-videos',
    autoRequestMedia: true,
    debug: false,
    detectSpeakingEvents: true,
    autoAdjustMic: false,
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
    document.getElementById("remote-videodiv").style.width="500px";
    $("#remote-videodiv video").width("500px");
    $("#placeholdre").html("");
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
    webrtc.joinRoom(roomName)
    console.log(`Joined ${roomName}`);
    // showChatRoom(roomName);
    // postMessage(`${username} joined chatroom`);
  };

  $('.submit').on('click', (event) => {
    username = $('#username').val();
    const roomName = $('#roomName').val().toLowerCase();
    $(".fields").html("");
    if (event.target.id === 'create-btn') {
      createRoom(roomName);
    } else {
      joinRoom(roomName,username);
    }
    return false;
  });

