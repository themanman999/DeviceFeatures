if ('localStorage' in window || 'sessionStorage' in window) {
  var selectedEngine;

  var logTarget = document.getElementById('target');
  var valueInput = document.getElementById('value');

  var reloadInputValue = function () {
    valueInput.value =  window[selectedEngine].getItem('myKey') || '';
  }
  
  var selectEngine = function (engine) {
    document.querySelector('[data-engine=' + engine + ']').classList.add('active');
    if (selectedEngine) {
      document.querySelector('[data-engine=' + selectedEngine + ']').classList.remove('active');
    }

    selectedEngine = engine;
    reloadInputValue();
  };

  var getSelectEngineFn = function (button) {
    return function () {
      var engine = button.getAttribute('data-engine');
      if (selectedEngine !== engine) {
        selectEngine(engine);
      }
    };
  };

  function handleChange(change) {
    var timeBadge = new Date().toTimeString().split(' ')[0];
    var newState = document.createElement('p');
    newState.innerHTML = '<span class="badge">' + timeBadge + '</span> ' + change + '.';
    logTarget.appendChild(newState);
  }

  var buttons = document.querySelectorAll('#selectEngine button');
  for (var i = 0; i < buttons.length; ++i) {
    buttons[i].addEventListener('click', getSelectEngineFn(buttons[i]));
  }
  
  selectEngine('localStorage');

  valueInput.addEventListener('keyup', function () {
    window[selectedEngine].setItem('myKey', this.value);
  });

  var onStorageChanged = function (change) {
    var engine = change.storageArea === window.localStorage ? 'localStorage' : 'sessionStorage';
    handleChange('External change in <b>' + engine + '</b>: key <b>' + change.key + '</b> changed from <b>' + change.oldValue + '</b> to <b>' + change.newValue + '</b>');
    if (engine === selectedEngine) {
      reloadInputValue();
    }
  }

  window.addEventListener('storage', onStorageChanged);
}