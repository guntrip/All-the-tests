// Creates click event listener on Navigation button
// Click triggers Navigation Menu open/close visibility
// When Menu is open, timer is called after 2 seconds
// If Menu is still open and mouse is not over Menu items, menu is auto closed

(function(){

/// Add Event Listeners //
  var navBtn = document.getElementsByClassName('nav-btn');
  var navUl = document.getElementsByClassName('nav-list');

  for(var i=0;i< navBtn.length;i++){

      navBtn[i].addEventListener('click', navBtnClick);
  }

  for(var i=0;i< navUl.length;i++){

      navUl[i].addEventListener('mouseover', navListMouseOver);
  }


/// Called on Click, checks current visibility status of Nav Menu
//  Makes call to either open or close
  function navBtnClick(){

    var parent = getClosestByClassName(this, 'nav-list');
    var items = parent.getElementsByClassName('nav-item');

    if(!parent.dataset.slstatus || parent.dataset.slstatus == 'closed'){

      openMenu(parent, items);

    }
    else if (parent.dataset.slstatus =='open') {

      closeMenu(parent, items);
    }
    else{
      console.log('parent <ul> not found')
    }
  }

  // called on mouseOver of Menu List.
  // if menu is open, we call openMenu function again to reset 2 second timer that closes menu
  // (we dont want to close menu if user is still active and using it)

  function navListMouseOver(){

    var parent = getClosestByClassName(this, 'nav-list');

    if(this.dataset.slstatus =='open'){

        var items = this.getElementsByClassName('nav-item');
        openMenu(this, items);
    }
  }

  // called to open menu, Class of <li> elements modified to trigger visibility
  // Timer function called to re-check status of menu after 2 seconds
  function openMenu(parent, items){

    if(!parent.dataset.slclickid){

      parent.dataset.slclickid = 1;
    }
    else{
      parent.dataset.slclickid = parent.dataset.slclickid + 1;
    }

    toggleClass(items, 'nav-item show');
    autoCloseMenu( parent, items, parent.dataset.slclickid);
    parent.dataset.slstatus = 'open';

  }

  /// Called after Menu item has been opened (2 second delay)
  //  Checks 1- is menu still open?, 2- is user still active on menu (clickid will be different)

  function autoCloseMenu(parent, items, id){

    setTimeout(function(){
      if(parent.dataset.slstatus=='open'){
        if(id==parent.dataset.slclickid){

          closeMenu(parent, items);
        }
      }
    }, 2000);

  }

  // called to close Nav Menu
  function closeMenu(parent, items){

    toggleClass(items, 'nav-item');
    parent.dataset.slstatus = 'closed';

  }

  // helper function to change class name for multiple elements
  function toggleClass(elements , className){

    for(var i=0;i< elements.length;i++){

        if(elements[i].className != 'nav-btn'){
            elements[i].className = className;
        }
    }

  }

 // helper function to get closest parent element by class name
  function getClosestByClassName(el, clss){

    while (el.className != clss) {

       el = el.parentNode;
       if (!el) {
           return null;
       }
     }

     return el;
  }

})();
