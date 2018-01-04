define(function() {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.getRecentSearches();
      this.view.txtSearchFunction.onTouchStart = this.recentScreenEnable.bind(this);

      this.view.txtSearchFunction.onDone = this.moveToSearchResults.bind( this, false );
      
      this.view.segSearchResults.onRowClick = this.segmentRowClicked.bind(this);
      this.view.SegRecentSearch.onRowClick = this.showRecentSearchResults.bind(this);
      this.view.btnSearchClear.onClick = this.clearRecentSearch.bind(this);
      controller = this;
      this.view.backButton.onClick = this.goBack;
      this.view.onDeviceBack = this.goBack;
      
      this.view.preShow = this.search_Preshow;
      this.view.postShow = this.search_Postshow;
      //this.view.init = this.addSwipeGestureHandler;

    },

    searchResults : [],
    
    // retrieve recent searches if any, from the device storage
	getRecentSearches : function() {
      try {
        var rs = kony.store.getItem("recentSearches");
        if(rs!==null) {
          var segmentData = [];
          var data = JSON.parse(rs);
          for(var i=data.length-1; i>=0; i--) {
            segmentData.push( { "lblSearchItem": {text: data[i]}, "imgArrow": {isVisible: true} } );
          }
          this.searchResults = segmentData;
        }
      } catch(e) {alert("error: " + e);}
    },

    /********************* Search Begin **************************/

    // handling recentsearch segment ui before search 
    search_Preshow  :function(){      
      this.view.flxRecentSearch.setVisibility(this.searchResults.length !== 0);
      this.view.btnSearchClear.setVisibility(this.searchResults.length !== 0);
      this.view.SegRecentSearch.removeAll();
      if( this.searchResults.length <= 0 )
      {
        this.view.segSearchResults.removeAll();
        this.view.lblNoSearchHistory.setVisibility(true);
      }

    },
    
    // searching for the keywords
    moveToSearchResults : function(fromRecent) {
      // return if searched text is empty
      var keywords = this.view.txtSearchFunction.text.trim();
      if(keywords === ""){
        return;
      }
      
      this.view.lblNoSearchHistory.setVisibility(false);
      
      try {
        var recentSearches = kony.store.getItem("recentSearches");

        // if recentsearch is null, use the search keyword else use from recentsearch
        var data = (recentSearches === null) ? [keywords] : JSON.parse(recentSearches);

        if( recentSearches !== null ) { // if recentsearch exists in device storage
          var itemIndex = data.indexOf(keywords); // find the index of current text
          // Altering position in recent search
          if( itemIndex > -1 ) {              
            data.splice(itemIndex, 1); // data is present, so remove it from the array
          }
          data.push(keywords);
        }
        if(data.length>5) data.shift();
        
        var segmentData = [];
        for(var i=data.length-1; i>=0; i--) {
          segmentData.push( { "lblSearchItem": {text: data[i]}, "imgArrow": {isVisible: true} } );
        }
        this.searchResults = segmentData;
        this.search_Postshow();

        kony.store.setItem("recentSearches", JSON.stringify(data) );

      } catch(e) { alert( "Search Error: " + e ); }

      
      var searchedRecord = {};

      this.view.flxRecentSearch.setVisibility(false);

      if (isNetworkAvailable()) {
        showLoading();
        if (mobileFabricConfiguration.isKonySDKObjectInitialized) {
          kony.print("Ïnside if condition");
          mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.integrationServices[0].service);
          var operationName = mobileFabricConfiguration.integrationServices[0].operations[2];
          var headers = {};
          var searchKeyword = this.view.txtSearchFunction.text;
          kony.print("searchKeyword: "+searchKeyword);
          var data = {"keyWord":searchKeyword};
          kony.print("Operation name : " + operationName);
          mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, data, this.getSearchResultSuccessCallback, this.getSearchResultFailureCallback);
        } 
      }
      else{
        //showError
      }

    },
    
    // setting recentsearch data to segment after search
    search_Postshow : function() {
      this.view.SegRecentSearch.setData(this.searchResults);

      var data = JSON.parse(JSON.stringify((this.view.segSearchResults && this.view.segSearchResults.data) || []));

      if(data.length > 0){
        this.view.segSearchResults.removeAll();
        this.view.segSearchResults.data = data;
      }

    },

    /********************* Recent Search End **************************/
    
    
    /********************* Service Call Begin **************************/
    getSearchResultSuccessCallback : function(response) {
      kony.print("getSearchResultSuccessCallback: "+JSON.stringify(response));
      if (response.opstatus === 0) {
        var contentList = response.contentList;
        kony.print("contentList:----> "+JSON.stringify(contentList));
        if (contentList !== null&&contentList !== undefined && contentList.length > 0) {
          this.view.lblNoSearchResults.setVisibility(false);
          var ArrItem=[];
          for (var i=0; i<contentList.length; i++) {
            var data = contentList[i];
            var catImg =data.categoryImage;
            var catName = data.categoryTitle;
            var contentTitle = data.contentTitle;
            var contentShortDesc =  data.contentShortDesc;
            if (contentShortDesc !== null && contentShortDesc !== "" && contentShortDesc.length >40) {

              contentShortDesc= contentShortDesc.substring(0,50)+ "...";
            }

            var youtubeLink = data.youtubeLink;
            var pdfUrl = data.pdfUrl;
            var videoUrl = data.videoUrl;
            var folioUrl = data.folioUrl;
            var webcontent = data.webcontent;

            var isShareable = data.isShareable;                  
            var isDownloadable = data.isDownloadable;                     
            var detailPgImguid = data.detailPgImguid;                  
            var updatedDate = data.updatedTime;  

            var btnSwitchData = {};
            var lblDownloadData = {};
            var contentType = "";
            var url = "";
            var contentSource = data.contentSource;
            if (!isBlankOrNull(pdfUrl)) {
              contentType = "pdf";
              url = pdfUrl;
            } else if (!isBlankOrNull(videoUrl)) {
              contentType = "video";
              url = videoUrl;
            } else if (!isBlankOrNull(youtubeLink)) {
              contentType = "YoutubeVideo";
              url = youtubeLink;
            } else if (!isBlankOrNull(folioUrl)) {
              contentType = "folio";
              url = folioUrl;
            }else if (!isBlankOrNull(webcontent)) {                         
              contentType = "webcontent";
              url = webcontent;
            }

            var publishTime = data.publishTime;
            publishTime = this.getFormattedDate(publishTime);

            var temp = {
              "imgCategory":{src:data.detailPgImgUrl,isVisible: true},
              "lblCategoryName":contentSource[0].categoryTitle,
              "lblContentTitle": contentTitle,
              "lblShortDescription" : contentShortDesc,

              "profileName": contentSource[0].categoryTitle,
              "profileSub": contentSource[0].categoryDesc,
              "profileImg": contentSource[0].categoryImage,
              "ImageContent": {src:data.detailPgImgUrl,isVisible: true},
              "contentType": contentType,
              "lbltitle": data.contentTitle,
              //               "rchContentDesc": contentShortDesc,            
              //               //            "rchContentDesc": data["contentShortDesc"],
              "lblDetailDecDummy":data.contentLongDesc,
              "lblSeeMore": "See more",
              "url": url,                             
              "flxContentControls":{isVisible: true},
              "author":data.author,
              "publishTime":publishTime,
              "LikeButton":{isVisible: true},
              "ShareButton":{isVisible: true},
              "BookmarkButton":{isVisible: true},
              "moreOptions":{isVisible: true},
              "btnLike": {
                isVisible: true
              },
              "btnShare": {
                isVisible: true

              },
              "btnBookmark": {
                isVisible: true
              },
              "btnMoreOptions": {
                isVisible: true
              },           
              "btnSwitch": btnSwitchData,
              "lblDownload": lblDownloadData,
            };


            ArrItem.push(temp);                        
          }
          this.view.segSearchResults.setVisibility(true);
          this.view.segSearchResults.setData(ArrItem);
          dismissLoading();

        }else{
          dismissLoading();

          var remove = (this.view.segSearchResults && this.view.segSearchResults.data) || [];
          if(remove.length > 0){
            this.view.segSearchResults.removeAll();
          }

          var erroMsg = getI18Value("i18n.amway.NoSearchResults");
          if(erroMsg!==null)
            erroMsg = erroMsg.replace("xx",this.view.txtSearchFunction.text);
          kony.print("erroMsg-->"+erroMsg);
          this.view.lblNoSearchResults.setVisibility(true);
          this.view.lblNoSearchResults.text = erroMsg;
          kony.print("lblNoSearchResults.text==="+this.view.lblNoSearchResults.text);
          
        }

      }


    },
    
    getSearchResultFailureCallback : function() {
      dismissLoading();
      showInformationAlert("Info", getI18Value("ServiceFailureMessage"));
      kony.print(" ********** Failure in contactusErrorCallback: " + JSON.stringify(errormsg) + " ********** ");
    },
    /********************* Service Call End **************************/


	// enabling recentsearch ui after touching textbox
    recentScreenEnable : function() {
      this.view.flxRecentSearch.setVisibility(this.searchResults.length !== 0);
      this.view.btnSearchClear.setVisibility(this.searchResults.length !== 0);
      this.view.SegRecentSearch.zIndex = 2;
    },
	
    // handling recent search segment row click
    showRecentSearchResults : function() {
      var rowData = this.view.SegRecentSearch.selectedRowItems;
      this.view.txtSearchFunction.text = rowData[0].lblSearchItem.text;
      this.moveToSearchResults(true);
    },
    // clearing any recent search in the recentsearch segment
	clearRecentSearch : function() {
      try{ kony.store.removeItem("recentSearches"); } catch(e){}
      this.searchResults = [];
      this.search_Preshow();
      this.view.flxRecentSearch.setVisibility(false);
      this.view.btnSearchClear.setVisibility(false);
      this.view.lblNoSearchHistory.setVisibility(true);
      this.view.txtSearchFunction.text = "";

    },
    
    // search results segment row click handle
    segmentRowClicked: function() {
      if (isNetworkAvailable()) {
        kony.print("Row clicked in homepage nkjnk");
        var data = controller.view.segSearchResults.selectedRowItems;
        kony.print("segmentRowClicked-->"+JSON.stringify(data[0]));
        var index = controller.view.segSearchResults.selectedIndex[1];
        kony.print("segmentRowClicked-->"+JSON.stringify(controller.view.segSearchResults.selectedIndex[1]));
        kony.print("segmentData-->"+JSON.stringify(controller.view.segSearchResults.data[index]));

        if (data[0].contentType === "YoutubeVideo")
        {
          var url = data[0].url.toLowerCase();
          var nav = new kony.mvc.Navigation("containDetailYoutubepage");
          nav.navigate(data[0]);
        }else if (data[0].contentType === "video")
        {
          this.url = data[0].url.toLowerCase();
          this.nav = new kony.mvc.Navigation("contentvideodetailpage");
          this.nav.navigate(data[0]);
        }else{
          this.nav = new kony.mvc.Navigation("contentdetailpage");
          this.nav.navigate(data[0]);                                
        }
      } else {

        // Offline scenarios need to be haandled here.

      }

    },

    goBack : function () {
      kony.print("Entered Into Search controller goBack");
      var ntf;

      ntf = new kony.mvc.Navigation( "homepage" );
      ntf.navigate();

    },
    getFormattedDate : function(currDate) {
      var date = new Date(currDate);
      var month = new Array();
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      var monthName = month[date.getMonth()];
      var year = date.getFullYear();
      var day = date.getDate();
      return day + " " + monthName + " " + year;
    },

    
    /* Cold Code */
    navigateContentDetails : function() {

    },
    
  };
});
