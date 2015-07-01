$(document).ready(function(){
  var getJsonData = function (url) {
    var jsonData = null;
    $.ajax({
      async: false,
      url: url,
      dataType: 'json',
      success: function (data) {
        jsonData = data;
      }
    });
    return jsonData;
  }
  var postWord = function(lang) {
    if (lang === 'he') {
      var wordName = $('.he .wtt').val();
      var jsonData = getJsonData('dict-he-en.json');
      var words = jsonData;
      for (i in words) {
        var word = words[i];
        var wordFound = null;
        var dictWord = word.translated.replace(/[\u0591-\u05C7]/g,'');
        if (dictWord === wordName) {
          wordFound = true;
        }
        if (wordFound === true) {
          var w = $('<div/>', {
            id: word.id,
            class: 'word',
          });

          $('<h2/>', {
            class: 'rtl',
            text: word.translated,
          }).appendTo(w);

          $('<h3/>', {
            class: 'rtl',
            text: word.part_of_speech,
          }).appendTo(w);

          $('<p/>', {
            text: word.translation,
          }).appendTo(w);

          w.prependTo('.he .words');
        }
      }
    }
    else if (lang === 'en') {
      var wordName = $('.en .wtt').val();
      var jsonData = getJsonData('dict-en-he.json');
      var words = jsonData;
      for (i in words) {
        var word = words[i];
        var wordFound = null;
        var dictWord = word.translated;
        if (dictWord.toUpperCase() === wordName.toUpperCase()) {
          wordFound = true;
        }
        if (wordFound === true) {
          var w = $('<div/>', {
            id: word.id,
            class: 'word',
          });

          $('<h2/>', {
            text: word.translated,
          }).appendTo(w);

          $('<h3/>', {
            text: word.part_of_speech,
          }).appendTo(w);

          $('<p/>', {
            class: 'rtl',
            text: word.translation,
          }).appendTo(w);

          w.prependTo('.en .words');
        }
      }
    }
  }
  var sliceDict = function(lang, start, end) {
    if (lang === 'he') {
      var jsonData = getJsonData('dict-he-en.json');
      var words = jsonData.slice(start, end);
      $('.he .words').empty();
      for (i in words) {
        var word = words[i];
        var w = $('<div/>', {
          id: word.id,
          class: 'word',
        });

        $('<h2/>', {
          class: 'rtl',
          text: word.translated,
        }).appendTo(w);

        $('<h3/>', {
          class: 'rtl',
          text: word.part_of_speech,
        }).appendTo(w);

        $('<p/>', {
          text: word.translation,
        }).appendTo(w);

        w.appendTo('.he .words');
      }
    }
    else if (lang === 'en') {
      var jsonData = getJsonData('dict-en-he.json');
      var words = jsonData.slice(start, end);
      $('.en .words').empty();
      for (i in words) {
        var word = words[i];
        var w = $('<div/>', {
          id: word.id,
          class: 'word',
        });

        $('<h2/>', {
          text: word.translated,
        }).appendTo(w);

        $('<h3/>', {
          text: word.part_of_speech,
        }).appendTo(w);

        $('<p/>', {
          class: 'rtl',
          text: word.translation,
        }).appendTo(w);

        w.appendTo('.en .words');
      }
    }
  }
  $('.en .search').submit( function() {
    postWord('en');
  });
  $('.he .search').submit( function() {
    postWord('he');
  });
  $('.switch').click( function() {
    $('.switch').toggleClass('he');
    $('.switch').toggleClass('en');
    $('section.en').toggleClass('invisible');
    $('section.he').toggleClass('invisible');
  });
  $('.he .slice').submit( function () {
    var start = $('.he .slice .start').val();
    var end = $('.he .slice .end').val();
    sliceDict('he', start, end);
  });
  $('.en .slice').submit( function () {
    var start = $('.en .slice .start').val();
    var end = $('.en .slice .end').val();
    sliceDict('en', start, end);
  });
});
