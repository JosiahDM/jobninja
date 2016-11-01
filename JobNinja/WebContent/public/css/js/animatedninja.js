// todo http://www.mapeditor.org/

var up=false, down=false, left=false, right=false, fire=false; // "joystick" movement


var dir1 = 's',
    dir2 = 'e',
    walk = false,
    jump = false,
    punch = false,
    kick = false,
    $ninja,
    x, y,
    z = 1;

(function($) {
  $ninja = $(".ninja.controlled");

  // initial state
  x = $(window).width() / 2;
  y = $(window).height() / 2;
  down = true;
  right = true;

  $(window).keydown(function(e){
    // $("#debug").prepend("pressed " + e.keyCode + "<br />");
    handleKeydown(e.keyCode);
  });
  $(window).keyup(function(e){
    // $("#debug").prepend("released " + e.keyCode);
    handleKeyup(e.keyCode);
  });

  requestAnimationFrame(updateNinja);
})(jQuery);

function updateNinja() {
  $ninja.css("top", y + "px");
  $ninja.css("left", x + "px");
  if (walk) {
    y = dir1=='s'?y+1:y-1;
    x = dir2=='e'?x+1:x-1;
    $ninja.addClass("walk-"+dir1+dir2);
    $ninja.removeClass("face-ne face-nw face-se face-sw");
    if (dir1 == 's') {
      $ninja.removeClass("walk-ne walk-nw");
    } else {
      $ninja.removeClass("walk-se walk-sw");
    }
    if (dir2 == 'e') {
      $ninja.removeClass("walk-nw walk-sw");
    } else {
      $ninja.removeClass("walk-ne walk-se");
    }
  } else {
    $ninja.addClass("face-"+dir1+dir2);
    $ninja.removeClass("walk-ne walk-nw walk-se walk-sw");
    if (dir1 == 's') {
      $ninja.removeClass("face-ne face-nw");
    } else {
      $ninja.removeClass("face-se face-sw");
    }
    if (dir2 == 'e') {
      $ninja.removeClass("face-nw face-sw");
    } else {
      $ninja.removeClass("face-ne face-se");
    }
  }
  requestAnimationFrame(updateNinja);
}

function handleKeydown(keyCode) {
  switch(true) {
    case keyCode == 38: // up
      dir1 = 'n';
      walk = true;
      break;
    case keyCode == 40: // down
      dir1 = 's';
      walk = true;
      break;
    case keyCode == 37: // left
      dir2 = 'w';
      walk = true;
      break;
    case keyCode == 39: // right
      dir2 = 'e';
      walk = true;
      break;
  }
}

function handleKeyup() {
  walk = false;
}
