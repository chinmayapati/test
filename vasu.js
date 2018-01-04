deleteRow: function(i, d) {
    // get text and index of selected row
    var storedData = JSON.parse(kony.store.getItem("recentSearches"));
    var storedDataIndex = storedData.indexOf(d);
    
    if(storedDataIndex > -1) {
      storedData.splice(storedDataIndex, 1);
      
      if(storedData.length===0) kony.store.removeItem("recentSearches");
      else {
        kony.store.setItem("recentSearches", JSON.stringify(storedData));

        this.view.segRecentSearch.removeAt(i);

        this.view.flxRecentSearchWraper.height = (parseInt(this.view.flxRecentSearchWraper.height.split('d')[0])-51).toString() + "dp"; 
        this.view.segRecentSearch.height = (parseInt(this.view.segRecentSearch.height.split('d')[0])-51).toString() + "dp"; 
      }
    }
    if( kony.store.getItem("recentSearches")===null ) {      
      this.populateRecentSearch();
    }
  },
