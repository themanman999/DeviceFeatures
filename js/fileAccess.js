function getReadFile(reader, i) {
  return function () {
    var li = document.querySelector('[data-idx="' + i + '"]');

    li.innerHTML += 'File starts with "' + reader.result.substr(0, 25) + '"';
  }
}

function handleFiles(files) {
  document.getElementById('fileCount').innerHTML = files.length;

  var target = document.getElementById('fileLog');
  target.innerHTML = '';

  for (var i = 0; i < files.length; ++i) {
    var item = document.createElement('li');
    item.setAttribute('data-idx', i);
    var file = files[i];

    var reader = new FileReader();
    reader.addEventListener('load', getReadFile(reader, i));
    reader.readAsText(file);

    item.innerHTML = '<b>' + file.name + '</b>,<br> ' + file.type + ', ' + file.size + ' bytes, last modified ' + file.lastModifiedDate + '<br>';
    target.appendChild(item);
  };
}