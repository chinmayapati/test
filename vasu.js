addSwipeGestureHandler: function() {
    // Gesture Listner
    try {
      this.view.setGestureRecognizer(2, {fingers:1,swipedistance:50,swipevelocity:75}, onGestureFunction); // swipe with default parameters
    }
    catch(err) {
      alert("Error while regestering the gestures: "+err);
    }

    // Gesture Handler
    function onGestureFunction(commonWidget,gestureInfo) {
      try {
        var direction = "";
        var GesType = ""+gestureInfo.gestureType;
        var tapParams = gestureInfo.gesturesetUpParams.taps;
        if (GesType == "2") // Swipe gesture
        { 
          var swipeDirection = ""+gestureInfo.swipeDirection;
          alert(swipeDirection);
          swipedSearch = (swipeDirection=="1" || swipeDirection=="2") ? swipeDirection : "0";
        }
      }
      catch(err) {
        alert("Error in gesture call back: "+err);
      }
    }
  },
