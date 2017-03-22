// Basic 'gist' only. See demo source for more.
var scale = 1;
var videoRatio = 16 / 9;
var viewportRatio = $(window).width() / $(window).height();
 
if (videoRatio < viewportRatio) {
    // viewport more widescreen than video aspect ratio
    scale = viewportRatio / videoRatio;
} else if (viewportRatio < videoRatio) {
    // viewport more square than video aspect ratio
    scale = videoRatio / viewportRatio;
}







var hdConstraints = {
  video: {
    mandatory: {
      minWidth: 1280,
      minHeight: 720
    }
  }
};
    
  navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

if (navigator.getUserMedia) {
   navigator.getUserMedia(hdConstraints,
      function(stream) {
         var video = document.querySelector('video');
         video.src = window.URL.createObjectURL(stream);
         video.onloadedmetadata = function(e) {
           video.play();
         };
        var hammertime = new Hammer(video, {});
        hammertime.get('pinch').set({ enable: true });

        hammertime.on('pinch', function (ev) {
            console.log(ev);
        });
       
      },
      function(err) {
         console.log("The following error occured: " + err.name);
      }
   );
} else {
   console.log("getUserMedia not supported");
}