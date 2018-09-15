(function() {
  'use strict';

  var links = document.querySelectorAll('.link');
  var path = window.location.pathname.replace(/\//g, '');
  var currentContent = document.querySelector('.main > div');
  var cachedContents = [
    {
      path: path,
      content: currentContent
    }
  ];

  links.forEach(function(link) {
    link.addEventListener('click', handleTransition);
  });

  function handleTransition(e) {
    e.preventDefault();
    var url = e.target.href;
    var path = e.target.pathname.replace(/\//g, '');
    var index = getCachedIndex(path);

    if (!isNaN(index)) {
      replaceContent(cachedContents[index].content);
    } else {
      getContent(url, path, addToCache, replaceContent);
    }
  }

  function getCachedIndex(path) {
    for (var i = 0; i < cachedContents.length; i++) {
      if (cachedContents[i].path === path) {
        return i;
      }
    }
  }

  function getContent(url, path, cb1, cb2) {
    var http = new XMLHttpRequest();
    var result = document.createElement('div');
    var content = null;

    http.open('GET', url, true);
    http.onload = function() {
      if (http.status === 200) {
        result.innerHTML = http.response;
        content = result.querySelector('.main > div');
        cb1(path, content);
        cb2(content);
      } else {
        window.location.href = url;
      }
    };
    http.send();
  }

  function addToCache(path, content) {
    cachedContents.push({
      path: path,
      content: content
    });
  }

  function replaceContent(content) {
    document.querySelector('.main > div').remove();
    document
      .querySelector('.main')
      .insertAdjacentElement('afterbegin', content);
  }

  // TODOS
  // Change the Nav Active class
  // Change the URL
  // Add Animations/Transitions
})();
