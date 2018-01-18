toggleDownloaded: function() {      
      this.loadDownloads();
      
      if( currentTab === 0 ) return;
      else if(currentTab === 1) {
        animate(this.view.tlBookmarked, {"left" : "-100%"}, 0.2);
        this.view.lblBookmarked.skin = INACTIVE_TEXT;
        
        animate(this.view.segContentBookmarked, {"left" : "100%"}, 0.2);        
      }
      else {
        animate( this.view.tlCollections, {"left" : "-100%" }, 0.2);
        this.view.lblCollections.skin = INACTIVE_TEXT;  
        
        animate(this.view.flxContentCollections, {"left" : "100%"}, 0.2);
      }
      this.view.tlDownloaded.left = "100%";
      animate(this.view.tlDownloaded, {"left" : "10%"}, 0.6);
      this.view.tlDownloaded.isVisible = true;
      this.view.lblDownloaded.skin = ACTIVE_TEXT;
      
      this.view.segContentDownloaded.left = "-100%";
      animate(this.view.segContentDownloaded, {"left" : "0%"}, 0.8);
      
      currentTab = 0;
      swipedContent = "0";
      
    },
    
    toggleBookmarked: function() {
      //alert("inside bm: " + currentTab);
      this.loadBookmarks();
      
      if( currentTab === 1 ) return;
      else if(currentTab === 0) {
        animate(this.view.tlDownloaded, {"left" : "100%"}, 0.2);
        this.view.lblDownloaded.skin = INACTIVE_TEXT;
        this.view.tlBookmarked.left = "-100%";
        
        animate(this.view.segContentDownloaded, {"left" : "-100%"}, 0.2);
        this.view.segContentBookmarked.left = "100%";
      }
      else {
        animate( this.view.tlCollections, {"left" : "-100%" }, 0.2);
        this.view.lblCollections.skin = INACTIVE_TEXT;
        this.view.tlBookmarked.left = "100%";
        
        animate(this.view.flxContentCollections, {"left" : "100%"}, 0.2);
        this.view.segContentBookmarked.left = "-100%";
      }
      animate(this.view.tlBookmarked, {"left" : "10%"}, 0.6);
      this.view.lblBookmarked.skin = ACTIVE_TEXT;
      
      animate(this.view.segContentBookmarked, {"left" : "0%"}, 0.8);
      
      currentTab = 1;
      swipedContent = "0";
      
    },
    
    toggleCollections: function() {
      this.loadCollections();
      
      if( currentTab === 2 ) return;
      else if(currentTab === 0) {
        animate(this.view.tlDownloaded, {"left" : "100%"}, 0.2);
        this.view.lblDownloaded.skin = INACTIVE_TEXT;   
        
        animate(this.view.segContentDownloaded, {"left" : "-100%"}, 0.2);
      }
      else {
        animate( this.view.tlBookmarked, {"left" : "100%" }, 0.2);
        this.view.lblBookmarked.skin = INACTIVE_TEXT;
        
        animate(this.view.segContentBookmarked, {"left" : "-100%"}, 0.2);
      }
      this.view.tlCollections.left = "-100%";
      animate(this.view.tlCollections, {"left" : "10%"}, 0.6);
      this.view.lblCollections.skin = ACTIVE_TEXT;
      
      this.view.flxContentCollections.left = "100%";
      animate(this.view.flxContentCollections, {"left" : "0%"}, 0.8);
      
      currentTab = 2;
      swipedContent = "0";
      
    },
