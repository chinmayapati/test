add in postshow - once
if( !gblGestureEnabledInMyContent ) {
      gblGestureEnabledInMyContent = true;
      currentTab = 0;
      this.addSwipeGestureHandler();
}

==============================================================================
// Swipe Gesture Handle
  addSwipeGestureHandler: function() {
    try {
      this.view.setGestureRecognizer(2, {fingers:1,swipedistance:50,swipevelocity:75}, onGestureFunction); // swipe with default parameters
    }
    catch(err) {
      kony.print("Error while regestering the gestures: "+err);
    }

    // Gesture Handler
    function onGestureFunction(commonWidget,gestureInfo) {
      try {
        var direction = "";
        var GesType = ""+gestureInfo.gestureType;
        var tapParams = gestureInfo.gesturesetUpParams.taps;
        if (GesType == "2") 
        { 
          var swipeDirection = ""+gestureInfo.swipeDirection;
          swipedContent = (swipeDirection=="1" || swipeDirection=="2") ? swipeDirection : "0";          
          if( swipeDirection === "1" ) {
            // left swipe
                      
          }
          else if( swipeDirection === "2" ) {
            // right swipe
                   
          }
        }
      }
      catch(err) {
        kony.print("Error in gesture call back: "+err);
      }
    }
  },
