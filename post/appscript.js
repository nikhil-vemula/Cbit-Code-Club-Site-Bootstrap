function login()
{
  var email = $("#email").val();
  var pwd = $("#pwd").val();
  firebase.auth().signInWithEmailAndPassword(email,pwd)
  .then(function(){
    post();
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });
}
function logout()
{
  firebase.auth().signOut().then(function() {
    alert("Posted!!");
  }, function(error) {
    // An error happened.
  });
}
function post(){
  if(firebase.auth().currentUser!=null){
     var title = $('#title').val();
     var desc = $('#desc').val();
     var link = $('#url').val();
     var tag = $('#sel').val();
     var ref = firebase.database().ref('/AppDev/Tutorials');
     ref.push().setWithPriority({
       title: title,
       desc: desc,
       url: link,
       tag: tag
     },-$.now());
      logout();
    }
    else{

    }
}
function check()
{
    console.log("Checking");
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
  else if($("#url").val()==""){
    alert("Url can not be empty");
  }
  else if($("#desc").val()==""){
    alert("Description can not be empty");
  }
  else if($("#sel").val()=="select"){
    alert("Select Tag");
  }else{
    login();
  }
}