
function loadNotifications()
{ 
    var loaded;
    var dbRef = firebase.database().ref('/notifications/').limitToLast(10).orderByPriority();
    dbRef.on('value', function(snapshot) {
      $("#loading").hide();
      $("#notifications").empty();
      var item,container,badge,card,cardblock,tag;
      $.each(snapshot.val(), function( index, value) {
        container = $("<div></div>");
        card = $("<div></div>").attr('class','card');
        cardblock = $("<div></div>").attr('class','card-block');
        text= $("<p></p>").text(value["content"]);
        title = $("<h2></h2>").text(value["title"]);
        tag = value["tag"];
        if(tag=="ccc")
          badge = $("<span></span>").attr('class','tag tag-primary tag-default').text(value["tag"]);
        else if(tag=="web")
          badge = $("<span></span>").attr('class','tag tag-success tag-default').text(value["tag"]);
        else if(tag=="android")
          badge = $("<span></span>").attr('class','tag tag-warning tag-default').text(value["tag"]);          
        container.append(badge);
        container.append($('<br/>'));
        container.append(title);
        container.append($('<br/>'));        
        container.append(text);
        cardblock.append(container);
        card.append(cardblock);
        $("#notifications").append(card);
      });
    });
    
}
function loadPost()
{
  var dbRef = firebase.database().ref('/notifications/');
  dbRef.on('value', function(snapshot) {
    if(snapshot.val() != null)
      $("#test").text(snapshot.val()["4"]["content"]);
  });
}
function login()
{
  $("#loading").css("display","block");
  var email = $("#email").val();
  var pwd = $("#pwd").val();
  firebase.auth().signInWithEmailAndPassword(email,pwd)
  .then(function(){
    post();
    $("#loading").css("display","none");
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    $("#loading").css("display","none");
  });
}
function logout()
{
  firebase.auth().signOut().then(function() {
    alert("Posted!!");
    $('#summernote').summernote('code', '');
  }, function(error) {
    // An error happened.
  });
}
function post(){
  if(firebase.auth().currentUser!=null){
     var text = $('#summernote').summernote('code');
     var title = $('#title').val();
     var tag = $('#sel').val();
     var ref = firebase.database().ref('/notifications/');
     ref.push().setWithPriority({
       content: text,
       tag: tag,
       title: title
     },-$.now());
      logout();
    }
    else{

    }
}
function check()
{
  if($("#email").val()==""){
    alert("email can not be empty");
    console.log("jfslkdj");
  }
  else if($("#title").val()==""){
    alert("Title can not be empty");
  }
  else if($("#pwd").val()==""){
    alert("password can not be empty");
  }
  else if($('#summernote').summernote('isEmpty')){
    alert("Post cant be empty");
  }
  else if($("#sel").val()=="select"){
    alert("Select Tag");
  }else{
    login();
  }
}