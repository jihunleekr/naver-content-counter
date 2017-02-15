var div = null;
var imageCount, movieCount, wordList, wordName, wordCount;

if(location.href.match(/cafe/) && document.getElementById('basisElement')) { // 까페
  div = window.parent.document.createElement('div');
  window.parent.document.body.appendChild(div);
  imageCount = document.querySelectorAll('.inbox img[src^="http://cafep"], .inbox img[src^="http://postfiles"]').length;
  movieCount = document.querySelectorAll('.inbox iframe[src^="http://serviceapi"]').length;
  wordCount = 0;
  chrome.storage.local.get('lastQuery', function(items) {
    wordName = items.lastQuery;
    wordList = document.querySelectorAll('.inbox')[0].innerText.match(new RegExp(wordName, 'ig'));
    wordCount = wordList ? wordList.length : 0;
    window.parent.document.getElementById('ncc-word-name').innerHTML = wordName;
    window.parent.document.getElementById('ncc-word-count').innerHTML = wordCount;
  });

} else if(document.querySelectorAll('[id^="post-view"]').length > 0) { // 블로그
  div = document.createElement('div');
  document.body.appendChild(div);
  imageCount = document.querySelectorAll('[id^="post-view"] img[src^="http://postfiles"]').length;
  movieCount = document.querySelectorAll('[id^="post-view"] iframe[src^="http://serviceapi"], [id^="post-view"] iframe[src^="https://www.youtube.com"]').length;
  setTimeout(function() {
    movieCount = document.querySelectorAll('[id^="post-view"] iframe[src^="http://serviceapi"], [id^="post-view"] iframe[src^="https://www.youtube.com"]').length;
    document.getElementById('ncc-movie-count').innerHTML = movieCount;
  }, 1000);
  wordCount = 0;
  chrome.storage.local.get('lastQuery', function(items) {
    wordName = items.lastQuery;
    wordList = document.querySelectorAll('[id^="post-view"]')[0].innerText.match(new RegExp(wordName, 'ig'));
    wordCount = wordList ? wordList.length : 0;
    document.getElementById('ncc-word-name').innerHTML = wordName;
    document.getElementById('ncc-word-count').innerHTML = wordCount;
  });
}

if(div) {
  div.id = 'naver-content-count';
  div.innerHTML = '<table>' +
    '<tr><th>이미지</th><td>' + imageCount + '</td></tr>' +
    '<tr><th>동영상</th><td id="ncc-movie-count">' + movieCount + '</td></tr>' +
    '<tr><th id="ncc-word-name">키워드</th><td id="ncc-word-count">0</td></tr>' +
    '</table>'
  ;
}