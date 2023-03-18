(function ($) {
  $(document).ready(function () {
    const imgList = [
      "background.jpg",
      "smurf.jpg",
      "sunglasses.png",
      "girl.png",
      "anime.jpg",
    ];

    var currentImageIndex = 0;
    const changePuzzleBackground = () => {
      // currentImageIndex = (currentImageIndex > imgList.length) ? 0 : currentImageIndex+1;
      currentImageIndex++;
      if (currentImageIndex >= imgList.length) {
        currentImageIndex = 0;
      }
      loadBackgroundImage();
    };

    var movable; //an array where the positions of puzzle pieces close to the blank space will be stored.

    //Setting up each square with a background image piece
    const loadBackgroundImage = (imgPath) => {
      $("#puzzlearea div").each(function (i) {
        var x = (i % 4) * 100;
        var y = Math.floor(i / 4) * 100;

        //Applying basic styling and a background image
        $(this).addClass("puzzlepiece");
        $(this).css("left", x + "px");
        $(this).css("top", y + "px");
        $(this).css(
          "backgroundImage",
          "url('public/img/" + imgList[currentImageIndex] + "')"
        );
        $(this).css("backgroundPosition", -x + "px " + -y + "px");
      });
    };
    loadBackgroundImage();

    $("#imgChange").click(changePuzzleBackground);
    //Assigning a hover color to each puzzle
    $(".puzzlepiece").hover(
      function () {
        var blank = findBlank();
        setPuzzlesMovable(blank);
        if (isMovable($(this))) {
            $(this).addClass("activeSquare")
        };
      },
      function () {
        var blank = findBlank();
        setPuzzlesMovable(blank);
        if (isMovable($(this))) $(this).removeClass("activeSquare");
      }
    );

    //Clicking on a puzzle piece
    $(".puzzlepiece").click(function () {
      //Locating the blank square where piece can move into
      var blank = findBlank();
      setPuzzlesMovable(blank);
      //Only allowing a puzzle piece to be swapped if the adjacent square is blank
      if (isMovable($(this))) {
        //Moving the clicked puzzle piece to the empty square position
        $(this).css("left", blank.left + "px");
        $(this).css("top", blank.top + "px");
      }
    });

    //Searching for the blank square location
    const findBlank = () => {
      //Establishing the default position for all squares and the blank square
      var defaultSquares = [
        { left: 0, top: 0 },
        { left: 100, top: 0 },
        { left: 200, top: 0 },
        { left: 300, top: 0 },
        { left: 0, top: 100 },
        { left: 100, top: 100 },
        { left: 200, top: 100 },
        { left: 300, top: 100 },
        { left: 0, top: 200 },
        { left: 100, top: 200 },
        { left: 200, top: 200 },
        { left: 300, top: 200 },
        { left: 0, top: 300 },
        { left: 100, top: 300 },
        { left: 200, top: 300 },
        { left: 300, top: 300 },
      ];

      //Creating a temporary array to filter the puzzle pieces
      var tempArr = defaultSquares.slice();

      //Removing the puzzle pieces one by one
      $(".puzzlepiece").each(function (i, v) {
        var position = { left: $(this).css("left"), top: $(this).css("top") };
        tempArr.splice(
          tempArr.findIndex(
            (v) =>
              v.left == parseInt($(this).css("left")) &&
              v.top == parseInt($(this).css("top"))
          ),
          1
        );
      });

      //The last remaining piece will be the empty square
      return tempArr[0];
    };

    const isMovable = (element) => {
      var found = false;
      movable.forEach(function (val) {
        if (
          val.left == parseInt(element.css("left")) &&
          val.top == parseInt(element.css("top"))
        )
          found = true;
      });
      return found;
    };

    const setPuzzlesMovable = (blank) => {
      movable = [];
      let closePositionTemp = [
        { left: blank.left - 100, top: blank.top },
        { left: blank.left + 100, top: blank.top },
        { left: blank.left, top: blank.top - 100 },
        { left: blank.left, top: blank.top + 100 },
      ];

      closePositionTemp.forEach(function (v, i) {
        if (v.left >= 0 && v.left <= 300 && v.top >= 0 && v.top <= 300)
          movable.push(v);
      });
    };
    //Clicking on the shuffle button to randomize the position of the puzzle pieces
    $("#shufflebutton").click(function () {
      for (let i = 0; i < 100; i++) {
        let blank = findBlank();

        setPuzzlesMovable(blank);

        let randomPosition =
          movable[Math.floor(Math.random() * movable.length)];
        $("#puzzlearea")
          .children()
          .each(function () {
            if (
              randomPosition.left == parseInt($(this).css("left")) &&
              randomPosition.top == parseInt($(this).css("top"))
            ) {
              $(this).css("left", blank.left + "px");
              $(this).css("top", blank.top + "px");
            }
          });
      }
    });
  });
})(jQuery);
