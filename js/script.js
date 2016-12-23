function loadNotifications()
{ 
    var loaded;
    var starCountRef = firebase.database().ref('/Notifications/');
    starCountRef.on('value', function(snapshot) {
      $("#loading").hide();
      console.log(snapshot.val());
      var item,container,badge,card,cardblock,tag;
      $.each(snapshot.val(), function( index, value) {
        container = $("<div></div>");
        card = $("<div></div>").attr('class','card');
        cardblock = $("<div></div>").attr('class','card-block');
        item= $("<p></p>").html(value["content"]).text();
        tag = value["tag"];
        if(tag=="ccc")
          badge = $("<span></span>").attr('class','tag tag-primary tag-default').text(value["tag"]);
        else if(tag=="web")
          badge = $("<span></span>").attr('class','tag tag-success tag-default').text(value["tag"]);
        else if(tag=="android")
          badge = $("<span></span>").attr('class','tag tag-warning tag-default').text(value["tag"]);          
        container.append(badge);
        container.append($('<br/>'));
        container.append(item);
        cardblock.append(container);
        card.append(cardblock);
        $("#notifications").append(card);
      });
    });
    
    }