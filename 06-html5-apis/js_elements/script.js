var idbSupported = false;
var db;
$(document).ready(function()
{
  var $data = $('#dataHolder');
  if("indexedDB" in window)
  {
    idbSupported = true;
  }
  if(idbSupported)
  {
    var request = indexedDB.open("testdb",1);
    request.onupgradeneeded = function(e)
    {
      var thisDB = e.target.result;
      if(!thisDB.objectStoreNames.contains("data"))
      {
        thisDB.createObjectStore("data", {autoIncrement:true});
      }
    };
    var $txtContent = $('#txt-content');
    request.onsuccess = function(e)
    {
      db = e.target.result;
      $('#btnSave').on('click',function()
      {
      	if(!$txtContent.val().trim())
        {
      	  $('#exception').html('Write some text you before save it');
      	}
      	else
        {
      	  var data = { data: $txtContent.val() };
          var transaction = db.transaction(['data'],'readwrite');
          var storage = transaction.objectStore('data');
          var request = storage.add(data);
          localStorage.setItem('data', data);
          console.log($txtContent.val() + ' saved successfully.');
          $('#exception').html('');
          $txtContent.val('');
      	}
      }); 
    request.onerror = function(e)
    {
      console.log('exception' + e.target.error.name);
    };
    $('#btnClear').on('click',function()
    {
      var transaction = db.transaction(["data"], "readwrite");
      var objectStore = transaction.objectStore("data");
      var cursor = objectStore.openCursor();
      $txtContent.val('');
      cursor.onsuccess = function(e)
      {
        var res = e.target.result;
        if(res)
        {
          objectStore.delete(res.key);
          res.continue();
        }
        console.log('Clear successfully.');
      };
    });
  };
    request.onerror = function(e)
    {
      console.log("Error");
      console.dir(e);
    };
  }
  else
  {
    localStorage.setItem('data', db);
  }
});
function allowDrop(e)
{
  e.preventDefault();
}
function drop(e)
{
  e.preventDefault();
  var file = e.dataTransfer.files[0];
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function(event)
  {
    $("#txt-content").val(event.target.result);
  };
}